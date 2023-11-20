// Importación de acciones relacionadas con las respuestas del foro.

import {
  GET_ANSWERS,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  CREATE_ANSWER_COMMENT,
  DELETE_ANSWER_COMMENT,
  UPDATE_ANSWER_COMMENT,
  GET_ANSWER_COMMENT,
} from "../action types/answersActionTypes.js";

// Importación de la biblioteca Axios para realizar solicitudes HTTP y configuración de encabezados de autenticación.

import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders .js";

//Funcion para obtener todas las respuestas.
export const getAnswers = () => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud GET para obtener respuestas.
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:19789/answers",
        config
      );
      // Despacho de la acción para almacenar las respuestas en el estado.
      dispatch({ type: GET_ANSWERS, payload: response.data });
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

//Funcion para crear una respuesta.
export const createAnswer = (answer) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud POST para crear una respuesta.
      const config = configureHeaders();
      const response = await axios.post(
        "http://localhost:19789/answers",
        answer,
        config
      );
      // Despacho de la acción para agregar la nueva respuesta al estado.
      dispatch({ type: CREATE_ANSWER, payload: response.data });
      return Promise.resolve(response);
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error);
    }
  };
};

// Función para actualizar una respuesta.
export const updateAnswer = (id, answer) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud PUT para actualizar una respuesta.
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/answers/${id}`,
        answer,
        config
      );
      // Despacho de la acción para actualizar la respuesta en el estado.
      dispatch({ type: UPDATE_ANSWER, payload: response.data });
      return Promise.resolve(response)
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error)
    }
  };
};

// Función para eliminar una respuesta.
export const deleteAnswer = (id) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud DELETE para eliminar una respuesta.
      const config = configureHeaders();
      const response = await axios.delete(
        `http://localhost:19789/answers/${id}`,
        config
        );

        // Despacho de la acción para eliminar la respuesta del estado.
        dispatch({ type: DELETE_ANSWER, payload: response.data });
        return Promise.resolve(response)
      } catch (error) {
        // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error)
    }
  };
};

// Función para crear un comentario en una respuesta.
export const createAnswerComment = (comment) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud POST para crear un comentario en una respuesta.
      console.log(comment);
      const config = configureHeaders();
      const response = await axios.post(
        "http://localhost:19789/answers/comments",
        comment,
        config
      );

      // Despacho de la acción para agregar el nuevo comentario al estado.
      dispatch({ type: CREATE_ANSWER_COMMENT, payload: response.data });
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

// Función para eliminar un comentario en una respuesta.
export const deleteAnswerComment = (id) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud DELETE para eliminar un comentario en una respuesta.
      const config = configureHeaders();
      const response = await axios.delete(
        `http://localhost:19789/answers/comments/${id}`,
        config
      );

      // Despacho de la acción para eliminar el comentario del estado.
      dispatch({ type: DELETE_ANSWER_COMMENT, payload: response.data });
      return Promise.resolve(response)
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error)
    }
  };
};

// Función para actualizar un comentario en una respuesta.
export const updateAnswerComment = (id, thread) => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud PUT para actualizar un comentario en una respuesta.
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/answers/comments/${id}`,
        thread,
        config
      );
      // Despacho de la acción para actualizar el comentario en el estado.
      dispatch({ type: UPDATE_ANSWER_COMMENT, payload: response.data });
      return Promise.resolve(response)
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error)
    }
  };
};

// Función para obtener comentarios en una respuesta.
export const getAnswerComment = () => {
  return async function (dispatch) {
    try {
      // Configuración de encabezados y solicitud GET para obtener comentarios en respuestas.
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:19789/answers/comments",
        config
      );
      // Despacho de la acción para almacenar los comentarios en el estado.
      dispatch({ type: GET_ANSWER_COMMENT, payload: response.data });
    } catch (error) {
      // Manejo de errores y registro en la consola.
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};
