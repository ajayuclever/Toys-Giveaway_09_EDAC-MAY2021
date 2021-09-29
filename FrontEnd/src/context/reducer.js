import { SET_LOGGED_IN, LOGOUT, UPDATE_USER } from "./action-type";

const initialState = {
    isLoggedIn: false,
    loggedInUserType:"",
    loggedInUser: ""
}

export const reducer =  (state = initialState, action) => {
    switch(action.type)
    {
        case SET_LOGGED_IN:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                loggedInUserType: action.payload.loggedInUserType,
                loggedInUser: action.payload.loggedInUser
            }
        case LOGOUT:
            return {
                isLoggedIn: false,
                loggedInUserType: '',
                loggedInUser: ''
            }
        case UPDATE_USER:
            return {
                isLoggedIn: true,
                loggedInUserType : action.payload.user.userType,
                loggedInUser: action.payload.user
            }
        default:
            return state
    }
}