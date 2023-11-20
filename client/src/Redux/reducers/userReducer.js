import {
CREATE_USER,
DELETE_USER,
GET_USERS,
GET_USER_DETAIL,
CLEAR_USER_DETAIL,
UPDATE_USER
} from "../action types/usersActionTypes.js";

const initialState = {
    users: [],
    //allUsers: [],
    userDetail: [],
};

const userReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user.id !== action.payload
                    ),
            };    
           
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                //allUsers: action.payload,
            };

        case GET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
            };
            
        case CLEAR_USER_DETAIL:
            return {
                ...state,
                userDetail: [],
            };

        case UPDATE_USER:
            const updatedUser = action.payload;
            const updatedUsers = state.users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
                );
                return {
                    ...state,
                    users: updatedUsers,
                }    
        
            default:
                return {...state};
    }
};

export default userReducer;