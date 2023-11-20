import {
CREATE_USER,
DELETE_USER,
GET_USERS,
GET_USER_DETAIL,
CLEAR_USER_DETAIL,
UPDATE_USER,
} from "../action types/usersActionTypes.js"
import { configureHeaders } from "../auth/configureHeaders .js";

import axios from "axios";

    export const createUser = (user) => {
        return async function (dispatch) {
            try {
                const config= configureHeaders()
                const response = await axios.post("http://localhost:19789/users", user,config);
                dispatch({type: CREATE_USER, payload: response});
            } catch (error) {   
                console.log(error, "por favor contactar a soporte por este error")
            }
        }
    }
    
    export const deleteUser = (id) => {
        return async function (dispatch) {
            try {
                const config= configureHeaders()
                const response = await axios.delete(`http://localhost:19789/users/${id}`, config);
                dispatch({type: DELETE_USER, payload: response.data});
            } catch (error) {
                console.log(error, "por favor contactar a soporte por este error")
            }
        }
    }
    
    export const getUsers = () => {
        return async function (dispatch) {
            try {
                const config= configureHeaders()
                const response = await axios.get("http://localhost:19789/users",config);
                dispatch({type: GET_USERS, payload: response.data});
            } catch (error) {
                console.log(error, "por favor contactar a soporte por este error")
            }
        }
    }
    
    export const getUserDetail = (id) => {
        return async function (dispatch) {
            try {
                const config= configureHeaders()
                const response = await axios.get(`http://localhost:19789/users/${id}`,config);
                dispatch({type: GET_USER_DETAIL, payload: response.data});
            } catch (error) {
                console.log(error, "por favor contactar a soporte por este error")
            }
        }
    }

    export const clearUserDetail = () => {
        return {type: CLEAR_USER_DETAIL}
    }
    
    export const updateUser = (id, updatedUserData) => {
        return async function (dispatch) {
            try {
                const config= configureHeaders()
                const response = await axios.put(`http://localhost:19789/users/${id}`, updatedUserData,config);
                dispatch({type: UPDATE_USER, payload: response.data})
            } catch (error) {
                console.log(error, "por favor contactar a soporte por este error");
            }
        }
    }