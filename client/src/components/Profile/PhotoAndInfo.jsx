import { useState } from 'react'
import proptypes from 'prop-types'
import { deleteProfile, deleteSuccess, delteSuccessClean } from '../../Redux/auth/AuthActions';
import { Modal, Button, Avatar, } from 'antd';
import { useDispatch, } from 'react-redux'
import { UserOutlined, } from '@ant-design/icons';
import { updateProfile } from '../../Redux/auth/AuthActions';
import { uploadImageCloudinary } from '../Form/cloudinary';


const PhotoAndInfo = ({ userProfile, }) => {
    //Estdos para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    // Mensaje de confirmación para eliminar la cuenta
    const confirmacion = 'Deseas Eliminar tu cuenta? Ya no podras recuperarla y se borraran todas tus publicaciones';

    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsModalOpen(false);
    };

    // Función para eliminar la cuenta
    const handleDeleteAccount = () => {
        dispatch(deleteProfile(userProfile.id)) //recibe el id del usuario
            .then(() => {
                //Hacer un distpatch, despues de elimanar la cuenta
                dispatch(deleteSuccess())
                setTimeout(() => {
                    //Limpiar el estato despues de 3 segundos
                    dispatch(delteSuccessClean())
                }, [3000])
            })
            .catch(error => {
                //Limpiar el estado en caso, de que hubo en error al eliminar la cuenta
                dispatch(delteSuccessClean())
                return (error.response.data)


            })
    }

    // Actualizar la foto de perfil
    const handleUpdatePhotoProfile = async (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'photo_users'); //data recibe 2 argumentos, 
        //la primera es nombre el 'upload_preset', por defecto ya esta definido 
        //la segunda es el nombre de la carpeta que esta alojada en cloudinary
        const imgUrl = await uploadImageCloudinary(data);
        userProfile.profile_picture = imgUrl;
        //Hacerl el dispatch, para actualizar la foto del usuario
        dispatch(updateProfile(userProfile.id, { ...userProfile, profile_picture: imgUrl }))
            .then(() => {

            })
            .catch(error => {
                return (error.response.data)
            })

    };

    return (
        <div className='profile__container--info'>


            <div>
                <div className='profile__avatar'>
                    {/* Si el usuario tiene un foto ? se mostrará, se lo contrario se mostrará un avatar */}
                    {userProfile.profile_picture ?
                        <div className='profile__picture--div'>
                            <Avatar
                                size={87}
                                defaultValue={userProfile.profile_picture}
                                src={userProfile.profile_picture}
                                alt="image-profile"
                                style={{ objectFit: 'contain' }} />
                        </div> :
                        <Avatar
                            size={87}
                            icon={<UserOutlined />} />}

                    <div className="profile__upload--wrapper">
                        <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={handleUpdatePhotoProfile} />
                        <label htmlFor="file-upload" className="profile__upload--label "><span>&#9998;</span></label>
                    </div>
                </div>

                <div className='profile__info'>
                    <h2>Sobre mí</h2>
                    <div className='profile__description'>
                        <p>{userProfile.description}</p>
                    </div>
                </div>
            </div>

            <div>
                {/* Modal para confirmacion */}
                <Modal
                    title={`${confirmacion}`}
                    open={isModalOpen}
                    onCancel={handleClose}
                    cancelText='Cancelar'
                    cancelButtonProps={{
                        style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                    }}
                    okText='Sí, Eliminar'
                    onOk={handleDeleteAccount}
                    okButtonProps={{ danger: true }} />
                <Button danger title='Eliminar cuenta'
                    style={{ marginLeft: '1rem' }}
                    onClick={showModal}>
                    Eliminar cuenta
                </Button>
            </div>
        </div>
    )
}

PhotoAndInfo.propTypes = {
    userProfile: proptypes.object.isRequired,

}
export default PhotoAndInfo