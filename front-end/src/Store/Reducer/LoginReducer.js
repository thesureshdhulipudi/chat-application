import { StoreConstants } from "../StoreConstants"

export function loginReducer(state = {}, action) {
    switch (action.type) {
        case StoreConstants.LOGIN_LOADING: {
            return {
                ...state,
                isLogin: false,
                data: null,
                loginType: null,
                message: null
            };
        }
        case StoreConstants.LOGIN_SUCCESS: {
            return {
                ...state,
                isLogin: true,
                data: action.response,
                message: null
            };
        }
        case StoreConstants.LOGIN_FAILED: {
            return {
                ...state,
                isLogin: false,
                data: action.response,
                message:action.response.description
            };
        }
        default:
            return state;


    }

}