import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST_DETAIL,
  UPDATE_POST,
  SEARCH_POSTS,
  CLEAR_POST_DETAIL,
  //   GET_POSTS_BY_DATE,
  //   GET_POSTS_BY_CATEGORIES,
  //   GET_POSTS_BY_ONGS,
  GET_POSTS_FILTERED,
  SET_POSTS_FILTERS,
  CREATE_POST_REVIEW,
  DELETE_POST_REVIEW,
  UPDATE_POST_REVIEW,
  SET_SEARCH_VALUE,
  LIKE,
  DISLIKE,
  SET_LOADING,
  HIDE_LOADING,
  SET_ORDERINGS,
  SET_SELECTED_OPTIONS,
} from "../action types/postsActionTypes.js";

import axios from "axios";
import unorm from "unorm";

import { configureHeaders } from "../auth/configureHeaders ";

//funcion que se usa en searchPosts() para buscar coincidencias sin distinguir entre mayusculas y minusculas e ignorando los tildes
const searchCoincidences = (string, subString) => {
  const normalizedString = unorm.nfkd(string).replace(/[\u0300-\u036F]/g, "");
  const normalizedSubString = unorm
    .nfkd(subString)
    .replace(/[\u0300-\u036F]/g, "");

  const regExp = new RegExp(normalizedSubString, "i");
  const coincidence = normalizedString.match(regExp);

  if (coincidence) return true;
  else return false;
};

///////////////
export const createPost = (post) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.post(
        "http://localhost:19789/posts",
        post,
        config
      );
      dispatch({ type: CREATE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const deletePost = (id) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.delete(
        `http://localhost:19789/posts/${id}`,
        config
      );

      dispatch({ type: DELETE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const getPosts = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get("http://localhost:19789/posts", config);
      dispatch({ type: GET_POSTS, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const getPostDetail = (id) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `http://localhost:19789/posts/${id}`,
        config
      );
      dispatch({ type: GET_POST_DETAIL, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const updatePost = (id, updatePostData) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/posts/${id}`,
        updatePostData,
        config
      );
      dispatch({ type: UPDATE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const searchPosts = (posts, searchValue) => {
  return async (dispatch) => {
    try {
      const action = {
        type: SEARCH_POSTS,
        payload: [],
      };

      //si el valor introducido en el input llega como un array, significa que son varias palabras
      if (Array.isArray(searchValue)) {
        if (searchValue.includes(" ")) {
          searchValue = searchValue.filter((e) => e !== " ");
        }
        const searchedPosts = posts.filter(
          ({ title, description, category }) => {
            for (let subString of searchValue) {
              //por cada una de las palabras del array se busca alguna coincidencia con el titulo, la descripcion y la categoria, ignorando mayusculas y tildes
              if (
                searchCoincidences(title, subString) ||
                searchCoincidences(description, subString) ||
                searchCoincidences(category, subString)
              )
                return true;
            }
          }
        );
        action.payload = searchedPosts;
      } else {
        const searchedPosts = posts.filter(
          ({ title, description, category }) => {
            if (
              //lo mismo pero con la unica palabra
              searchCoincidences(title, searchValue) ||
              searchCoincidences(description, searchValue) ||
              searchCoincidences(category, searchValue)
            )
              return true;
            else return false;
          }
        );
        action.payload = searchedPosts;
      }

      dispatch(action);
    } catch (error) {
      console.log("Error al buscar posts: ", error);
    }
  };
};

export const clearPostDetail = () => {
  return { type: CLEAR_POST_DETAIL };
};

export const getPostsFiltered = (filters) => {
  const { category, ong, fromDate, untilDate, user } = filters;
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const { data } = await axios.get(
        `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
        config
      );
      dispatch({
        type: GET_POSTS_FILTERED,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPostsFilters = (postsFilters) => {
  return {
    type: SET_POSTS_FILTERS,
    payload: postsFilters,
  };
};

export const setSearchValue = (searchValue) => {
  return {
    type: SET_SEARCH_VALUE,
    payload: searchValue,
  };
};

export const like = (idPublication) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.post(
        `http://localhost:19789/posts/like`,
        { idPublication },
        config
      );
      dispatch({ type: LIKE, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const disLike = (idPublication) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/posts/like`,
        { idPublication },
        config
      );
      response.data.publicationId = idPublication;
      dispatch({ type: DISLIKE, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPostReview = (comment) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.post(
        "http://localhost:19789/comment/create",
        comment,
        config
      );
      dispatch({ type: CREATE_POST_REVIEW, payload: response.data });
      return Promise.resolve(response);
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error);
    }
  };
};

export const deletePostReview = (id) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.delete(
        `http://localhost:19789/comment/delete/${id}`,
        config
      );
      dispatch({ type: DELETE_POST_REVIEW, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const updatePostReview = (id, updatedPostReview) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/comment/${id}`,
        updatedPostReview,
        config
      );
      dispatch({ type: UPDATE_POST_REVIEW, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: HIDE_LOADING,
  };
};

export const setOrderings = (orderBy) => {
  return {
    type: SET_ORDERINGS,
    payload: orderBy,
  };
};

export const setSelectedOptions = (selectedOptions) => {
  return {
    type: SET_SELECTED_OPTIONS,
    payload: selectedOptions,
  };
};
