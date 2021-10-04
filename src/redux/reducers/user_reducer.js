export const USER_LOGIN = "user_login";
export const USER_LOGOUT = "user_logout";

const initialUserState = {
    currentUser: null,
    isLoading : false
}

const reducer = (state = initialUserState, action) => {
    switch (action.type) { 
        case USER_LOGIN:
            return ({
                ...state,
                currentUser : action.payload,
                isLoading: true,
            })

        case USER_LOGOUT:
            return ({
                currentUser: null,
                isLoading : true
            })
        default:
            return state;
    }
};

export default reducer;