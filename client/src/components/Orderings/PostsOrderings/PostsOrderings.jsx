import Styles from "./postsOrderings.module.css";
//
import Select from "react-select";
//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import {
  setOrderings,
  setSelectedOptions,
} from "../../../Redux/actions/postsActions";

export default function Orderings() {
  const dispatch = useDispatch();

  //opciones para el react-select
  const options = [
    {
      label: "Fecha de inicio",
      name: "ordering",
      value: "date",
    },
    {
      label: "Titulo",
      name: "ordering",
      value: "title",
    },
    {
      label: "Fecha de subida",
      name: "ordering",
      value: "creationDate",
    },
    {
      label: "Popularidad",
      name: "ordering",
      value: "popularity",
    },
  ];

  //objeto que determina los ordenamientos seleccionados y su copia local
  const orderBy = useSelector((state) => state.posts.orderBy);
  const [orderByLOCAL, setOrderByLOCAL] = useState({ ...orderBy });

  //estado global para mantener guardada la opcion del react-select que recibe mediante el atributo 'value'
  const selectedOptions = useSelector((state) => state.posts.selectedOptions);
  const [selectedOptionLOCAL, setSelectedOptionLOCAL] = useState({
    ...selectedOptions.ordering,
  });

  const changeHandler = (e) => {
    //si viene e.target significa que viene de el input de tipo radio, y si no, del selector
    const { name, value, label } = e.target ? e.target : e;
    dispatch(
      setOrderings({
        ...orderByLOCAL,
        [name]: value,
      })
    );
    if (!e.target) {
      dispatch(
        setSelectedOptions({
          ...selectedOptions,
          [name]: { label, name, value },
        })
      );
    }
  };

  useEffect(() => {
    setOrderByLOCAL(orderBy);
  }, [orderBy]);

  useEffect(() => {
    setSelectedOptionLOCAL({ ...selectedOptions.ordering });
  }, [selectedOptions]);

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
