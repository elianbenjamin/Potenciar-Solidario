import Styles from "./forumOrderings.module.css";
//
import Select from "react-select";
//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import { setQuestionsOrderings, setSelectedOrderingOption } from '../../../Redux/actions/questionsActions/';


export default function () {

  const dispatch = useDispatch();

  //objeto del estado global que almacena los oredenamientos de las preguntas y su copia local
  const questionsOrderings = useSelector((state) => state.questions.questionsOrderings);
  const [orderByLOCAL, setOrderByLOCAL] = useState({
    value: "title",
    direction: "asc",
  });

  //estado global para almacenar la opcion seleccionada del selector, que lo recibe mediante el atributo value
  const selectedOrderingOption = useSelector(state => state.questions.selectedOrderingOption);
  const [selectedOptionLOCAL, setSelectedOptionLOCAL] = useState({...selectedOrderingOption});

  //opciones del selector
  const options = [
    {
      label: "Fecha de creación",
      name: "ordering",
      value: "date",
    },
    {
      label: "Titulo",
      name: "ordering",
      value: "title",
    },
  ];

  const changeHandler = (e) => {
    //si viene e.target significa que viene del input radio, y si no, del react-select
    const { name, value, label } = e.target ? e.target : e;
    dispatch(
      setQuestionsOrderings({
        ...orderByLOCAL,
        [name]: value,
      })
    );
    if (!e.target) dispatch(setSelectedOrderingOption({label, name, value}));
  };

  useEffect(() => {
    setOrderByLOCAL(questionsOrderings);
  }, [questionsOrderings]);
  useEffect(() => {
    setSelectedOptionLOCAL(selectedOrderingOption)
  }, [selectedOrderingOption])

  ///////////////////////////

  return (
    <div className={Styles.Orderings}>
      <h3 className={Styles.title}>Ordenar por:</h3>

      <Select
        className={Styles.Orderings__select}
        options={options}
        defaultValue={options[0]}
        menuPlacement="top"
        onChange={changeHandler}
        value={selectedOptionLOCAL}
      />

      <div className={Styles.Orderings__radioInputs}>
        <div className={Styles.RadioInputs__Option}>
          <label className={Styles.label}>Ascendente</label>
          <input
            className={Styles.input}
            type="radio"
            name="direction"
            value="asc"
            checked={orderByLOCAL.direction === "asc"}
            onChange={changeHandler}
          />
        </div>
        <div className={Styles.RadioInputs__Option}>
          <label className={Styles.label}>Descendente</label>
          <input
            className={Styles.input}
            type="radio"
            name="direction"
            value="desc"
            checked={orderByLOCAL.direction === "desc"}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
}
