import './ChatRight.css';
import UserProfile from './UserProfile';

const UsersComponent = (props) => {

    const { loginInfo, users } = props;


    const startChat = (user) => {
        console.log(user);
        props.startChat(user);
    }

    return (
        <div>
            <div className="">
                <div className="chat-right-header">
                    Users
                </div>
                <div className="users-div">
                    {users && users.data && users.data.length ?
                        (users.data.map((val, index) =>
                            val.id === loginInfo.data.id
                                ? null
                                : <UserProfile
                                    user={val}
                                    index={index}
                                    handleUser={startChat}
                                    chatUserProfile="chat-user-chat-profile"
                                    chatUserIcon="chat-user-icon"
                                />
                        ))
                        : "No Users Found"
                    }
                </div>
            </div>
        </div>
    )
    // (<div key={index}className="chat-user-chat-profile" onClick={e => { startChat(val) }}>
    //                                 {val.avatarUrl
    //                                     ? <img src={val.avatarUrl} alt="Avatar" className="chat-user-profile-avatar"></img>
    //                                     : <span className="chat-user-icon" />}
    //                                 <div  className= {val.avatarUrl ? "chat-user-chat-profile-user-name2" : "chat-user-chat-profile-user-name"} > {val.firstName + ' ' + val.lastName}</div>
    //                             </div>)
}
export default UsersComponent;