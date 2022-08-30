import { combineReducers } from 'redux';
import { chatMessagesReducer } from './Reducer/ChatMessagesReducer';
import { fetchChatsReducer } from './Reducer/ChatReducer';
import { loginReducer } from "./Reducer/LoginReducer"
import { signUpReducer } from './Reducer/SignUpReducer';
import { usersReducer } from './Reducer/UsersReducer';
const rootReducer = combineReducers({
    loginInfo: loginReducer,
    users: usersReducer,
    chatMessages: chatMessagesReducer,
    chats: fetchChatsReducer,
    signUp: signUpReducer
})

export default rootReducer;