import {
    USER_LOGIN,
    USER_LOGOUT
} from './types';

export function userLogIn(user){
    return {
        type : USER_LOGIN,
        payload : user,
    }
}

export function userLogOut(){
    return {
        type : USER_LOGOUT,
    }
}