import { ChatConstants } from "../../Utils/Constansts";
import { StoreConstants } from "../StoreConstants"

export function fetchChatsReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.FETCH_CHATS_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                data: []
            };
        }
        case StoreConstants.FETCH_CHATS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(action.response)
            };
        }
        case StoreConstants.FETCH_CHATS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: [],
                message: action.failedMessage
            };
        }
        case StoreConstants.MSG_SEND_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(upSertChat(state.data,action.response))
            };
        }
        case StoreConstants.MSG_SEND_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.failedMessage
            };
        }
        case StoreConstants.GROUP_MSG_SEND_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(upSertGroupChat(state.data,action.response))
            };
        }
        case StoreConstants.GROUP_MSG_SEND_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.failedMessage
            };
        }
        case StoreConstants.FETCH_GROUP_CHATS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(addGroupMessegesToChat(state.data,action.response))
            };
        }
        case StoreConstants.FETCH_GROUP_CHATS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.failedMessage
            };
        }case StoreConstants.CREATE_GROUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(addGroupMessegesToChat(state.data,action.response))
            };
        }
        case StoreConstants.CREATE_GROUP_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.failedMessage
            };
        }
        case StoreConstants.RECIVE_GROUP_CHAT_MSG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: sortChats(upSertGroupChat(state.data,action.response))
            };
        }
        case StoreConstants.RECIVE_CHAT_MESSAGE_TYPING:{
            return{
                ...state,
                data: chatMessageTypingStart(state.data,action.response)
            }
        }
        case StoreConstants.CHAT_MESSAGE_TYPING_STOP:{
            return{
                ...state,
                data: chatMessageTypingStop(state.data,action.response)
            }
        }
        default:
            return state;
    }
}

export function upSertChat(array, chat) {
    if (array && array.length) {
        const i = array.findIndex(_item => _item.chatId === chat.chatId);
        if (i > -1){
            array[i].chatMessages.push(chat.chatMessages[0]);
        }  else{
            array.push(chat);
        } 
        return array;
    }else{
        return [chat];
    }
}

export function upSertGroupChat(array, chat) {
    if (array && array.length) {
        const i = array.findIndex(_item => _item.chatRoomId === chat.chatRoomId);
        if (i > -1){
            array[i].chatMessages.push(chat.chatMessages[0]);
        }  else{
            array.push(chat);
        } 
        return array;
    }else{
        return [chat];
    }
}

export function addGroupMessegesToChat(chats,groups){
    if(chats && chats.length){
        var newArray = chats.concat(groups);
        return newArray;
    }else{
        return [groups];
    }
}
export function chatMessageTypingStart(array,currentChat){
    if(currentChat.chatType === ChatConstants.USER){
        const i = array.findIndex(_item => _item.chatId === currentChat.id);
        if (i > -1){            
            array[i] = {
                ...array[i],
                typing:{
                   ...currentChat,isTyping:true
                }
            };
        }
        return array;
    }else{
        const i = array.findIndex(_item => _item.chatRoomId === parseInt(currentChat.id));
        if (i > -1){            
            array[i] = {
                ...array[i],
                typing:{
                   ...currentChat,isTyping:true
                }
            };
        }
        return array;
    }
}

export function chatMessageTypingStop(array,currentChat){
    if(currentChat.chatType === ChatConstants.USER){
        const i = array.findIndex(_item => _item.chatId === currentChat.id);
        if (i > -1){            
            array[i] = {
                ...array[i],
                typing:{
                    ...currentChat,isTyping:false
                }
            };
        }
        return array;
    }else{
        const i = array.findIndex(_item => _item.chatRoomId === parseInt(currentChat.id));
        if (i > -1){            
            array[i] = {
                ...array[i],
                typing:{
                    ...currentChat,isTyping:false
                }
            };
        }
        return array;
    }
}

export function sortChats(chats){
    if(chats && chats.length){
        for(var i=0;i<chats.length;i++){
            chats[i].chatMessages = chats[i].chatMessages.sort((a,b) => new Date(b.messageTimestamp) - new Date(a.messageTimestamp));
            chats[i] = {
              ...chats[i],
              "lastTimestamp": chats[i].chatMessages.length ? chats[i].chatMessages[0].messageTimestamp : chats[i].createdTimestamp,
              "lastMessage": chats[i].chatMessages.length ? chats[i].chatMessages[0].message : "",
              "lastMessageSentBy": chats[i].chatMessages.length ? chats[i].chatMessages[0].senderUserId : ""
            }
            chats[i].chatMessages = chats[i].chatMessages.sort((a,b) => new Date(a.messageTimestamp) - new Date(b.messageTimestamp));
          }
          chats = chats.sort((a,b)=> new Date(b.lastTimestamp) - new Date(a.lastTimestamp));  
    }
    return chats;
    
}