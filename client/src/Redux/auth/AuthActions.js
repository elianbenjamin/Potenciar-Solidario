import { types } from "./types";
import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders .js";
const config = configureHeaders();

const registerUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:19789/register",
        user
      );

      dispatch({ type: types.REGISTER, payload: data.userWithoutPassword });
      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: types.ERROR_REGISTER,
        payload: error.response.data.message,
      });
      console.log(error.response.data);
      return Promise.reject(error);
    }
  };
};

const getProfile = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:19789/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: types.GET_PROFILE, payload: data });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: types.ERROR_REGISTER, payload: error.response.data });
    }
  };
};

const updateProfile = (id, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:19789/users/${id}`,
        { ...user },
        config
      );
      dispatch({ type: types.UPDATE_PROFILE, payload: data });
      return Promise.resolve(data);
    } catch (error) {
      console.log(error.response.data);

      return Promise.reject(error);
    }
  };
};
const deleteProfile = (id) => {
  return async (dispatch) => {
    try {
      const config = configureHeaders();

      const { data } = await axios.delete(
        `http://localhost:19789/users/${id}`,
        config
      );
      dispatch({ type: types.DELETE_PROFILE });
      return Promise.resolve(data);
    } catch (error) {
      console.log(error.response.data);

      return Promise.reject(error);
    }
  };
};
const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:19789/login", {
        email,
        password,
      });
      dispatch({ type: types.LOGIN, payload: data });
      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: types.ERROR_LOGIN,
        payload: error.response.data.message,
      });
      console.log(error.response.data);
      return Promise.reject(error);
    }
  };
};

const loginWithGoogleAction = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:19789/authGoogle`, {
        idToken: token.credential,
      });
      dispatch({ type: types.LOGIN_WITH_GOOGLE, payload: data });
      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: types.ERROR_LOGIN,
        payload: error.response.data.message,
      });
      console.log(error.response.data);
      return Promise.reject(error);
    }
  };
};

const logoutAction = () => {
  return (dispatch) => {
    try {
      dispatch({ type: types.LOGOUT });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
};
const deleteSuccess = () => {
  return (dispatch) => {
    try {
      dispatch({ type: types.DELETE_SUCCESS });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
};
const delteSuccessClean = () => {
  return (dispatch) => {
    try {
      dispatch({ type: types.CLEAN_DELETE_SUCCESS });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
};

export {
  registerUser,
  getProfile,
  loginUser,
  loginWithGoogleAction,
  logoutAction,
  updateProfile,
  deleteProfile,
  deleteSuccess,
  delteSuccessClean,

  // userAuthentificated
};
