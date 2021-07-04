package com.ss.chatroom.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ss.chatroom.entities.ChatMessageEntity;
import com.ss.chatroom.entities.ChatRoomEntity;
import com.ss.chatroom.entities.ChatRoomMessageEntity;
import com.ss.chatroom.entities.ChatRoomMessageRecevierEntity;
import com.ss.chatroom.entities.MessageStatusEnum;
import com.ss.chatroom.entities.UserEntity;
import com.ss.chatroom.exception.DuplicateRecordFoundException;
import com.ss.chatroom.exception.MessageSentFailedException;
import com.ss.chatroom.model.ChatMessageModel;
import com.ss.chatroom.model.ChatMessagesResponseModel;
import com.ss.chatroom.model.ChatMessagesResponseModel.ChatMessages;
import com.ss.chatroom.model.ChatNotificationModel;
import com.ss.chatroom.model.ChatRoomMessageRequestModel;
import com.ss.chatroom.model.ChatRoomRequestModel;
import com.ss.chatroom.model.ChatRoomResponseModel;
import com.ss.chatroom.model.ChatRoomResponseModel.ChatRoomUser;
import com.ss.chatroom.model.MessageTypingModel;
import com.ss.chatroom.model.UserModle;
import com.ss.chatroom.repositories.ChatMessageRecevierRepo;
import com.ss.chatroom.repositories.ChatMessageRepo;
import com.ss.chatroom.repositories.ChatRoomMessageRepo;
import com.ss.chatroom.repositories.ChatRoomRepo;
import com.ss.chatroom.utils.ChatRoomConstants;
import com.ss.chatroom.utils.CommonUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
	
	private final ChatMessageRepo chatMessageRepo;
	private final ChatRoomRepo chatRoomRepo;
	private final ChatRoomMessageRepo chatRoomMessageRepo;
	private final ChatMessageRecevierRepo chatMessageRecevierRepo;
	private final SimpMessagingTemplate messagingTemplate;
	private final UserService userService;

	public List<ChatMessagesResponseModel> getAllChatMessages(Long userId) {
		List<ChatMessageEntity> chatEntityList = null;
		if(userId != null) {
			chatEntityList = (List<ChatMessageEntity>) chatMessageRepo.findBySenderUserIdOrRecevierUserId(userId,userId);
		}else {
			chatEntityList = (List<ChatMessageEntity>) chatMessageRepo.findAll();
		}
		List<ChatMessagesResponseModel> cmrmList = new ArrayList<>();
		chatEntityList.forEach(chatEntity->{
			Optional<ChatMessagesResponseModel> cmrmOldOpt = cmrmList.stream().filter(cmrm -> cmrm.getChatId().equals(chatEntity.getChatId())).findAny();
			if(cmrmOldOpt.isPresent()) {
				ChatMessagesResponseModel cmrmOld = cmrmOldOpt.get();
				ChatMessages chatMessages = cmrmOld.new ChatMessages();
				chatMessages.setMessage(chatEntity.getMessage());
				chatMessages.setMsgId(chatEntity.getId());
				chatMessages.setMessageStatus(chatEntity.getMessageStatus());
				chatMessages.setMessageTimestamp(chatEntity.getMessageTimestamp());
				chatMessages.setReciverUserId(chatEntity.getRecevierUser().getId());
				chatMessages.setSenderUserId(chatEntity.getSenderUser().getId());
				if(cmrmOld.getChatMessages() != null) {
					cmrmOld.getChatMessages().add(chatMessages);
				}else {
					List<ChatMessages> chatMessagesList = new ArrayList<>();
					chatMessagesList.add(chatMessages);
					cmrmOld.setChatMessages(chatMessagesList);
				}
			}else {
				ChatMessagesResponseModel cmrmNew = new ChatMessagesResponseModel();
				cmrmNew.setChatId(chatEntity.getChatId());
				cmrmNew.setReciverUser(getUserObject(chatEntity.getRecevierUser()));
				cmrmNew.setSenderUser(getUserObject(chatEntity.getSenderUser()));
				cmrmNew.setReciverUserId(chatEntity.getRecevierUser().getId());
				cmrmNew.setSenderUserId(chatEntity.getSenderUser().getId());
				List<ChatMessages> chatMessagesList = new ArrayList<>();
				ChatMessages chatMessages = cmrmNew.new ChatMessages();
				chatMessages.setMessage(chatEntity.getMessage());
				chatMessages.setMsgId(chatEntity.getId());
				chatMessages.setMessageStatus(chatEntity.getMessageStatus());
				chatMessages.setMessageTimestamp(chatEntity.getMessageTimestamp());
				chatMessages.setReciverUserId(chatEntity.getRecevierUser().getId());
				chatMessages.setSenderUserId(chatEntity.getSenderUser().getId());
				chatMessagesList.add(chatMessages);
				cmrmNew.setChatMessages(chatMessagesList);
				cmrmList.add(cmrmNew);
			}
		});
		return cmrmList;
	}

	private UserModle getUserObject(UserEntity recevierUser) {
		UserModle user =  new UserModle();
		user.setId(recevierUser.getId());
		user.setAvatarUrl(recevierUser.getAvatarUrl());
		user.setCreatedTimestamp(recevierUser.getCreatedTimestamp());
		user.setDescription(recevierUser.getDescription());
		user.setFirstName(recevierUser.getFirstName());
		user.setLastName(recevierUser.getLastName());
		user.setUserId(recevierUser.getUserId());
		user.setStatus(recevierUser.getStatus());
		user.setLastLoginTimestamp(recevierUser.getLastLoginTimestamp());
		return user;
	}

	
	@Transactional(rollbackOn = Exception.class)
	public List<ChatMessagesResponseModel> sendMessage(ChatMessageModel chatMessageModel) throws MessageSentFailedException {
		ChatMessageEntity chatMessageEntity = saveChatMessage(chatMessageModel);
		List<ChatMessagesResponseModel> cmrmList = new ArrayList<>();
		ChatMessagesResponseModel cmrmNew = new ChatMessagesResponseModel();
		cmrmNew.setChatId(chatMessageEntity.getChatId());
		cmrmNew.setReciverUser(getUserObject(chatMessageEntity.getRecevierUser()));
		cmrmNew.setSenderUser(getUserObject(chatMessageEntity.getSenderUser()));
		cmrmNew.setSenderUserId(chatMessageEntity.getSenderUser().getId());
		cmrmNew.setReciverUserId(chatMessageEntity.getRecevierUser().getId());
		List<ChatMessages> chatMessagesList = new ArrayList<>();
		ChatMessages chatMessages = cmrmNew.new ChatMessages();
		chatMessages.setMessage(chatMessageEntity.getMessage());
		chatMessages.setMsgId(chatMessageEntity.getId());
		chatMessages.setMessageStatus(chatMessageEntity.getMessageStatus());
		chatMessages.setMessageTimestamp(chatMessageEntity.getMessageTimestamp());
		chatMessages.setReciverUserId(chatMessageEntity.getRecevierUser().getId());
		chatMessages.setSenderUserId(chatMessageEntity.getSenderUser().getId());
		chatMessagesList.add(chatMessages);
		cmrmNew.setChatMessages(chatMessagesList);
		cmrmList.add(cmrmNew);
		ChatNotificationModel chatNotificationModel = new ChatNotificationModel();
		chatNotificationModel.setMessage(cmrmList);
		chatNotificationModel.setMessageType(ChatRoomConstants.MEG_TYPE_USER);
		try {
			messagingTemplate.convertAndSendToUser(chatMessageModel.getRecipientId().toString(), "/queue/messages", chatNotificationModel);
		}catch(MessagingException e) {
			e.printStackTrace();
			throw new MessageSentFailedException("Message sent failed",ChatRoomConstants.MSG_SENT_ERROR_CODE);
		}
		return cmrmList;
	}

	private ChatMessageEntity saveChatMessage(ChatMessageModel chatMessageModel) {
		ChatMessageEntity chatMessageEntity = new ChatMessageEntity();
		List<String> cmeList = userService.checkIsChatIsExitsWithUsers(chatMessageModel.getSenderId(),chatMessageModel.getRecipientId());
		if(cmeList != null && !cmeList.isEmpty()) {
			chatMessageEntity.setChatId(cmeList.get(0));
		}else {
			chatMessageEntity.setChatId(chatMessageModel.getChatId() != null ? chatMessageModel.getChatId() : CommonUtils.generateChatId());
		}
		
		chatMessageEntity.setMessage(chatMessageModel.getContent());
		chatMessageEntity.setSenderUser(userService.getUserById(chatMessageModel.getSenderId()).get());
		chatMessageEntity.setRecevierUser(userService.getUserById(chatMessageModel.getRecipientId()).get());
		chatMessageEntity.setMessageStatus(MessageStatusEnum.SENT);
		chatMessageEntity.setMessageTimestamp(new Date());
		chatMessageEntity = chatMessageRepo.save(chatMessageEntity);
		return chatMessageEntity;
	}

	public List<ChatRoomResponseModel> createChatRoom(ChatRoomRequestModel chatRoomRequestModel) throws DuplicateRecordFoundException {
		checkChatRoomAlreadyExitsOrNot(chatRoomRequestModel.getChatRoomName());
		ChatRoomEntity chatRoomEntity = setChatRoomEntity(chatRoomRequestModel);
		ChatRoomEntity afterSavedChatRoomEntity = chatRoomRepo.save(chatRoomEntity);
		ChatRoomResponseModel chatRoomResponseModel = setChatRoomResponseModel(afterSavedChatRoomEntity);
		List<ChatRoomResponseModel> crrmlist = new ArrayList<>();
		crrmlist.add(chatRoomResponseModel);
		ChatNotificationModel chatNotificationModel = new ChatNotificationModel();
		chatNotificationModel.setMessage(crrmlist);
		chatNotificationModel.setMessageType(ChatRoomConstants.MEG_TYPE_GROUP);
		afterSavedChatRoomEntity.getUsers().forEach(user->{
			if(user.getId() != chatRoomRequestModel.getCreatedBy()) {
				try {
					messagingTemplate.convertAndSendToUser(user.getId().toString(), "/queue/messages", chatNotificationModel);
				}catch(MessagingException e) {
					e.printStackTrace();
					//throw new MessageSentFailedException("Message sent failed",ChatRoomConstants.MSG_SENT_ERROR_CODE);
				}
			}
		});
		return crrmlist;
	}
	
	private void checkChatRoomAlreadyExitsOrNot(String chatRoomName) throws DuplicateRecordFoundException {
		Optional<ChatRoomEntity> chatRoom = chatRoomRepo.findByChatRoomName(chatRoomName);
		if(chatRoom.isPresent()) {
			throw new DuplicateRecordFoundException(chatRoomName + " already exits", ChatRoomConstants.DUPLICATE_RECORD_ERROR_CODE);
		}
		
		
	}

	private ChatRoomResponseModel setChatRoomResponseModel(ChatRoomMessageEntity chatRoomMessageEntity, List<ChatRoomMessageRecevierEntity> crmreList) {
		ChatRoomResponseModel chatRoomResponseModel = new ChatRoomResponseModel();
		List<com.ss.chatroom.model.ChatRoomResponseModel.ChatMessages> chatMessages = new ArrayList<>();
		chatRoomResponseModel.setChatRoomId(chatRoomMessageEntity.getChatRoom().getId());
		chatRoomResponseModel.setChatRoomDescription(chatRoomMessageEntity.getChatRoom().getChatRoomDescription());
		chatRoomResponseModel.setChatRoomName(chatRoomMessageEntity.getChatRoom().getChatRoomName());
		chatRoomResponseModel.setCreatedBy(getUserObject(userService.getUserById(chatRoomMessageEntity.getChatRoom().getCreatedBy()).get()));
		chatRoomResponseModel.setAvatarUrl(chatRoomMessageEntity.getChatRoom().getAvatarUrl());
		chatRoomResponseModel.setChatMessages(chatMessages);
		chatRoomResponseModel.setChatRoomMembers(getUserObjects(chatRoomMessageEntity.getChatRoom().getUsers()));
		chatRoomResponseModel.setCreatedTimestamp(chatRoomMessageEntity.getChatRoom().getCreatedTimestamp());
//		chatRoomMessageEntity.getChatRoomMessages().forEach(chatRoomMessage->{
			com.ss.chatroom.model.ChatRoomResponseModel.ChatMessages chatMessage= chatRoomResponseModel.new ChatMessages();
			List<ChatRoomUser> chatRoomUserList = new ArrayList<>();
//			if(chatRoomMessageEntity.getChatRoomMessageReceviers() != null) {
			crmreList.forEach(chatRoomMessageRecevier->{
					ChatRoomUser  chatRoomUser = chatRoomResponseModel.new ChatRoomUser();
					chatRoomUser.setUser(getUserObject(userService.getUserById(chatRoomMessageRecevier.getRecevierUserId()).get()));
					chatRoomUser.setMessageStatus(chatRoomMessageRecevier.getMessageStatus());
					chatRoomUserList.add(chatRoomUser);
				});
//			}
				chatMessage.setReciverUsers(chatRoomUserList);
				chatMessage.setId(chatRoomMessageEntity.getId());
				chatMessage.setMessage(chatRoomMessageEntity.getMessage());
				chatMessage.setMessageTimestamp(chatRoomMessageEntity.getMessageTimestamp());
				chatMessage.setSenderUser(getUserObject(userService.getUserById(chatRoomMessageEntity.getSenderUserId()).get()));
				chatMessage.setSenderUserId(chatRoomMessageEntity.getSenderUserId());
				chatMessages.add(chatMessage);
			
//		});
		return chatRoomResponseModel;
	}
	
	private ChatRoomResponseModel setChatRoomResponseModel(ChatRoomEntity chatRoomEntity) {
		ChatRoomResponseModel chatRoomResponseModel = new ChatRoomResponseModel();
		List<com.ss.chatroom.model.ChatRoomResponseModel.ChatMessages> chatMessages = new ArrayList<>();
		chatRoomResponseModel.setChatRoomId(chatRoomEntity.getId());
		chatRoomResponseModel.setChatRoomDescription(chatRoomEntity.getChatRoomDescription());
		chatRoomResponseModel.setChatRoomName(chatRoomEntity.getChatRoomName());
		chatRoomResponseModel.setCreatedBy(getUserObject(userService.getUserById(chatRoomEntity.getCreatedBy()).get()));
		chatRoomResponseModel.setAvatarUrl(chatRoomEntity.getAvatarUrl());
		chatRoomResponseModel.setChatMessages(chatMessages);
		chatRoomResponseModel.setChatRoomMembers(getUserObjects(chatRoomEntity.getUsers()));
		chatRoomResponseModel.setCreatedTimestamp(chatRoomEntity.getCreatedTimestamp());
		if(chatRoomEntity.getChatRoomMessages() != null) {
			chatRoomEntity.getChatRoomMessages().forEach(chatRoomMessage->{
				com.ss.chatroom.model.ChatRoomResponseModel.ChatMessages chatMessage= chatRoomResponseModel.new ChatMessages();
				if(chatRoomMessage.getChatRoomMessageReceviers() != null) {
					List<ChatRoomUser> chatRoomUserList = new ArrayList<>();
					chatRoomMessage.getChatRoomMessageReceviers().forEach(chatRoomMessageRecevier->{
						ChatRoomUser  chatRoomUser = chatRoomResponseModel.new ChatRoomUser();
						chatRoomUser.setUser(getUserObject(userService.getUserById(chatRoomMessageRecevier.getRecevierUserId()).get()));
						chatRoomUser.setMessageStatus(chatRoomMessageRecevier.getMessageStatus());
						chatRoomUserList.add(chatRoomUser);
					});
					chatMessage.setReciverUsers(chatRoomUserList);
					chatMessage.setId(chatRoomMessage.getId());
					chatMessage.setMessage(chatRoomMessage.getMessage());
					chatMessage.setMessageTimestamp(chatRoomMessage.getMessageTimestamp());
					chatMessage.setSenderUser(getUserObject(userService.getUserById(chatRoomMessage.getSenderUserId()).get()));
//					chatMessages.setReciverUserId(chatMessageEntity.getRecevierUser().getId());
					chatMessage.setSenderUserId(chatRoomMessage.getSenderUserId());
					chatMessages.add(chatMessage);
				}
			});
		}
		return chatRoomResponseModel;
	}
	
	private List<UserModle> getUserObjects(List<UserEntity> users) {
		List<UserModle> userModleList = new ArrayList<>();
		users.forEach(user->{
			userModleList.add(getUserObject(user));
		});
		return userModleList;
	}

	private ChatRoomEntity setChatRoomEntity(ChatRoomRequestModel chatRoomRequestModel) {
		ChatRoomEntity chatRoomEntity = new ChatRoomEntity();
		chatRoomEntity.setChatRoomName(chatRoomRequestModel.getChatRoomName());
		chatRoomEntity.setChatRoomDescription(chatRoomRequestModel.getChatRoomDescription());
		chatRoomEntity.setCreatedTimestamp(new Date());
		chatRoomEntity.setUsers(userService.getUsersByIds(chatRoomRequestModel.getChatRoomUserIds()));
		chatRoomEntity.setCreatedBy(chatRoomRequestModel.getCreatedBy());
		chatRoomEntity.setAvatarUrl(chatRoomRequestModel.getAvatarUrl());
		return chatRoomEntity;
	}

	public List<ChatRoomResponseModel> fetchChatRooms(Long userId) {
		List<ChatRoomEntity> creList = new ArrayList<ChatRoomEntity>();
		List<ChatRoomResponseModel> crrList = new ArrayList<>();
		if(userId != null) {
			Optional<UserEntity> userEntity = userService.getUserById(userId);
			if(userEntity.isPresent() && userEntity.get().getChatRooms() != null && !userEntity.get().getChatRooms().isEmpty()) {
				creList = userEntity.get().getChatRooms();
			}
		}else {
			creList = (List<ChatRoomEntity>) chatRoomRepo.findAll();
		}
		creList.forEach(cre->{
			crrList.add(setChatRoomResponseModel(cre));
		});
		return crrList;
	}
	
	public List<ChatRoomResponseModel> sendChatRoomMessage(ChatRoomMessageRequestModel chatRoomMessageRequestModel) {
		ChatRoomMessageEntity chatRoomMessageEntity = setChatRoomMessageEntity(chatRoomMessageRequestModel);
		chatRoomMessageEntity = chatRoomMessageRepo.save(chatRoomMessageEntity);
		chatRoomMessageEntity = chatRoomMessageRepo.findById(chatRoomMessageEntity.getId()).get();
		List<ChatRoomMessageRecevierEntity> crmreList = setChatRoomMessageRecevierEntity(chatRoomMessageEntity);
		crmreList = (List<ChatRoomMessageRecevierEntity>) chatMessageRecevierRepo.saveAll(crmreList);
//		crmreList = chatMessageRecevierRepo.findByChatRoomMessageId(chatRoomMessageEntity.getId()); 
//		chatRoomMessageEntity = setChatRoomMessageRecevierEntity(chatRoomMessageEntity);
//		chatRoomMessageEntity = chatRoomMessageRepo.save(chatRoomMessageEntity);
		Optional<ChatRoomMessageEntity> afterSavedchatRoomMessageEntity = chatRoomMessageRepo.findById(chatRoomMessageEntity.getId());
		ChatRoomResponseModel chatRoomResponseModel = setChatRoomResponseModel(afterSavedchatRoomMessageEntity.get(),crmreList);
		List<ChatRoomResponseModel> crrmlist = new ArrayList<>();
		crrmlist.add(chatRoomResponseModel);
		ChatNotificationModel chatNotificationModel = new ChatNotificationModel();
		chatNotificationModel.setMessage(crrmlist);
		chatNotificationModel.setMessageType(ChatRoomConstants.MEG_TYPE_GROUP);
		chatRoomResponseModel.getChatRoomMembers().forEach(user->{
			if(!chatRoomMessageRequestModel.getSenderId().equals(user.getId())) {
				try {
					messagingTemplate.convertAndSendToUser(user.getId().toString(), "/queue/messages", chatNotificationModel);
				}catch(MessagingException e) {
					e.printStackTrace();
					//throw new MessageSentFailedException("Message sent failed",ChatRoomConstants.MSG_SENT_ERROR_CODE);
				}
			}
		});
		
		return crrmlist;
	}

	private List<ChatRoomMessageRecevierEntity> setChatRoomMessageRecevierEntity(ChatRoomMessageEntity chatRoomMessageEntity) {
		List<ChatRoomMessageRecevierEntity> crmeeList = new ArrayList<>();
//		if(chatRoomMessageEntity.getChatRoomMessageReceviers() != null) {
//			crmeeList.addAll(chatRoomMessageEntity.getChatRoomMessageReceviers());
//		}
		chatRoomMessageEntity.getChatRoom().getUsers().forEach(user -> {
			ChatRoomMessageRecevierEntity chatRoomMessageRecevierEntity = new ChatRoomMessageRecevierEntity();
//			ChatRoomMessageRecevierPK chatRoomMessageRecevierPK = new ChatRoomMessageRecevierPK(); 
//			chatRoomMessageRecevierPK.setRecevierUserId(user.getId());
//			chatRoomMessageRecevierPK.setChatRoomMessageId(chatRoomMessageEntity.getId());
//			chatRoomMessageRecevierEntity.setId(chatRoomMessageRecevierPK);
			chatRoomMessageRecevierEntity.setMessageStatus(MessageStatusEnum.SENT);
			chatRoomMessageRecevierEntity.setChatRoomMessageEntity(chatRoomMessageEntity);
			chatRoomMessageRecevierEntity.setRecevierUserId(user.getId());
			crmeeList.add(chatRoomMessageRecevierEntity);
		});
		
//		chatRoomMessageEntity.setChatRoomMessageReceviers(crmeeList);
		return crmeeList;
	}

	private ChatRoomMessageEntity setChatRoomMessageEntity(ChatRoomMessageRequestModel chatRoomMessageRequestModel) {
		ChatRoomMessageEntity chatRoomMessageEntity = new ChatRoomMessageEntity();
		chatRoomMessageEntity.setMessage(chatRoomMessageRequestModel.getMessage());
		chatRoomMessageEntity.setSenderUserId(chatRoomMessageRequestModel.getSenderId());
		ChatRoomEntity chatRoomEntity = chatRoomRepo.findById(chatRoomMessageRequestModel.getChatRoomId()).get();
		chatRoomMessageEntity.setChatRoom(chatRoomEntity);
		chatRoomMessageEntity.setMessageTimestamp(new Date());
//		List<ChatRoomMessageRecevierEntity> crmeeList = new ArrayList<>();
//		chatRoomMessageEntity.getChatRoom().getUsers().forEach(user -> {
//			ChatRoomMessageRecevierEntity chatRoomMessageRecevierEntity = new ChatRoomMessageRecevierEntity();
//			ChatRoomMessageRecevierPK chatRoomMessageRecevierPK = new ChatRoomMessageRecevierPK(); 
//			chatRoomMessageRecevierPK.setRecevierUserId(user.getId());
////			chatRoomMessageRecevierPK.setChatRoomMessageId(chatRoomMessageEntity.getId());
//			chatRoomMessageRecevierEntity.setId(chatRoomMessageRecevierPK);
//			chatRoomMessageRecevierEntity.setMessageStatus(MessageStatusEnum.SENT);
//			crmeeList.add(chatRoomMessageRecevierEntity);
//		});
		//chatRoomMessageEntity.setChatRoomMessageReceviers(crmeeList);
		return chatRoomMessageEntity;
	}

	public ChatNotificationModel sendTypingMessage(MessageTypingModel messageTypingModel) {
		ChatNotificationModel chatNotificationModel = new ChatNotificationModel();
		chatNotificationModel.setMessage(messageTypingModel);
		if(messageTypingModel.getChatType().equalsIgnoreCase(ChatRoomConstants.MEG_TYPE_USER)) {
			chatNotificationModel.setMessageType(ChatRoomConstants.CHAT_USER_TYPING);
			try {
				messagingTemplate.convertAndSendToUser(messageTypingModel.getReceiverId().toString(), "/queue/messages", chatNotificationModel);
			}catch(MessagingException e) {
				e.printStackTrace();
			}
		}else{
			chatNotificationModel.setMessageType(ChatRoomConstants.GROUP_CHAT_USER_TYPING);
			Optional<ChatRoomEntity> cre = chatRoomRepo.findById(Long.valueOf(messageTypingModel.getId()));
			if(cre.isPresent()) {
				cre.get().getUsers().forEach(user->{
					if(!messageTypingModel.getSenderId().equals(user.getId())) {
						try {
							messagingTemplate.convertAndSendToUser(user.getId().toString(), "/queue/messages", chatNotificationModel);
						}catch(MessagingException e) {
							e.printStackTrace();
						}
					}
				});
			}
			
		}
		
		
		return chatNotificationModel;
	}
	
}
