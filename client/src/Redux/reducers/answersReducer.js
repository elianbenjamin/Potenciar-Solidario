import {
  GET_ANSWERS,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  GET_ANSWER_COMMENT,
  CREATE_ANSWER_COMMENT,
  DELETE_ANSWER_COMMENT,
  UPDATE_ANSWER_COMMENT,
} from "../action types/answersActionTypes.js";
import { getAnswers } from "../actions/answersActions.js";

import { notification } from "antd";

const initialState = {
  answers: [],
  allAnswers: [],
  answerComments: [],
};

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: action.payload,
        allAnswers: action.payload,
      };

    case CREATE_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };

    case UPDATE_ANSWER:
      const updatedAnswer = action.payload;
      const updatedAnswers = state.answers.map((answer) =>
        answer.id === updatedAnswer.id ? updatedAnswer : answer
      );
      return {
        ...state,
        answers: updatedAnswers,
      };

    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter((answer) => answer.id !== action.payload),
      };

    case CREATE_ANSWER_COMMENT:
      return {
        ...state,
        answerComments: [...state.answerComments, action.payload],
      };

    case DELETE_ANSWER_COMMENT:
      return {
        ...state,
        answerComments: state.answerComments.filter(
          (answerComment) => answerComment.id !== action.payload
        ),
      };

    case UPDATE_ANSWER_COMMENT: {
      const updatedAnswerComment = action.payload;
      const updatedAnswerComments = state.answerComments.map((answerComment) =>
        answerComment.id === updatedAnswerComment.id
          ? updatedAnswerComment
          : answerComment
      );
      return {
        ...state,
        answerComments: updatedAnswerComments,
      };
    }

    case GET_ANSWER_COMMENT:
      return {
        ...state,
        answerComments: action.payload,
      };

    default:
      return { ...state };
  }
};

export default answerReducer;
