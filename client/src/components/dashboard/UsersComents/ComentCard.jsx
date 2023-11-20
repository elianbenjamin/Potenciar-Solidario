import { useEffect, useState } from 'react'
import Styles from './userComment.module.css'
import axios from 'axios'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../../Redux/actions/postsActions'
import proptypes from 'prop-types'


const ComentCard = ({ comment, i }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [refreshData, setRefreshData] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());

    }, [refreshData])
    // Función para abrir el modal
    const showModal = () => {
        setIsOpenModal(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsOpenModal(false);
    };
    //Funcion para borrar el comentario, por id
    const handleDeleteCommentById = async id => {
        setRefreshData(true)
        const { data } = await axios.delete(`http://localhost:19789/comment/delete/${id}`);
        setRefreshData(false);
        setIsOpenModal(false)
        return data
    }

    const fecha = new Date(comment.createdAt);

    // Obtén la parte de la fecha en formato 'YYYY-MM-DD'
    const fechaFormateada = fecha.toISOString().split('T')[0];

    return (
        <div className={Styles.textCard}>
            <div style={{
                width: '100%'
            }}>
                <p className={Styles.textIndex}>{i}</p>
                <div className={Styles.comentFlex}>
                    <span className={Styles.textSpan}>{comment?.comment}</span>
                    <p style={{ color: '#005692' }}>{fechaFormateada}</p>
                    <button className={Styles.coment_btn_delete} onClick={showModal}>
                        <i className={`fa fa-trash ${Styles.coment_trash_icon}`} aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            {/* Modal para mostrar la confirmacion para elimanar */}
            <Modal

                title="Deseas eliminar este comentario?"
                open={isOpenModal}
                onCancel={handleClose}
                cancelText="Cancelar"
                okText="Sí,Eliminar"
                onOk={() => handleDeleteCommentById(comment.id)}
                cancelButtonProps={{
                    style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                }}
                okButtonProps={{ danger: true }}
            />
        </div>
    )
}

ComentCard.propTypes = {
    comment: proptypes.object.isRequired,
    i: proptypes.number
}

export default ComentCard