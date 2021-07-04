import { StoreConstants } from "../StoreConstants"

export function loginReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.LOGIN_LOADING: {
            return {
                ...state,
                isLogin: false,
                data: null,
                loginType: null
            };
        }
        case StoreConstants.LOGIN_SUCCESS: {
            return {
                ...state,
                isLogin: true,
                data: action.response
            };
        }
        case StoreConstants.LOGIN_FAILED: {
            return {
                ...state,
                isLogin: false,
                data: action.response,
                message:action.failedMessage
            };
        }
        default:
            return state;


    }

}