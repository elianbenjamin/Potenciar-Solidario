import React from "react";
import { Link } from "react-router-dom";
import Styles from "./blurredBackground.module.css";

export default function BlurredBackground() {
  return (
    <div className={Styles.blurredBackground}>
      <div className={Styles.content}>
        <h1 className={Styles.title}>Bienvenido a la Cartelera</h1>
        <p>Por favor, inicia sesión para acceder al contenido.</p>
        <Link to="/login">
        <button className={Styles.btn}>Iniciar Sesión</button>
      </Link>
      </div>
    </div>
  );
}
