import { StoreConstants } from "../StoreConstants"

export function chatMessagesReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.FETCH_CHAT_MSGS_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                data: null
            };
        }
        case StoreConstants.FETCH_CHAT_MSGS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.response
            };
        }
        case StoreConstants.FETCH_CHAT_MSGS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null,
                message:action.failedMessage
            };
        }
        default:
            return state;


    }

}