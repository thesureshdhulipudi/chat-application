import { StoreConstants } from "../StoreConstants"

export function signUpReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.SIGNUP_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                data: null
            };
        }
        case StoreConstants.SIGNUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.response
            };
        }
        case StoreConstants.SIGNUP_FAILED: {
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