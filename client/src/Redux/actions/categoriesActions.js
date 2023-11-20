import {
GET_CATEGORIES,
GET_FORUM_CATEGORIES,
} from "../action types/ongAndCategoriesActionTypes.js"

import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders .js";

export const getCategories = () => {
    return async function (dispatch) {
        try {
            const config= configureHeaders()
            const response = await axios.get("http://localhost:19789/categories",config)
            dispatch({type: GET_CATEGORIES, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const getForumCategories = () => {
    return async function (dispatch) {
        try {
            const config= configureHeaders()
            const response = await axios.get("http://localhost:19789/forumCategories",config)
            dispatch({type: GET_FORUM_CATEGORIES, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}
