import { useDispatch } from 'react-redux'
import proptypes from 'prop-types'
import Styles from './users.module.css';
import { Modal, Avatar } from 'antd'
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../../Redux/actions/usersActions';
import { UserOutlined, } from '@ant-design/icons';

import { updateProfile } from '../../../Redux/auth/AuthActions';


const UserCard = ({ user }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    //Modal para cofirmar y blocquer el usuario
    const [isModalBlockOpen, setIsModaBlockOpnen] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getUsers())

    }, [refreshData])

    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);

    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUserById = (id) => { 
        // hacer el dispatch de la acción para eliminar el usuario de la base de datos
        setRefreshData(true)
        dispatch(deleteUser(id))
            .then(() => {
                setIsModalOpen(false)
                setRefreshData(false)
            })
            .catch(() => {
                setIsModalOpen(false)
                setRefreshData(false)

            })
    };

    //Modales para bloquear usuario

    const showModalBlock = () => {
        setIsModaBlockOpnen(true)
    }

    const hanldeCloseModalBlock = () => {
        setIsModaBlockOpnen(false)
    }
    //Funcion para bloquear/desbloquear usuario por peticion put
    const handleUpdateUserBlock = id => {
        setRefreshData(true);
        dispatch(updateProfile(id, {...user, active : user.active ? false : true}))
            .then (() => {
                setRefreshData(false);
              
                setIsModaBlockOpnen(false)
            })
    }
    return (
        <>
            {/* Crear el tbody para la tabla de users */}
            <tbody className={Styles.users__body} >
                <tr className={Styles.users__tr}>
                    <td className={Styles.users__td} data-label='Foto'>{user.profile_picture ? <Avatar src={user.profile_picture} size={45} /> : <Avatar size={45} icon={<UserOutlined />} />}</td>
                    <td className={Styles.users__td} data-label='Nombre'>{user.name}</td>
                    <td className={Styles.users__td} data-label="Apellido">{user.lastname}</td>
                    <td className={Styles.users__td} data-label="Correo">{user.email}</td>
                    <td className={Styles.users__td} data-label="Nacimiento">{user.birth_date}</td>
                    <td className={Styles.users__td} data-label="País">{user.habitual_location_of_residence}</td>
                    <td className={Styles.users__td} data-label="Telefono">{user.phone}</td>
                    <td>
                        <button
                            onClick={showModal}
                            className={Styles.users__btn__delete}>
                            <i className={`fa fa-trash ${Styles.users__trash_icon}`} aria-hidden="true"></i>
                        </button>
                        <Modal
                            title={`Deseas eliminar a ${user.name}? Ya no podrás recuperarlo`}
                            open={isModalOpen}
                            onCancel={handleClose}
                            cancelText="Cancelar"
                            okText="Sí,Eliminar"
                            onOk={() => handleDeleteUserById(user.id)}
                            cancelButtonProps={{
                                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                            }}
                            okButtonProps={{ danger: true }}
                        />
                       
                    </td>
                    <td>
                        <button onClick={showModalBlock} className={Styles.user__btn_block}>
                            <img  className={Styles.users__icon__block} src={user.active ? "/images/desbloqueado.png" : "/images/bloquear.png"} alt="img-block" />
                        </button>
                        <Modal
                            title={user.active ? `Deseas bloquear a ${user.name}. Ya no podrá ingresar a la pagina` :`Deseas desbloquear a ${user.name}`}
                            open={isModalBlockOpen}
                            onCancel={hanldeCloseModalBlock}
                            onOk={() => handleUpdateUserBlock(user.id)}
                            cancelText='cancelar'
                            okText={user.active ? 'Sí, bloquear' : 'Sí, desbloquear'}
                            cancelButtonProps={{
                                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                            }}
                            okButtonProps={{ danger: true }}

                        />
                    </td>
                </tr>
            </tbody>

        </>
    )
}

UserCard.propTypes = {
    user: proptypes.object.isRequired
}
export default UserCard