import Styles from "./leftBar.module.css";
//
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//
import PostFilters from "../Filters/PostsFilters/PostsFilters";
import ForumFilters from "../Filters/ForumFilters/ForumFilters";
import { Drawer, Button } from "antd";
import PostsOrderings from "../Orderings/PostsOrderings/PostsOrderings";
import FiltersAndOrderingsIcon from "../../assets/FiltersAndOrderingsIcon";
import ForumOrderings from "../Orderings/ForumOrderings/ForumOrderings";

export default function LeftBar({ responsiveMode }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filtersOrderingsSwitchPOSTS, setFiltersOrderingsSwitchPOSTS] =
    useState(true);
  
  const [filtersOrderingsSwitchQUESTIONS, setFiltersOrderingsSwitchQUESTIONS] =
    useState(true);

  //////////////////////////////////////////////////////

  return (
    <div className={Styles.LeftBar}>
      <div className={Styles.LeftBar__Buttons}>
        <Link
          to="/"
          className={Styles.button}
          id={pathname === "/" ? Styles.active : ""}
        >
          PUBLICACIÓNES Y AVISOS
        </Link>
        <Link
          to="/foro"
          className={Styles.button}
          id={pathname === "/foro" ? Styles.active : ""}
        >
          FORO
        </Link>
      </div>
      <div className={Styles.LeftBar__Buttons}>
        {pathname === "/foro" ? (
          <Link to="/foro/crear" className={Styles.button}>
            CREAR COMENTARIO O PREGUNTA
          </Link>
        ) : (
          <Link to="/formulario" className={Styles.button}>
            CREAR AVISO O PUBLICACIÓN
          </Link>
        )}
      </div>

      {!responsiveMode ? (
        <div className={Styles.Filters}>
          <div className={Styles.Filters__Buttons}>
            <div
              className={Styles.Buttons__button}
              id={
                pathname === "/"
                  ? filtersOrderingsSwitchPOSTS
                    ? Styles.active
                    : ""
                  : filtersOrderingsSwitchQUESTIONS
                  ? Styles.active
                  : ""
              }
              onClick={
                pathname === "/"
                  ? () => setFiltersOrderingsSwitchPOSTS(true)
                  : () => setFiltersOrderingsSwitchQUESTIONS(true)
              }
            >
              Filtros
            </div>
            <div
              className={Styles.Buttons__button}
              id={
                pathname === "/"
                  ? !filtersOrderingsSwitchPOSTS
                    ? Styles.active
                    : ""
                  : !filtersOrderingsSwitchQUESTIONS
                  ? Styles.active
                  : ""
              }
              onClick={
                pathname === "/"
                  ? () => setFiltersOrderingsSwitchPOSTS(false)
                  : () => setFiltersOrderingsSwitchQUESTIONS(false)
              }
            >
              Ordenamientos
            </div>
          </div>

          {pathname === "/" ? (
            filtersOrderingsSwitchPOSTS ? (
              <PostFilters />
            ) : (
              <PostsOrderings />
            )
          ) : filtersOrderingsSwitchQUESTIONS ? (
            <ForumFilters />
          ) : (
            <ForumOrderings />
          )}
        </div>
      ) : (
        <Button
          type="primary"
          onClick={() => setIsOpen(true)}
          className={Styles["Filters-Button"]}
        >
          <p className={Styles["Filters-Button__text"]}>
            Filtros y ordenamientos
          </p>
          <FiltersAndOrderingsIcon
            className={Styles["Filters-Button__Icon"]}
          />
        </Button>
      )}

      <Drawer
        title="Filtros y ordenamientos"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="left"
      >
        {pathname === "/" ? (
          <div>
            <PostFilters />
            <PostsOrderings />
          </div>
        ) : (
          <div>
            <ForumFilters />
            <ForumOrderings />
          </div>
        )}
      </Drawer>
    </div>
  );
}
