import Styles from "./forumDateFilters.module.css";
//
import ForumDateInput from "./ForumDateInput/ForumDateInput";
//
import { parse } from 'date-fns'


export default function Forum_DateFilters({
  fromDate,
  untilDate,
  handleFromDate,
  handleUntilDate,
}) {
  return (
    <div className={Styles.Filters__date}>
      <p>Desde:</p>
      <ForumDateInput
        fromDate={
          fromDate !== "" ? parse(fromDate, "yyyy-MM-dd", new Date()) : null
        }
        handleFromDate={handleFromDate}
      />

      <p>Hasta:</p>
      <ForumDateInput
        untilDate={
          untilDate !== "" ? parse(untilDate, "yyyy-MM-dd", new Date()) : null
        }
        handleUntilDate={handleUntilDate}
      />
    </div>
  );
}
