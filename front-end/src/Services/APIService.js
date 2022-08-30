import { fetchChatMessagesFailed, fetchChatMessagesLoading, fetchChatMessagesSuccss } from "../Store/Action/ChatMessagesAction";
import { createGroupFailed, createGroupSuccss, fetchChatsFailed, fetchChatsLoading, fetchChatsSuccss, fetchGroupChatsFailed, fetchGroupChatsSuccss, groupMessageSentFailed, groupMessageSentSuccss, messageSentFailed, messageSentSuccss } from "../Store/Action/ChatsAction";
import { loginFailed, loginLoading, loginSuccss } from "../Store/Action/LoginAction"
import { signUpFailed, signUpLoading, signUpSuccss } from "../Store/Action/SignUpAction";
import { fetchUsersFailed, fetchUsersLoading, fetchUsersSuccss } from "../Store/Action/UserAction";

const BASE_URL = 'http://localhost:5000/api/';
const API = {
    SIGN_UP: BASE_URL + 'user/signUp',
    SIGN_IN: BASE_URL + 'user/signIn',
    FETCH_USERS: BASE_URL + 'user/',
    SNED_MSG: BASE_URL + 'chat',
    FETCH_CHAT_MSGS: BASE_URL + 'chat/',
    FETCH_CHATS: BASE_URL + 'chat/',
    FETCH_GROUP_CHAT_MSGS: BASE_URL + 'chat/fetchChatRooms/',
    SNED_GROUP_MSG: BASE_URL + 'chat/sendChatRoomMessage',
    CREATE_GROUP: BASE_URL + 'chat/createChatRoom',
    SEND_TYPING_MESSAGE: BASE_URL + 'chat/sendTypingMessage'

}

export function signUpAPI(payload) {
    return dispatch => {
        dispatch(signUpLoading())
        return fetch(API.SIGN_UP, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(signUpSuccss(response))
            } else {
                dispatch(signUpFailed(response))
            }
        }).catch(err => {
            console.log(err);
            dispatch(signUpFailed('Signup failed.'))
        })
    }
}

export function signInAPI(payload) {
    return dispatch => {
        dispatch(loginLoading())
        return fetch(API.SIGN_IN, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(loginSuccss(response.result[0]));
            } else {
                dispatch(loginFailed(response))
            }
        }).catch(err => {
            console.log(err);
            dispatch(loginFailed('Login failed'))
        })
    }
}

export function sendMessageAPI(payload) {
    return dispatch => {
        return fetch(API.SNED_MSG, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(messageSentSuccss(response.result[0]));
            } else {
                dispatch(messageSentFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(messageSentFailed('Login failed'))
        })
    }
}

export function getUsersAPI() {
    return dispatch => {
        dispatch(fetchUsersLoading())
        return fetch(API.FETCH_USERS, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(fetchUsersSuccss(response.result));
            } else {
                dispatch(fetchUsersFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(fetchUsersFailed('Fetch Users failed'))
        })
    }
}

export function getChatMessagesAPI(chatId) {
    return dispatch => {
        dispatch(fetchChatMessagesLoading())
        return fetch(API.FETCH_CHAT_MSGS + chatId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(fetchChatMessagesSuccss(response.result[0]));
            } else {
                dispatch(fetchChatMessagesFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(fetchChatMessagesFailed('Fetch Chat Messages failed'))
        })
    }
}

export function getChatsAPI(userId) {
    return dispatch => {
        dispatch(fetchChatsLoading())
        return fetch(API.FETCH_CHATS + userId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(fetchChatsSuccss(response.result));
            } else {
                dispatch(fetchChatsFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(fetchChatsFailed('Fetch Chats failed'))
        })
    }
}

export function getGroupChatMessagesAPI(userId) {
    return dispatch => {
        return fetch(API.FETCH_GROUP_CHAT_MSGS + userId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(fetchGroupChatsSuccss(response.result));
            } else {
                dispatch(fetchGroupChatsFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(fetchGroupChatsFailed('Fetch Group Messages failed'))
        })
    }
}

export function sendGroupMessageAPI(payload) {
    return dispatch => {
        return fetch(API.SNED_GROUP_MSG, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(groupMessageSentSuccss(response.result[0]));
            } else {
                dispatch(groupMessageSentFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(groupMessageSentFailed('Group message failed'))
        })
    }
}

export function createGroupAPI(payload) {
    return dispatch => {
        return fetch(API.CREATE_GROUP, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            if (response && response.statusCode === 0) {
                dispatch(createGroupSuccss(response.result[0]))
            } else {
                dispatch(createGroupFailed(response.description))
            }
        }).catch(err => {
            console.log(err);
            dispatch(createGroupFailed('Group creation failed.'))
        })
    }
}

export function sendTypingNotificationAPI(payload){
    return dispatch =>{
        return fetch(API.SEND_TYPING_MESSAGE,{
            headers:{
                    'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(response=>{
            return response.json();
        }).then(response=>{
            console.log(response)
            // if(response && response.statusCode ===0){
            //     dispatch(sendTypingNotificationSuccess(response));
            // }
        }).catch(err=>{
            console.log(err);
        })
    }
}