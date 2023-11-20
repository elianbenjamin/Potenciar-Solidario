import Styles from "./searchBar.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  searchPosts,
  getPostsFiltered,
  setSearchValue,
  setLoading,
  hideLoading,
} from "../../Redux/actions/postsActions";
//
import axios from "axios";
//
import { configureHeaders } from "../../Redux/auth/configureHeaders .js";

export default function SearchBar() {
  const dispatch = useDispatch();
  const config = configureHeaders();

  //estado global que indica los filtros aplicados, para recuperar las publicaciones filtradas en cada busqueda pudiendo aplicar la busqueda sobre los datos ya filtrados
  const filters = useSelector((state) => state.posts.postsFilters);
  //valor de lo que se ingresa en la searchBar
  const searchValue = useSelector(state => state.posts.searchValue);
  // valor en estado local de lo que se ingresa
  const [inputValue, setInputValue] = useState('');
  //estado true/false que indica si se debe renderizar o no el loader
  const loading = useSelector(state => state.posts.loading);

  function changeHandler({ target: { value } }) {
    setInputValue(value);
  }

  useEffect(() => {
    //antes de ejecutar la busqueda se preguta si todavia esta el loading activado 
    if (!loading) dispatch(setLoading());
    //se guarda en el estado global el estado local (valor introducido)
    dispatch(setSearchValue(inputValue));
    
    //si la entrada vino vacia, se recuperan todos los posteos sin ninguna busqueda, con los filtros previamente activados
    if (inputValue === "")
      dispatch(getPostsFiltered(filters)).then(dispatch(hideLoading()));
    // en caso contrario, se traen posteos con filtros activados(si no hay filtros devuelve todos los posteos), luego se aplica la busqueda sobre eso
    else {
      const { category, ong, fromDate, untilDate, user } = filters;
      let value = inputValue.trim().includes(' ') ? inputValue.trim().split(' ') : inputValue.trim();

      let debounceTimeout = undefined;
      axios.get(
        `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
        config
      ).then(({ data }) => {
        debounceTimeout = setTimeout(() => {
          dispatch(searchPosts(data, value)).then(() => {
            dispatch(hideLoading())
          })
        }, 400)
      })

      return () => {
        clearTimeout(debounceTimeout);
      }
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(searchValue);
  }, [])

  return (
    <div className={Styles.SearchBar}>
      <input
        type="text"
        className={Styles.searchBar__input}
        placeholder="Buscar por titulo, descripción y organización."
        onChange={changeHandler}
        value={inputValue}
      ></input>
    </div>
  );
}
