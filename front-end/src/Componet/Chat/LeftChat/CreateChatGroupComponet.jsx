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
                <button className="chat-btn btn-create" onClick={clickCreateGroup} >Create Group</button>
                <button className="chat-btn btn-cancle" onClick={props.backFromCreateGroup} >Cancle</button>
            </div>
            <div className="chat-boarder"></div>
            <div>
                <input type="text" name="groupName" placeholder="Enter Group Name" onChange={handleInputChange} />
            </div>
            {/* <div className="chat-boarder"></div> */}
            <div>Select the users</div>
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