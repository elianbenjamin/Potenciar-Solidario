import { types } from "./types";

const token = localStorage.getItem("token");

const initialState = {
  user: {},
  userProfile: {},
  token: token,
  isAuthenticated: !!token,
  isAdmin: false,
  loading: true,
  errorRegister: null,
  errorLogin: null,
  deleteSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGIN:
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        token: action.payload.jwt,
        isAuthenticated: true,
        isAdmin: state.userProfile.admin,
        loading: false,
      };
    case types.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
      };
    case types.LOGIN_WITH_GOOGLE:
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        token: action.payload.jwt,
        isAuthenticated: true,
        isAdmin: state.userProfile.admin,
        loading: false,
        deleteSuccess: false,
      };
    case types.GET_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        isAdmin: state.userProfile.admin,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case types.DELETE_PROFILE:
      localStorage.removeItem("token");
      return {
        ...state,
        userProfile: null,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        deleteSuccess: true,
      };
    case types.ERROR_REGISTER:
      return {
        ...state,
        errorRegister: action.payload,
      };

    case types.ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.payload,
        deleteSuccess: false,
      };

    case types.DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
      };
    case types.CLEAN_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: false,
      };

    default: {
      return { ...state };
    }
  }
};

export default authReducer;
