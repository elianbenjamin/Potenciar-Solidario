import {
GET_CATEGORIES,
GET_ONGS,
GET_FORUM_CATEGORIES
} from "../action types/ongAndCategoriesActionTypes.js";

const initialState = {
    categories: [],
    ongs: [],
    forumCategories: [],
};

const ongsAndCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case GET_ONGS:
            return {
                ...state,
                ongs: action.payload,
            };
            
        case GET_FORUM_CATEGORIES:
            return {
                ...state,
                forumCategories: action.payload,
            }    
            
        default:
            return {...state};    
    }
};

export default ongsAndCategoriesReducer;