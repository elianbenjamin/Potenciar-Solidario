import Styles from "./forumFilters.module.css";
//
import Select from "react-select";
//
import { useSelector, useDispatch } from "react-redux";
import ForumDateFilters from "./ForumDateFilters/ForumDateFilters";
import { useEffect, useState } from "react";
//
import { setQuestionsFilters, getQuestionsFiltered, setSelectedFilterOptions, searchQuestions } from '../../../Redux/actions/questionsActions';
//
import { format } from 'date-fns';
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";
import axios from 'axios';


export default function ForumFilters() {
  const dispatch = useDispatch();
  const config = configureHeaders();
  //
  const forumCategories = useSelector(
    (state) => state.ongsAndCategories.forumCategories
  );
  const users = useSelector(state => state.users.users);
  //
  const searchValue = useSelector(state => state.questions.searchValue);
  const filters = useSelector((state) => state.questions.questionsFilters);
  const [filtersLOCAL, setFiltersLOCAL] = useState({
    category: 0,
    fromDate: "",
    untilDate: "",
    user: ""
  });

  const selectedFilterOptions = useSelector(state => state.questions.selectedFilterOptions);
  const [selectedFilterOptionsLOCAL, setSelectedFilterOptionsLOCAL] = useState({...selectedFilterOptions});  
  //
  const forumCategoriesOptions = forumCategories.map((category) => ({
    label: category.name,
    value: category.id,
    name: "category",
  }));
  forumCategoriesOptions.unshift({
    label: "Todas las categorias",
    value: 0,
    name: "category",
  });
  
  const userOptions = users.map(({ name, lastname, id }) => ({
    label: `${name} ${lastname}`,
    value: id,
    name: 'user',
  }))
  userOptions.unshift({
    label: "Todos los usuarios",
    value: "",
    name: 'user'
  })
  //
  
  const handleFilters = (e) => {
    const { name, value, label } = e;
    dispatch(setQuestionsFilters({...filters, [name]: value}))
    dispatch(setSelectedFilterOptions({...selectedFilterOptions, [name]: {name, label, value}}))
    setFiltersLOCAL({...filters, [name]: value})

    if (searchValue !== '') {
      const { category, fromDate, untilDate, user } = {...filters, [name]: value};
      axios.get(`http://localhost:19789/questionFilters?category=${category}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
      config)
      .then(({ data }) => dispatch(searchQuestions(data, searchValue)))
    }
    else {
      dispatch(getQuestionsFiltered({...filters, [name]: value}))
    }
  };
  const handleFromDate = (date) => {
    const fromDate = format(date, 'yyyy-MM-dd');
   
    dispatch(setQuestionsFilters({...filters, fromDate: fromDate}));
    dispatch(getQuestionsFiltered({...filters, fromDate: fromDate}));
    setFiltersLOCAL({...filters, fromDate: fromDate});
  };
  const handleUntilDate = (date) => {
    const untilDate = format(date, 'yyyy-MM-dd');
    dispatch(setQuestionsFilters({...filters, untilDate: untilDate}));
    dispatch(getQuestionsFiltered({...filters, untilDate: untilDate}));
    setFiltersLOCAL({...filters, untilDate: untilDate})
  };

  //
  useEffect(() => {
    setFiltersLOCAL(filters);
  }, [filters]);
  useEffect(() => {
    setSelectedFilterOptionsLOCAL(selectedFilterOptions);
  }, [selectedFilterOptions])

  return (
    <div className={Styles.LeftBar__Filters}>
      <h3> Filtros de busqueda: </h3>

      <Select
        className={Styles.select}
        options={forumCategoriesOptions}
        defaultValue={forumCategoriesOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
        value={selectedFilterOptionsLOCAL.category}
      />

      <Select 
        className={Styles.select}
        options={userOptions}
        defaultValue={userOptions[0]}
        isSearchable={true}
        menuPlacement="top"
        onChange={handleFilters}
        value={selectedFilterOptionsLOCAL.user}
      />

      <ForumDateFilters
        handleFromDate={handleFromDate}
        handleUntilDate={handleUntilDate}
        fromDate={filtersLOCAL.fromDate}
        untilDate={filtersLOCAL.untilDate}
      />
    </div>
  );
}
