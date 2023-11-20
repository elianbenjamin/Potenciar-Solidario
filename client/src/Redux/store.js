import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import questionReducer from "./reducers/questionReducer";
import ongsAndCategoriesReducer from "./reducers/ongsAndCategoriesReducer";
import authReducer from "./auth/AuthReducer";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import answerReducer from "./reducers/answersReducer";

const persistConfig = {
  key : 'root',
  storage,
  whitelist: ['auth']
}

// Combina los reducers
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  questions: questionReducer,
  ongsAndCategories: ongsAndCategoriesReducer,
  answers: answerReducer,

  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
// Aplica el middleware usando composeWithDevTools
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export const persistor = persistStore(store);
