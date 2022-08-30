// import { BsFillPersonFill } from "react-bootstrap-icons";
import './UserProfile.css';
const UserProfile = (props) => {
    const {index, user} = props;
    const handleUser = (user)=>{
        props.handleUser(user);
    }
    return (
        <div>
            {/* <BsFillPersonFill/> */}
            
        <div key={index} className={props.checked ? props.chatUserProfile + " chat-user-profile" : props.chatUserProfile}  onClick={e => { handleUser(user) }}>
            {user.avatarUrl
                ? <img src={user.avatarUrl} alt="Avatar" className="chat-user-profile-avatar"></img>
                : <span className={props.chatUserIcon} />}
            <div className={user.avatarUrl ? "chat-user-chat-profile-user-name2" : "chat-user-chat-profile-user-name"} > {user.firstName + ' ' + user.lastName}</div>
        </div>
        </div>
    )
}
export default UserProfile;