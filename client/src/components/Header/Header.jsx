import Styles from "./header.module.css";
import { useLocation, Link } from "react-router-dom";

export default function Header({ isScrolled }) {
  const { pathname } = useLocation();

  
  return (
    <div className={Styles["HeaderMain"]}>
      <div
        className={Styles["header"]}
        id={isScrolled ? Styles.headerScrolled : ""}
      >
        <a className={Styles["title"]}>
          Portal <strong>Potenciar Solidario</strong>
        </a>

        {pathname === "/formulario" ? (
          <Link to="/" className={Styles.backButton}>
            VOLVER A LA CARTELERA
          </Link>
        ) : pathname.includes("/detalle") ? (
          <Link to="/" className={Styles.backButton}>
            VOLVER A LA CARTELERA
          </Link>
        ) : pathname === "/foro" ? (
          <Link className={Styles.backButton}>VOLVER AL INICIO</Link>
        ) : pathname === "foro/crear" ? (
          <Link to="/foro" className={Styles.backButton}>
            VOLVER AL FORO
          </Link>
        ) : pathname.includes("/foro") &&
          pathname !== "/foro" &&
          pathname &&
          "/foro/crear" ? (
          <Link to="/foro" className={Styles.backButton}>
            VOLVER AL FORO
          </Link>
        ) : pathname === "/profile" ||
          pathname === "/profile/posts" ||
          pathname === "/new-password" ||
          pathname === "/admin" ? (
          <Link to="/" className={Styles.backButton}>
            VOLVER A LA CARTELERA
          </Link>
        ) : pathname === "/" ? (
          <Link className={Styles.backButton}>VOLVER AL INICIO</Link>
        ) : (
          <Link to="/" className={Styles.backButton}>
            VOLVER A LA CARTELERA
          </Link>
        )}
       
      </div>
    </div>
  );
}
