import { Link } from 'react-router-dom';
import proptypes from 'prop-types';

const FormView = ({ post, setPost }) => { //Recibe por props el post y la funcion setPost
    if (post === undefined) return null; // Si no hay datos retornar null
    //Funcion para quitar la imagen
    const handleDeleteImage = () => {
        // Eliminar la imagen
        setPost({
            ...post,
            image: '',
            imagePreview: null
        })
    }
    return (
        <div className='publication__container'>
            <h1 className='publication__title'>{post.title}</h1>
            {post.imagePreview  ? ( // Si hay imagen mostrarla
               <div>
                     <img src={`${post.imagePreview}`} className='publication__image' />
                     <button className='publication__btn--delete'
                        onClick={ handleDeleteImage}>Eliminar</button>
               </div>
            ) : (<div className='publication__image--div'>
                <p className='publication__image--none'>La imagen aparecerá aquí</p>
            </div>)}  {/* si no se selecciona una imagen, se agregará un mensaje*/}
            <p></p>
            <div className='publication__date'>
                <p >{post.startDate && 'Fecha de inicio: '}<span>{post.startDate}</span></p>
                <p >{post.endDate && 'Fecha de finalización: '}<span>{post.endDate}</span></p>
            </div>
            <p className='publication__category'> {post.category}</p>
            <p className='publication__description'>{post.description}</p>
            <p className='publication__contact'>{post.contact && 'Contacto: '}<span>{post.contact}</span></p>
            <p className='publication__p'>{post.organization && 'Nombre de la organización: '}<span>{post.organization}</span></p>
            <p className='publication__p'>{post.registrationLink && 'Enlace para la inscripción: '} <span  className='post__link'>{post.registrationLink}</span> </p>
            {/* Se mostrará si hay un url */}
            {post.url && (
                <div className='publication__btn'>
                    <Link to={`${post.url}`}>Más infomación</Link>
                </div>
            )}

        </div>
    )
}

FormView.propTypes = {
    post: proptypes.object.isRequired,
    setPost: proptypes.func.isRequired
}

export default FormView