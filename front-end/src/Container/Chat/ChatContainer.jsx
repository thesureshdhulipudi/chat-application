import './ChatContainer.css';
import ChatComponet from '../../Componet/Chat/MiddleChat/ChatComponent';
import UsersComponent from '../../Componet/Chat/RightChat/UsersComponent';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGroupAPI, getChatsAPI, getGroupChatMessagesAPI, getUsersAPI, sendGroupMessageAPI, sendMessageAPI, sendTypingNotificationAPI } from '../../Services/APIService';
import { useSelector } from 'react-redux';
import ChatLeftComponet from '../../Componet/Chat/LeftChat/ChatLeftComponet';
import { fetchGroupChatsSuccss, messageSentSuccss, reciveGroupChatMsg, typingMessages } from '../../Store/Action/ChatsAction';
import {ChatConstants} from '../../Utils/Constansts';
import { Col, Container, Row } from 'react-bootstrap';

var stompClient = null;
const ChatContainer = (props) => {
    const { loginInfo } = props;

    const [recipientUser, setRecipientUser] = useState({});
    const [oldChat, setOldChat] = useState({});
    const [chatType, setChatType] = useState('');

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(getUsersAPI());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getChatsAPI(loginInfo.data.id));
        dispatch(getGroupChatMessagesAPI(loginInfo.data.id))
    }, [dispatch, loginInfo.data.id])

    useEffect(() => {
        if (stompClient == null) {
            connect();
        }
    });



    const users = useSelector((state) => state.users);

    console.log("users", users)
    const chats = useSelector(state => state.chats);

    const startChat = (user) => {
        console.log(user);
        setRecipientUser({
            ...user
        })
        let chat = null;
        if (chats && chats.data) {
            const i = chats.data.findIndex(chat => (chat.senderUserId === loginInfo.data.id || chat.senderUserId === user.id) && (chat.reciverUserId === user.id || chat.reciverUserId === loginInfo.data.id))
            if (i > -1) {
                chat = chats.data[i]
            } else {
                chat = null;
            }
            console.log(chat);
        }
        setOldChat({
            ...chat
        })
        setChatType(ChatConstants.USER);
    }

    const openUserChat = (chatObj,type) => {
        console.log(chatObj);
        let chat = null;
        if (ChatConstants.USER === type) {
            if (loginInfo.data.id === chatObj.reciverUser.id) {
                setRecipientUser({ ...chatObj.senderUser })
            } else {
                setRecipientUser({ ...chatObj.reciverUser })
            }
            if (chats && chats.data) {
                const i = chats.data.findIndex(chat =>
                    chat.senderUser && (chat.senderUser.id === loginInfo.data.id || chat.senderUser.id === chatObj.senderUser.id) && chat.reciverUser && (chat.reciverUser.id === chatObj.reciverUser.id || chat.reciverUser.id === loginInfo.data.id))
                if (i > -1) {
                    chat = chats.data[i]
                }
            }
        } else {
            if (chats && chats.data) {
                const i = chats.data.findIndex(chat => chat.chatRoomId === chatObj.chatRoomId)
                if (i > -1) {
                    chat = chats.data[i]
                }
            }
        }
        setOldChat({ ...chat })
        setChatType(type);
    }

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        const wsurl = window.location.origin === 'http://localhost:3001' ? "http://localhost:2727/ws" : window.location.origin + "/ws";
        SockJS = new SockJS(wsurl);
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + loginInfo.data.id + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        console.log("Message recevied", notification);
        if(ChatConstants.USER === notification.messageType){
            dispatch(messageSentSuccss(notification.message[0]))
        }else if(ChatConstants.GROUP === notification.messageType){
            dispatch(reciveGroupChatMsg(notification.message[0]))
        }else if(ChatConstants.CHAT_USER_TYPING === notification.messageType){
            dispatch(typingMessages(notification.message));
        }else if(ChatConstants.GROUP_CHAT_USER_TYPING === notification.messageType){
            dispatch(typingMessages(notification.message));
        }
       
        
    };
    const sendMessage = (msg,type) => {
        // stompClient.send("/app/api/chat", {}, JSON.stringify(msg));
        if(type === ChatConstants.USER){
            dispatch(sendMessageAPI(msg));
        }else{
            dispatch(sendGroupMessageAPI(msg));
        }
        
        console.log("Message sent successfully", JSON.stringify(msg))
    };
    const sendTypingNotification = (payload)=>{
        dispatch(sendTypingNotificationAPI(payload))
    }

    const getCurrentChat = () => {
        if (chats && chats.data && chats.data.length) {
            var i = -1;
            if(chatType === ChatConstants.USER){
                i = chats.data.findIndex(chat => ((chat.chatId && chat.chatId === oldChat.chatId) || chat.reciverUserId === recipientUser.id));
            }else{
                i = chats.data.findIndex(chat => chat.chatRoomId === oldChat.chatRoomId);
            }
            
            if (i > -1) {
                return chats.data[i];
            } else if (chats.data.length === 1 && (oldChat.chatId || oldChat.chatRoomId)) {
                return chats.data[0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    const submitCreateGroup = (groupInfo) => {
        dispatch(createGroupAPI(groupInfo));
    }
    
    return (
        
        <div className="chat-container">
            <div className="chat-row">
                <div className="chat-left">
                    <ChatLeftComponet
                        oldChat={oldChat}
                        recipientUser={recipientUser}
                        loginInfo={loginInfo}
                        chats={chats}
                        openUserChat={openUserChat}
                        users={users}
                        submitCreateGroup={submitCreateGroup}
                        startChat={startChat}
                    />
                </div>
                <div className="chat-middle">
                    <ChatComponet
                        oldChat={oldChat}
                        recipientUser={recipientUser}
                        loginInfo={loginInfo}
                        sendMessage={sendMessage}
                        chats={getCurrentChat()}
                        chatType={chatType}
                        users={users}
                        sendTypingNotification = {sendTypingNotification}
                    />
                </div>
                {/* <div className="chat-right">
                    <UsersComponent
                        startChat={startChat}
                        loginInfo={loginInfo}
                        users={users}
                        chatType={chatType}
                    />
                </div> */}
            </div>
        </div>
    )


}

export default ChatContainer;