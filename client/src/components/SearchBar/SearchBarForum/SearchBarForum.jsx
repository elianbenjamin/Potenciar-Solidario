import { useEffect } from "react";
import Styles from "./searchBarForum.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//
import {
  setSearchValue,
  searchQuestions,
  getQuestionsFiltered,
} from "../../../Redux/actions/questionsActions";
//
import axios from "axios";
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";

export default function SearchBarForum() {
  const dispatch = useDispatch();
  const config = configureHeaders();

  const filters = useSelector((state) => state.questions.questionsFilters);
  const searchValue = useSelector((state) => state.questions.searchValue);
  const [inputValue, setInputValue] = useState("");

  function changeHandler({ target: { value } }) {
    setInputValue(value);
  }

  useEffect(() => {
    dispatch(setSearchValue(inputValue));

    if (inputValue === "") {
      dispatch(getQuestionsFiltered(filters));
    } else {
      const { category, fromDate, untilDate, user } = filters;
      let value = inputValue.trim().includes(" ")
        ? inputValue.trim().split(" ")
        : inputValue.trim();

      let debounceTimeout = undefined;
      axios
        .get(
          `http://localhost:19789/questionFilters?category=${category}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
          config
        )
        .then(({ data }) => {
          debounceTimeout = setTimeout(() => {
            dispatch(searchQuestions(data, value));
          }, 400);
        });

      return () => {
        clearTimeout(debounceTimeout);
      };
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(searchValue);
  }, []);

  return (
    <div className={Styles.SearchBar}>
      <input
        type="text"
        className={Styles.searchBar__input}
        placeholder="Buscar por titulo y contenido."
        onChange={changeHandler}
        value={inputValue}
      ></input>
    </div>
  );
}
