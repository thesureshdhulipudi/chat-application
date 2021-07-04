import { StoreConstants } from "../StoreConstants";

export function fetchChatsLoading() {
    return {
        type: StoreConstants.FETCH_CHATS_LOADING
    }
}

export function fetchChatsSuccss(response) {
    return {
        type: StoreConstants.FETCH_CHATS_SUCCESS,
        response
    }
}

export function fetchChatsFailed(faildMessage) {
    return {
        type: StoreConstants.FETCH_CHATS_FAILED,
        faildMessage
    }
}

export function messageSentSuccss(response) {
    return {
        type: StoreConstants.MSG_SEND_SUCCESS,
        response
    }
}

export function messageSentFailed(faildMessage) {
    return {
        type: StoreConstants.MSG_SEND_FAILED,
        faildMessage
    }
}

export function groupMessageSentSuccss(response) {
    return {
        type: StoreConstants.GROUP_MSG_SEND_SUCCESS,
        response
    }
}

export function groupMessageSentFailed(faildMessage) {
    return {
        type: StoreConstants.GROUP_MSG_SEND_FAILED,
        faildMessage
    }
}

export function fetchGroupChatsSuccss(response) {
    return {
        type: StoreConstants.FETCH_GROUP_CHATS_SUCCESS,
        response
    }
}

export function fetchGroupChatsFailed(faildMessage) {
    return {
        type: StoreConstants.FETCH_GROUP_CHATS_FAILED,
        faildMessage
    }
}

export function createGroupSuccss(response) {
    return {
        type: StoreConstants.CREATE_GROUP_SUCCESS,
        response
    }
}

export function createGroupFailed(faildMessage) {
    return {
        type: StoreConstants.CREATE_GROUP_FAILED,
        faildMessage
    }
}

export function reciveGroupChatMsg(response) {
    return {
        type: StoreConstants.RECIVE_GROUP_CHAT_MSG_SUCCESS,
        response
    }
}

export function typingMessages(response){
    return{
        type: StoreConstants.RECIVE_CHAT_MESSAGE_TYPING,
        response
    }
}
export function typingMessagesStop(response){
    return{
        type: StoreConstants.CHAT_MESSAGE_TYPING_STOP,
        response
    }
}
