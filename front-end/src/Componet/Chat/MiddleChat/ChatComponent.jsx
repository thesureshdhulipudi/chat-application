import { useEffect, useRef, useState } from "react"
import { ChatConstants } from "../../../Utils/Constansts";
import './ChatComponent.css';
import './Chat.css';
import { getFormatedDate } from "../../../Utils/CommonUtil";
import Wave from "../../UtilsComponets/Wave";
const ChatComponet = (props) => {

    const { oldChat, recipientUser, loginInfo, chats, chatType, users } = props;
    console.log(loginInfo)
    const [messsage, setMessage] = useState({ messageText: '' });
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

    };
    useEffect(() => {
        scrollToBottom();
       // sortChats();
    });
   
    const sortChats =()=>{
        if(chats && chats.length){
            for(var i=0;i<chats.length;i++){
                chats[i].chatMessages.sort((a,b) => new Date(a.messageTimestamp) - new Date(b.messageTimestamp));
                chats[i] = {
                  ...chats[i],
                  "messageTimestamp": chats[i].chatMessages.length ? chats[i].chatMessages[0].messageTimestamp : new Date()
                }
              }
              chats.sort((a,b)=> new Date(b.messageTimestamp) - new Date(a.messageTimestamp));  
        }
        
    }

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(chats);
        var msg = {};
        if (chatType === ChatConstants.USER) {
            msg = {
                senderId: loginInfo.data.id,
                recipientId: recipientUser.id,
                content: messsage.messageText,
                chatId: oldChat.chatId
            };
        } else {
            msg = {
                "chatRoomId": chats.chatRoomId,
                "message": messsage.messageText,
                "senderId": loginInfo.data.id
            }
        }
        props.sendMessage(msg, chatType);
        console.log("Message sent successfully", JSON.stringify(msg))
        setMessage(prev => ({ ...prev, messageText: '' }))
    };
    const handleInputChange = e => {
        setMessage({
            ...messsage,
            [e.target.name]: e.target.value
        })
        const id = chats.chatId !== null && chats.chatId ? chats.chatId : (chats.chatRoomId != null && chats.chatRoomId ? chats.chatRoomId : null);
        if (e.target.value.length >= 3 && id) {
            const typing = {
                id: id,
                receiverId: recipientUser.id,
                senderId: loginInfo.data.id,
                chatType: chatType
            }
            props.sendTypingNotification(typing);
        }
    }
    const getUser = (id) => {
        var i = users.data.findIndex(user => user.id === id);
        if (i > -1) {
            return users.data[i];
        } else {
            return null;
        }
    }
    const leftSideMsg = (data, index) => {
        const user = getUser(data.senderUserId);
        return (
            <div key={index} className="msg left-msg">
                <div className="msg-img" style={{ backgroundImage: `url(${user.avatarUrl})` }} ></div>

                <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-name">{user.firstName}</div>
                        <div className="msg-info-time">{getFormatedDate(data.messageTimestamp)}</div>
                    </div>

                    <div className="msg-text">
                        {data.message}
                    </div>
                </div>
            </div>
        );
    }
    const rightSideMsg = (data, index) => {
        return (
            <div key={index} className="msg right-msg">
                <div className="msg-bubble">
                    <div className="msg-info">
                        <div className="msg-info-time">{getFormatedDate(data.messageTimestamp)}</div>
                    </div>
                    <div className="msg-text">
                        {data.message}
                    </div>
                </div>
            </div>
        )
    }
    const populateMsg = (chat, index) => {
        if (chat && chat.senderUserId && chat.senderUserId === loginInfo.data.id) {
            return rightSideMsg(chat, index);
        } else {
            return leftSideMsg(chat, index);
        }
    }
    const getChatHeader = (chat) => {
        if (chat && chat.chatId) {
            const user = getUser(chat.senderUserId === loginInfo.data.id ? chat.reciverUserId : chat.senderUserId);
            if (user) {
                return (<div className="msger-header-title">
                    {user.avatarUrl
                        ? <img src={user.avatarUrl} alt="Avatar" className="chat-user-profile-avatar" style={{ float: 'left' }}></img>
                        : <span className="chat-user-icon chat-title-user-icon" />}
                    <div className="chat-title-user-name">{user.firstName + " " + user.lastName}</div>
                    <i className="fas fa-comment-alt"></i>
                </div>);
            } else {
                return null;
            }

        } else if (chat && chat.chatRoomId) {
            return (<div className="msger-header-title">
                {chat.avatarUrl
                    ? <img src={chat.avatarUrl} alt="Avatar" className="chat-user-profile-avatar"></img>
                    : <span className="chat-user-group-icon chat-title-group-icon" />}
                <div className="chat-title-group-name"> {chat.chatRoomName}</div>
                <i className="fas fa-comment-alt"> </i>
            </div>);
        }
    }

    const typing = (chat) => {
        if (chat && chat.typing && chat.typing.isTyping) {
            if (chat.typing.chatType === ChatConstants.USER) {
                const user = getUser(chat.senderUserId === loginInfo.data.id ? chat.reciverUserId : chat.senderUserId);
                if (user) {
                    return (<div>
                        <Wave
                            name={user.firstName}
                            typing={chat.typing}
                            showName={true}
                            userNameClass="chat-middle-typing-user-name"
                            waveClass="wave-middle"

                        />
                    </div>)
                } else {
                    return <div style={{ height: '23px' }}></div>;
                }
            } else {
                const user = getUser(chat.typing.senderId);
                if (user) {
                    return (<div>
                        <Wave
                            name={user.firstName}
                            typing={chat.typing}
                            showName={true}
                            userNameClass="chat-middle-typing-user-name"
                            waveClass="wave-middle"

                        />
                    </div>)
                } else {
                    return <div style={{ height: '23px' }}></div>;
                }
            }


        } else {
            return <div style={{ height: '23px' }}></div>;
        }
    }
    return (

        <div classNameName="chat-message-container">
            <section className="msger">
                {chatType ?
                    (<div>
                        <header className="msger-header">
                            {getChatHeader(chats)}
                            <div className="msger-header-options">
                                <span><i className="fas fa-cog"></i></span>
                            </div>
                        </header>

                        <main className="msger-chat" id="msger-chat-id">
                            {chatType === ChatConstants.USER
                                ? <div> {chats && chats.chatMessages && chats.chatMessages.length ?
                                    chats.chatMessages.map((chat, i) =>
                                        populateMsg(chat, i)
                                    )
                                    : "No Messages to load"}
                                </div>
                                : (chats && chats.chatMessages && chats.chatMessages.length
                                    ? (chats.chatMessages.map((chat, i) =>
                                        populateMsg(chat, i)
                                    ))
                                    : "Welcome to group"
                                )
                            }

                            <div ref={messagesEndRef} />

                        </main>
                        {typing(chats)}
                        <form className="msger-inputarea">
                            <input type="text" className="msger-input" placeholder="Enter your message..." name="messageText" onChange={handleInputChange} />
                            <button type="submit" className="msger-send-btn" onClick={sendMessage}>Send</button>
                        </form>
                    </div>
                    )
                    : (<div className="chat-welcome-image"><div className="chat-welocme-msg" >Welcome to chat room</div></div>)}
            </section>

        </div>
    )

}
export default ChatComponet;