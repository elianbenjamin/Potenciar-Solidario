/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LeftBar from "../../components/LeftBar/LeftBar";
import style from "./Foro.module.css";
import { NavLink } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { FluentMdl2QandA } from "../../assets/noQuestionIcon";
import { useSelector } from "react-redux";

function ForumView({ questions, loading }) {
  let [getQuestion, setGetQuestion] = useState([]);

  const [responsiveMode, setResponsiveMode] = useState(window.innerWidth < 993);

  const orderBy = useSelector((state) => state.questions.questionsOrderings);

  let orderedQuestions = [...getQuestion];

  function compareStrings(str1, str2) {
    const regex = /^[a-zA-Z]/; // Expresión regular para coincidir con letras del abecedario
  
    // Función para encontrar el primer carácter que sea una letra del abecedario
    function encontrarPrimeraLetra(str) {
      for (let i = 0; i < str.length; i++) {
        if (regex.test(str[i])) {
          return i; // Devolver el índice del primer carácter que sea una letra
        }
      }
      return -1; // Si no se encuentra ninguna letra, devolver -1
    }
  
    const indexStr1 = encontrarPrimeraLetra(str1);
    const indexStr2 = encontrarPrimeraLetra(str2);
  
    if (indexStr1 === -1 && indexStr2 === -1) {
      return str1 < str2; // Si ninguno tiene letras, se comparan los strings normalmente
    } else if (indexStr1 === -1) {
      return false; // Si solo str2 tiene letras, str1 va después
    } else if (indexStr2 === -1) {
      return true; // Si solo str1 tiene letras, str1 va antes
    } else {
      // Si ambos tienen letras, se compara el substring a partir de la primera letra encontrada
      return str1.slice(indexStr1) < str2.slice(indexStr2);
    }
  }

  if (orderBy.ordering === "date") {
    if (orderBy.direction === "asc") {
      orderedQuestions.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
      );
    } else {
      orderedQuestions.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
      );
    }
  }
  if (orderBy.ordering === "title") {
    if (orderBy.direction === "asc") {
      orderedQuestions.sort((a, b) =>
        compareStrings(a.title, b.title) ? -1 : 1
      );
    } else {
      orderedQuestions.sort((a, b) =>
        compareStrings(a.title, b.title) ? 1 : -1
      );
    }
  }

  useEffect(() => {
    if (questions) {
      setGetQuestion(questions);
    }
  }, [questions]);

  useEffect(() => {
    function handleResize(e) {
      const responsiveMode = window.innerWidth < 993;
      if (responsiveMode) {
        setResponsiveMode(true);
      } else setResponsiveMode(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={style.containerCenter}>
        <LeftBar responsiveMode={responsiveMode} />
        {loading ? (
          <Oval
            height={80}
            width={80}
            color="#005692"
            wrapperStyle={{ margin: "auto auto" }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#a4d4ff"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        ) : getQuestion.length === 0 ? (
          <div className={style.centerLoading}>
            <h1 className={style.titleCenter}>Foro general</h1>
            <FluentMdl2QandA className={style.loading} />
            <h3>No hay preguntas</h3>
          </div>
        ) : (
          <div className={style.container}>
            <h1 className={style.titleCenter}>Foro general</h1>
            <div className={style.div}>
              {orderedQuestions?.map((question) => {
                let date = new Date(question.createdAt);
                return (
                  <div key={question.id} className={style.contain}>
                      <NavLink to={`/foro/${question.id}`}>
                        <h1>{question.title}</h1>
                      </NavLink>
                      <p>{question.text}</p>

                    <footer className={style.anwers}>
                      {question.Answers.length === 0 && (
                        <p>
                          <strong>{question.Answers.length}</strong> respuestas
                        </p>
                      )}
                      {question.Answers.length === 1 && (
                        <p>
                          <strong>{question.Answers.length}</strong> respuesta
                        </p>
                      )}
                      {question.Answers.length > 1 && (
                        <p>
                          <strong>{question.Answers.length}</strong> respuestas
                        </p>
                      )}
                      <p>@{question.User.name}</p>
                      <p>
                        {date.toLocaleString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </p>
                    </footer>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumView;
