import { useNavigate, useParams } from "react-router-dom";
import QuestionView from "../../views/QuestionView/QuestionView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestionDetail } from "../../Redux/actions/questionsActions";
import { io } from "socket.io-client";
import swal from "sweetalert";
import { deleteAnswer } from "../../Redux/actions/answersActions";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  //selector del estado de  questionDetail
  const questionDetail = useSelector(
    (state) => state.questions?.questionDetail
  );
  //selector del estado de answers, popup usando SweetAlert (https://sweetalert.js.org/guides/)
  const answers = useSelector((state) => state.answers?.answers);
  const navigate = useNavigate();
  const socket = io();
  //funcion para eliminar respuestas
  const deleteAnswers = (index) => {
    swal({
      title: "¿Desea eliminar esta respuesta?",
      text: "!Una vez eliminada no se puede revertir!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          //dispatch para eliminar la respuesta
          dispatch(deleteAnswer(index))
            .then(() => {
              //dispatch para actualizar la pregunta
              dispatch(getQuestionDetail(id))
              swal("Tu respuesta ha sido eliminada con exito!", {
                icon: "success",
              });

            }).catch(() => {
              swal(
                "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
                {
                  icon: "error",
                }
              );
            })
        }
      });
  }
  //funcion para eliminar preguntas
  const deleteQuestions = (handleClose) => {
    handleClose();
    swal({
      title: "¿Estás seguro quse sea eliminar está pregunta?",
      text: "Una vez eliminada por puede ser recuperada!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      //dispatch para eliminar la pregunta de acuerdo a su id
      if (willDelete) {
        dispatch(deleteQuestion(id))
          .then(() => {
            swal("Tu pregunta ha sido eliminada con éxito!", {
              icon: "success",
            });
            navigate("/foro");
          })
          .catch(() => {
            swal(
              "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
              {
                icon: "error",
              }
            );
          });
      }
    });
  };
  useEffect(() => {
    //funcion para escuchar el evento de la pregunta (socket.io)
    const listener = () => {
      dispatch(getQuestionDetail(id));
    };
    //dispatch para obtener la pregunta de acuerdo a su id
    dispatch(getQuestionDetail(id));

    //escuchar el evento de la pregunta (socket.io)
    socket?.on(`question_${id}`, listener);

    return () => {
      //funcion para eliminar el evento de la pregunta (socket.io)
      socket?.off(`question_${id}`, listener);
    };
  }, []);


  return <QuestionView question={questionDetail} answers={answers} deleteAnswers={deleteAnswers} deleteQuestions={deleteQuestions} />;
}

export default QuestionDetail;
