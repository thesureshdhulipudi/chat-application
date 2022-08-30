import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatConstants } from '../../../Utils/Constansts';
import { getDateForLeftSideChat } from "../../../Utils/CommonUtil";
import Wave from '../../UtilsComponets/Wave';
import './ChatLeft.css';

// const UserIcon = require('../../../images/user-icon.jpg');

const UserChatComponet = (props) => {
    const { chats, oldChat, recipientUser, loginInfo, users } = props;
    // let { chats} = props;
    const [chatList, setChatList] = useState([]);
    const [searchChat, setSearchChat] = useState('');
    const openUserChat = (data, type) => {
        props.openUserChat(data, type);
    }
    const getUserObj = (obj) => {
        return obj.reciverUser && loginInfo.data && obj.reciverUser.id === loginInfo.data.id ? obj.senderUser : obj.reciverUser;
    }
    let _chats = useSelector(state => state.chats);
    // useEffect(() => {
    //     setChatList(_chats);
    // }, [_chats])
    // useEffect( ()=>{
    //     if(chatList.data && searchChat){
    //         setChatList(chatList.data.filter(chat=> { 
    //             return ((chat.chatRoomName && chat.chatRoomName.toLowerCase().includes(searchChat)) ||(chat.reciverUser && chat.reciverUser.firstName && chat.reciverUser.firstName.toLowerCase().includes(searchChat)) )
    //         }));
    //         //setChatList(c);
    //     }

    // },[searchChat,chatList])
    // if(searchChat){

    // setChatList(chats.data.filter(chat=> { 
    //     return ((chat.chatRoomName && chat.chatRoomName.toLowerCase().includes(searchChat)) ||(chat.reciverUser && chat.reciverUser.firstName && chat.reciverUser.firstName.toLowerCase().includes(searchChat)) )
    // }));
    // setChatList(c);
    // catalogRoleMapData = catalogRoleMapData.filter((item) => {return item.catalogRoleName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1})
    // }
    const searchChats = (e) => {
        chats.data = chatList.data.filter(chat => {
            return ((chat.chatRoomName && chat.chatRoomName.toLowerCase().indexOf(searchChat) > -1) || (chat.reciverUser && chat.reciverUser.firstName && chat.reciverUser.firstName.toLowerCase().indexOf(searchChat) > -1))
            // chats.data = _chats.data.filter((chat) => {return item.catalogRoleName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1})
        });
    }
    const getUser = (id) => {
        if(users.data){
            var i = users.data.findIndex(user => user.id === id);
            if (i > -1) {
                return users.data[i];
            } else {
                return null;
            }
        } else {
            return null;
        }
        
    }
    const typing = (chat) => {
        if (chat && chat.typing && chat.typing.isTyping) {
            let user;
            if (chat.typing.chatType === ChatConstants.USER) {
                user = getUser(chat.senderUserId === loginInfo.data.id ? chat.reciverUserId : chat.senderUserId);
            }else{
                user = getUser(chat.typing.senderId);
            }
            if (user) {
                return (<div>
                    <Wave
                        name={user.firstName}
                        typing={chat.typing}
                        showName={false}
                        userNameClass="chat-left-typing-user-name"
                        waveClass="wave-left-side"
                    />
                </div>)
            } else {
                return <div style={{ height: '23px' }}></div>;
            }

        } else {
            return <div style={{ height: '23px' }}></div>;
        }
    }
    const renderGroups = (obj, index) => {
        return (<div key={index} id={index} className="chat-user-chat-profile" onClick={e => { openUserChat(obj, ChatConstants.GROUP) }}>
            {obj.avatarUrl && obj.avatarUrl !== null
                ? <img src={obj.avatarUrl} alt="Avatar" className="chat-user-profile-avatar"></img>
                : <span className="chat-user-group-icon" />}
            <div className="chat-user-chat-profile-user-name" key={obj.chatRoomId}> {obj.chatRoomName} </div>
            <div className="chat-left-last-timestamp">{getDateForLeftSideChat(obj.lastTimestamp)}</div>
            { obj.typing && obj.typing.isTyping 
            ? typing(obj) 
            : <div className="chat-left-last-sent">{obj.lastMessageSentBy ? (getUser(obj.lastMessageSentBy).firstName + ": " + obj.lastMessage) : ""}</div>
            }
            <div className={obj.lastMessageSentBy ? "chat-left-msg-count" : "chat-left-msg-count-2"}>10</div>
        </div>)
    }
    const renderUsers = (obj, index) => {
        return (<div key={index}  id={index} className="chat-user-chat-profile" onClick={e => { openUserChat(obj, ChatConstants.USER) }}>
            {getUserObj(obj).avatarUrl
                ? <img src={getUserObj(obj).avatarUrl} alt="Avatar" className="chat-user-profile-avatar" ></img>
                : <span className="chat-user-icon" style={{ marginLeft: '-5px' }} />}
            <div className={getUserObj(obj).avatarUrl ? "chat-user-chat-profile-user-name2" : "chat-user-chat-profile-user-name"} key={obj.chatId}>{getUserObj(obj).firstName} </div>
            <div className="chat-left-last-timestamp">{getDateForLeftSideChat(obj.lastTimestamp)}</div>
            { obj.typing && obj.typing.isTyping 
            ? typing(obj) 
            : <div  className="chat-left-last-sent">{getUser(obj.lastMessageSentBy).firstName + ": " + obj.lastMessage}</div>
            }
            <div className="chat-left-msg-count">
                <span style={{textAlign: 'center',padding: '5px'}}>5</span></div>
        </div>)
    }
    return (
        <div>
            <div className="chat-user-group-search">
                <input className="chat-user-group-search-input" placeholder="Search Chat" type="text"  />
                {/* //onChange={e => { setSearchChat(e.target.value); searchChats(e) }} */}
            </div>

            <div className="chat-user-chats" id="jkj12">
                {chats && chats.data ?
                    (chats.data.map((obj, index) =>
                        obj.chatId
                            ? renderUsers(obj, index)
                            : renderGroups(obj, index)
                    ))
                    : null
                }
                {/* {oldChat.chatId === undefined && recipientUser.id && (chats.data.length === 0 || chats.data.findIndex(chatObj => chatObj.reciverUser.id === recipientUser.id) === -1) ?
                    <div key={recipientUser.id} id={recipientUser.id} className="chat-user-chat-profile" onClick={e => { openUserChat(recipientUser, ChatConstants.USER) }}>
                        <div className="chat-user-chat-profile-user-name" >{recipientUser.firstName} </div>
                    </div>
                    : ""
                } */}
            </div>
        </div>
    )
}

export default UserChatComponet;