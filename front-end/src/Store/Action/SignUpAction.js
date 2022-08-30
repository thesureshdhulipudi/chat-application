import { StoreConstants } from "../StoreConstants";

export function signUpLoading() {
    return {
        type: StoreConstants.SIGNUP_LOADING
    }
}

export function signUpSuccss(response) {
    return {
        type: StoreConstants.SIGNUP_SUCCESS,
        response
    }
}

export function signUpFailed(response) {
    return {
        type: StoreConstants.SIGNUP_FAILED,
        response
    }
}