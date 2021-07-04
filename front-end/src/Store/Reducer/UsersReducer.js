import { StoreConstants } from "../StoreConstants"

export function usersReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.FETCH_USERS_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                data: null
            };
        }
        case StoreConstants.FETCH_USERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.response
            };
        }
        case StoreConstants.FETCH_USERS_FAILED: {
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