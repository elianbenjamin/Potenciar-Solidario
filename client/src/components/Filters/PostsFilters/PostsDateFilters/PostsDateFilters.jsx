import Styles from "./postsDateFilters.module.css";
//
import PostsDateInput from "./PostsDateInput/PostsDateInput";
import { parse } from "date-fns";

export default function Posts_DateFilters({
  handleFromDate,
  handleUntilDate,
  fromDate,
  untilDate,
}) {
  return (
    <div className={Styles.Filters__date}>
      <p> Desde: </p>
      <PostsDateInput
        handleFromDate={handleFromDate}
        fromDate={
          fromDate !== "" ? parse(fromDate, "yyyy-MM-dd", new Date()) : null
        }
      />

      <p>Hasta: </p>
      <PostsDateInput
        handleUntilDate={handleUntilDate}
        untilDate={
          untilDate !== "" ? parse(untilDate, "yyyy-MM-dd", new Date()) : null
        }
      />
    </div>
  );
}
