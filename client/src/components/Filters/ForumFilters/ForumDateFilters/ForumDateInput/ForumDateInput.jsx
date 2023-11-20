import Styles from "./forumDateInput.module.css";
import "react-datepicker/dist/react-datepicker.css";
//
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import CleanDate_Icon from "../../../../../assets/CleanDateIcon";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
//
import { getQuestionsFiltered, setQuestionsFilters } from "../../../../../Redux/actions/questionsActions";


export default function ({ fromDate, untilDate, handleFromDate, handleUntilDate}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const filters = useSelector((state) => state.questions.questionsFilters);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    if (handleFromDate) handleFromDate(e);
    else handleUntilDate(e);

    setIsOpen(!isOpen);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (fromDate) {
      dispatch(getQuestionsFiltered({ ...filters, fromDate: "" }));
      dispatch(setQuestionsFilters({ ...filters, fromDate: "" }));
    }
    if (untilDate) {
      dispatch(getQuestionsFiltered({ ...filters, untilDate: "" }));
      dispatch(setQuestionsFilters({ ...filters, untilDate: "" }));
    }
  };

  return (
    <div className={Styles.DateInput}>
      <button
        className={Styles.DateInput__button}
        onClick={handleClick}
        id={isOpen && Styles.active}
      >
        {fromDate
          ? format(fromDate, "dd-MM-yyyy")
          : untilDate
          ? format(untilDate, "dd-MM-yyyy")
          : "Seleccione una fecha"}
      </button>

      <div className={Styles.DateInput__Icon}>
        <CleanDate_Icon className={Styles.icon} onClick={handleReset} />
      </div>

      <div className={Styles.DateInput__datePicker}>
        {isOpen && (
          <DatePicker
            selected={fromDate || untilDate}
            onChange={handleChange}
            inline
          />
        )}
      </div>
    </div>
  );
}
