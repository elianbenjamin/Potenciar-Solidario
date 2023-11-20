import Styles from "./postFilters.module.css";
//
import Select from "react-select";
//
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//
import {
  getPostsFiltered,
  setPostsFilters,
  searchPosts,
  setLoading,
  hideLoading,
  setSelectedOptions
} from "../../../Redux/actions/postsActions";
//
import PostsDateFilters from "./PostsDateFilters/PostsDateFilters";
//
import { format } from "date-fns";
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";
import axios from "axios";



export default function PostFilters() {
  const dispatch = useDispatch();
  const config = configureHeaders();
  //
  const ongs = useSelector((state) => state.ongsAndCategories.ongs);
  const categories = useSelector((state) => state.ongsAndCategories.categories);
  const users = useSelector(state => state.users.users);
  //
  const searchValue = useSelector((state) => state.posts.searchValue);
  const selectedOptions = useSelector(state => state.posts.selectedOptions)
  const [selectedOptionsLOCAL, setSelectedOptionsLOCAL ] = useState({
    category: {label: "Todas las categorias", name: "category", value: ''},
    ong: {label: "Todas las organizaciones", name: "ong", value: ''},
    user: {label: "Todos los usuarios", name: 'user', value: ''}
  })
  

  //
  const categoryOptions = categories.map(({ name }) => ({
    label: name,
    value: name,
    name: "category",
  }));
  categoryOptions.unshift({
    label: "Todas las categorias",
    value: "",
    name: "category",
  });
  const ongOptions = Array.from(new Set(ongs.map((ong) => ong.nombre))).map(
    (nombre) => ({
      label: nombre,
      value: nombre,
      name: "ong",
    })
  );
  ongOptions.unshift({
    label: "Todas las organizaciones",
    value: "",
    name: "ong",
  });
  const usersOptions = users.map(({ name, lastname, id }) => ({
    label: `${name} ${lastname}`,
    value: id,
    name: 'user',

  }))
  usersOptions.unshift({
    label: "Todos los usuarios",
    value: "",
    name: 'user'
  })
  //
  const filters = useSelector((state) => state.posts.postsFilters);
  const [filtersLOCAL, setFiltersLOCAL] = useState({
    category: "",
    ong: "",
    fromDate: "",
    untilDate: "",
    user: ""
  });
  
  
  //manejador de filtros de categoria y ong
  const handleFilters = (e) => {
    const { label, name, value } = e;
    setSelectedOptionsLOCAL({
      ...selectedOptionsLOCAL,
      [name]: {label, name, value}
    })
    dispatch(setSelectedOptions({
      ...selectedOptionsLOCAL,
      [name]: {label, name, value}
    }))
    setFiltersLOCAL({ ...filters, [name]: value });
    dispatch(setLoading());
    dispatch(setPostsFilters({ ...filters, [name]: value }));
    if (searchValue !== "") {
      const { category, ong, fromDate, untilDate, user} = { ...filters, [name]: value };
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()))
    } else {
      dispatch(getPostsFiltered({ ...filters, [name]: value })).then(() => dispatch(hideLoading())); 
    }
  };
  const handleFromDate = (date) => {
    const fromDate = format(date, "yyyy-MM-dd");
    setFiltersLOCAL({ ...filters, fromDate: fromDate });
    dispatch(setPostsFilters({ ...filters, fromDate: fromDate }));
    dispatch(setLoading());

    if (searchValue !== "") {
      const { category, ong, untilDate, user } = { ...filters };
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()));
    } else {
      dispatch(getPostsFiltered({ ...filters, fromDate: fromDate })).then(() => dispatch(hideLoading()));
    }
  };
  const handleUntilDate = (date) => {
    const untilDate = format(date, "yyyy-MM-dd");
    setFiltersLOCAL({ ...filters, untilDate: untilDate });
    dispatch(setPostsFilters({ ...filters, untilDate: untilDate }));
    dispatch(setLoading());

    if (searchValue !== "") {
      const { category, ong, fromDate, user } = { ...filters };
      axios
        .get(
          `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
          config
        )
        .then(({ data }) => dispatch(searchPosts(data, searchValue))).then(() => dispatch(hideLoading()));
    } else {
      dispatch(getPostsFiltered({ ...filters, untilDate: untilDate })).then(() => dispatch(hideLoading()));
    }
  };
  //

  useEffect(() => {
    setFiltersLOCAL(filters);
    setSelectedOptionsLOCAL(selectedOptions)
  }, [filters, selectedOptions]);
 

  ///////////////////////////////////////////////////////////////

  return (
    <div className={Styles.LeftBar__Filters}>
      <h3>Filtros de búsqueda</h3>

      <Select
        className={Styles.select}
        options={categoryOptions}
        defaultValue={categoryOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
        value={selectedOptionsLOCAL.category}
      />
      <Select
        className={Styles.select}
        options={ongOptions}
        defaultValue={ongOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
        value={selectedOptionsLOCAL.ong}
      />
      <Select
        className={Styles.select}
        options={usersOptions}
        defaultValue={usersOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
        value={selectedOptionsLOCAL.user}
      />

      <PostsDateFilters
        handleFromDate={handleFromDate}
        handleUntilDate={handleUntilDate}
        fromDate={filtersLOCAL.fromDate}
        untilDate={filtersLOCAL.untilDate}
      />
    </div>
  );
}
