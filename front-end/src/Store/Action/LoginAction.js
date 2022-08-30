import { StoreConstants } from "../StoreConstants";

export function loginLoading() {
    return {
        type: StoreConstants.LOGIN_LOADING
    }
}

export function loginSuccss(response) {
    return {
        type: StoreConstants.LOGIN_SUCCESS,
        response,
    }
}

export function loginFailed(response) {
    return {
        type: StoreConstants.LOGIN_FAILED,
        response,
    }
}