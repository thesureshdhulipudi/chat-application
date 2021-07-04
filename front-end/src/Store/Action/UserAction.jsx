import { StoreConstants } from "../StoreConstants";

export function fetchUsersLoading() {
    return {
        type: StoreConstants.FETCH_USERS_LOADING
    }
}

export function fetchUsersSuccss(response) {
    return {
        type: StoreConstants.FETCH_USERS_SUCCESS,
        response
    }
}

export function fetchUsersFailed(faildMessage) {
    return {
        type: StoreConstants.FETCH_USERS_FAILED,
        faildMessage
    }
}