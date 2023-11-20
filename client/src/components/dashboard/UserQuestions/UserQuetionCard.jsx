import { useState, useRef, useEffect } from 'react';
import Styles from './userQuestion.module.css' // Reemplaza con la ubicación real de tus estilos
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteQuestion } from '../../../Redux/actions/questionsActions';
import proptypes from 'prop-types'

const UserQuetionCard = ({ question, setRefreshData }) => {
  const [modalAsks, setModalAsks] = useState(false);
  const modalRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const fecha = new Date(question.createdAt);
  const fechaFormateada = fecha.toLocaleDateString();

  // Manejo del clic fuera del modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalAsks(false);
      }
    };
    // Añadir el listener para el clic
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);


  // Función para abrir el modal
  const showModal = () => {
    setIsModalOpen(!isModalOpen);

  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpen(!isModalOpen);

  };

  const handleDeleteQuestionById = (id) => {
    // hacer el dispatch de la acción para eliminar el usuario de la base de datos
    setRefreshData(true)
    dispatch(deleteQuestion(id))
      .then(() => {
        setIsModalOpen(!isModalOpen)
        setRefreshData(false)
      })
      .catch(() => {
        setIsModalOpen(!isModalOpen)
        setRefreshData(false)

      })
  }

  return (
    <div className={Styles.question__card}>
      <h2 className={Styles.question__title}>{question.title}</h2>
      <div className={Styles.question__text}>
        <p>{question.text}</p>
        <div className={Styles.question__name__flex}>
          <p className={Styles.question__user_name}>{question.User?.name}</p>
        </div>
      </div>
      <div className={Styles.question__options}>
        <p className={Styles.question__date}>{fechaFormateada}</p>
        <div>
          <button
            className={Styles.question__btn__delete}
            onClick={showModal}>
            <i className={`fa fa-trash ${Styles.question__trash_icon}`} aria-hidden="true"></i>
            <Modal
              title="Deseas eliminar esta pregunta? Ya no podrás recuperarla"
              open={isModalOpen}
              onCancel={handleClose}
              cancelText='Cancelar'
              okText='Sí, Eliminar'
              onOk={() => handleDeleteQuestionById(question.id)}

              cancelButtonProps={{
                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
              }}
              okButtonProps={{ danger: true }}
            />
          </button>
        </div>
        <button onClick={() => setModalAsks(!modalAsks)} className={Styles.question__button}>
          Ver respuestas

        </button>
        {/* Mostrar el modal */}
        {modalAsks && (
          <div ref={modalRef} className={Styles.question__asks}>
            {question.Answers && question.Answers.length === 0 && <p className={Styles.answer__no}>Aún no hay respuestas</p>}
            {question.Answers && question.Answers.length > 0 && <p className={Styles.answer__no}>{question.Answers.length} respuestas</p>}
            {question.Answers &&
              question.Answers.map((answer) => (
                <div key={answer.id} className={Styles.answer__card}>
                  <div className={Styles.answer__text}>
                    <p >{answer.answer}</p>
                  </div>

                  <p className={Styles.answer__user}>Respondio: <span>{answer.User?.name}</span></p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};




UserQuetionCard.propTypes = {
  question: proptypes.object.isRequired,
  setRefreshData: proptypes.func.isRequired
}
export default UserQuetionCard