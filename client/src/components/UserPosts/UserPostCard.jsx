import { useState } from 'react'
import Styles from '../../views/UserPostsView/userPosts.module.css'
import propTypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'

const UserPostCard = ({ post, setRefreshData }) => {
  //Estados para el modal
  const [open, setOpen] = useState(false);
  //Obtener el token por localStoge
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  //Funcion para mostrar el modal
  const showModal = () => {
    setOpen(true);
  }
  ;
  //Funcion para eliminar el post del usuario, por su id
  const handleDeleteById = async () => {
    
    setRefreshData(true) //Para cambiar el estado antes de que haga la peticion
    const { data } = await axios.delete(`http://localhost:19789/posts/${post.id}`, {
      headers: {
        //Mandar el token por los headers
        'Authorization': `Bearer ${token}`
      }

    });
    //Despues de hacer la peticion, cambiar el estado, para que los cambios de reflejen al momento
    setRefreshData(false)
    return data

  }
  //funcion para eliminar el post
  const handleOk = async () => {

    await handleDeleteById();
    setOpen(false);

  }

  //Funcion para cerrar el modal
  const handleCancel = () => {

    setOpen(false);
  }

  //funcion para editar el post
  const handleIUpdatePost = (id) => {
    navigate(`/formulario/${id}`) // redirigir a la ruta de edición
  }
  return (
    <div className={Styles.user__publication__card}>
      {/* Modal de confirmacion */}
      <Modal
        title='Estas seguro de eliminar esta publicación?'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='Cancelar'
        okText='Sí,Eliminar'
        okButtonProps={{
          danger: true,
        }}
        cancelButtonProps={{

          style: {
            color: '#005692',
            borderColor: '#005692'
          }

        }}
      />
      <h2 className={Styles.user__publication__h2}>{post.title}</h2>
      <div className={Styles.user__image__div}>
        {/* Si el post no tiene una image, se mostrará una por defecto */}
        {post?.image ? (<img className={Styles.user__image} src={post.image} alt="imagen del post" />) : (
          <img src='/images/no-image.png' className={Styles.user__image} />
        )}
        <div className={Styles.user__publication__info}>

          <h2>{post.category}</h2>
          <p className={Styles.user__Description}>{post.description}</p>
          <p>{post.contact}</p>
          <p>{post.organization}</p>

          <NavLink className={Styles.user__btn__link} to={`/detalle/${post.id}`}>Más Información</NavLink>
        </div>

      </div>
        {/* Div de botones, para eliminar y actualizar */}
      <div className={Styles.user__btns_flex}>
        <button className={Styles.user__btn_edit} onClick={() => handleIUpdatePost(post.id)}>
          <img className={Styles.user_edit_icon} src='/images/icons8.png'/>
        </button>
        <button onClick={showModal} className={Styles.user__btn__delete}>
          {/* icono de borrar */}
        <i className={`fa fa-trash ${Styles.user__trash_icon}`} aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
};

UserPostCard.propTypes = {
  post: propTypes.object.isRequired,
  setRefreshData: propTypes.func.isRequired

}

export default UserPostCard