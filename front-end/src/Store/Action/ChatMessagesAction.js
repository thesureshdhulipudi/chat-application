import { StoreConstants } from "../StoreConstants";

export function fetchChatMessagesLoading() {
    return {
        type: StoreConstants.FETCH_CHAT_MSGS_LOADING
    }
}

export function fetchChatMessagesSuccss(response) {
    return {
        type: StoreConstants.FETCH_CHAT_MSGS_SUCCESS,
        response
    }
}

export function fetchChatMessagesFailed(faildMessage) {
    return {
        type: StoreConstants.FETCH_CHAT_MSGS_FAILED,
        faildMessage
    }
}