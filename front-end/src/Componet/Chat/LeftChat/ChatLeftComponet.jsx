import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateChatGroup from "./CreateChatGroupComponet";
import UserChatComponet from "./UserChatComponet";
import './ChatLeft.css';
import Dropdown from "../../UtilsComponets/DropDown";
import { ChatConstants } from "../../../Utils/Constansts";
import UsersComponent from "../RightChat/UsersComponent";

const options = ["All Users", "Create Group", "Settings","Logout"];
const ChatLeftComponet = (props) => {

    const { oldChat, recipientUser, loginInfo, chats, users } = props;
    const [openOptions, setOpenOptions] = useState(false);
    const [createGroup, setCreateGroup] = useState(false);
    const [usersListPage, setusersListPage] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("oldChat", oldChat)
        console.log("recipientUser", recipientUser)
        // if(oldChat.chatId === undefined && recipientUser.id){
        //     chats
        // }
    })
    const openUserChat = (chatObj, type) => {
        props.openUserChat(chatObj, type);
    }
    const clickOpenOption = () => {
        setOpenOptions(prev=> !prev);
    }
    const handelCloseOpenOption = () => {
        setOpenOptions(false);
    }
    
    const closeOpenOption = () => {
        setOpenOptions(false);
        setusersListPage(false);
        setCreateGroup(false);
    }

    const submitCreateGroup = (groupInfo) => {
        console.log(groupInfo);
        setCreateGroup(false);
        props.submitCreateGroup(groupInfo);
    }
    const backFromCreateGroup = () => {
        setCreateGroup(false);
        setusersListPage(false);
        setOpenOptions(false);
    }
    const selectedItem = (item) => {
        console.log(item);
        setOpenOptions(false);
        if (item === "Create Group") {
            setCreateGroup(true);
        }else if (item === "All Users") {
            setusersListPage(true);
        } else if (item === "Logout"){
            window.location.reload();
        }
    }

    const startChat = (user) => {
        console.log(user);
        props.startChat(user);
        closeOpenOption();
    }
    
    return (

        <div className="chat-left-container">
            <div className="chat-left-top">
                <div className="chat-left-user-profile">
                    {loginInfo.data.avatarUrl
                        ? <img src={loginInfo.data.avatarUrl} alt="Avatar" className="chat-user-profile-avatar"></img>
                        : <span className="chat-user-icon" />}
                    <span className={loginInfo.data.avatarUrl ? "chat-left-user-profile-user-name" : "chat-left-user-profile-user-name2"}>{loginInfo.data.firstName}</span>
                </div>
                <div className="chat-left-options" >
                    <i className="chat-left-options-icon" onClick={clickOpenOption}>...</i>
                    {openOptions
                        ? <Dropdown
                            selectedItem={selectedItem}
                            dropDownList={options}
                        /> : ''}

                </div>
            </div>
            {createGroup ?
                <CreateChatGroup
                    users={users}
                    submitCreateGroup={submitCreateGroup}
                    loginInfo={loginInfo}
                    backFromCreateGroup={backFromCreateGroup}
                />
                :
                (usersListPage ? 
                <div>
                    <div className="chat-right">
                    <UsersComponent
                        startChat={startChat}
                        loginInfo={loginInfo}
                        users={users}
                        closeOpenOption = {closeOpenOption}
                        // chatType={chatType}
                    />
                </div>
                </div> 
                : (<div onClick={handelCloseOpenOption}>
                    <UserChatComponet
                        loginInfo={loginInfo}
                        chats={chats}
                        _chats={chats}
                        oldChat={oldChat}
                        recipientUser={recipientUser}
                        openUserChat={openUserChat}
                        users={users}
                    />
                </div>))
            }
        </div>
    )

}
export default ChatLeftComponet;