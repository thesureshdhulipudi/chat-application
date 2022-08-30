import { useState } from "react";
import MultiSelect from "../../UtilsComponets/MultiSelect";

const CreateChatGroup = (props) => {
    const { users ,loginInfo } = props;
    const [groupInfo, setGroupInfo] = useState({ 'groupName': '', 'groupMembers': [] })

    const handleInputChange = (e) => {
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSelectUsers = (user) => {
        console.log(user);
        setGroupInfo({
            ...groupInfo,
            groupMembers : user
        })
        console.log(groupInfo);
    }
    const clickCreateGroup = () => {
        const groupData = {
            "chatRoomName": groupInfo.groupName,
            "chatRoomUserIds": groupInfo.groupMembers,
            "createdBy": loginInfo.data.id,
        }
        props.submitCreateGroup(groupData)
    }
    
    return (
        <div className="create-chat-room-container">
            <div className="chat-group-create-btns">
                <span className="group-create-name">New Chat Group</span>
                <button className="btn-close-group" onClick={props.backFromCreateGroup} >X</button>
            </div>
            <div className="group-name-btn-div">
                <input type="text" className="group-name-input" name="groupName" placeholder="Enter Group Name" onChange={handleInputChange} />
                <button className="chat-btn btn-create" onClick={clickCreateGroup} >Create Group</button>
            </div>
            <div style={{padding: '5px'}}>Select the participants</div>
            <div>
                <MultiSelect
                    options={users.data}
                    onOptionsChange={handleSelectUsers}
                />

            </div>
            
        </div>
    )
}
export default CreateChatGroup;