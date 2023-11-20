
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import UserPostCard from '../../components/UserPosts/UserPostCard';
import Styles from './userPosts.module.css'


const UserPostsView = () => {
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Estados para refrescar, y ver los cambios de inmediato
    const [refreshData, setRefreshData] = useState(false)
    //obtener el token
    const token = localStorage.getItem('token');
    //Escucha cuando hay cambios en el token o la autenticacion
    useEffect(() => {

        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
        } else {
            const decodedToken = jwtDecode(token); // Decodificar el token y obtener el id del usuario
            //Hacer el dispatch, para obtener el usuario
            dispatch(getProfile(decodedToken.id, token))
                .then(() => {

                }).catch((error) => {
                    return error
                })
        }
    }, [dispatch, isAuthenticated, refreshData])


    return (
        <div className={Styles.user__pulblications__container}>
            {/* si el usuario no tiene posts ? se mostrará un texto */}
            {!userProfile?.Publications?.length ? <h1 className={Styles.user__title}>Aún no tienes publicaciones</h1> : <h1 className={Styles.user__title}>Mis Publicaciones</h1>}
            <div className={Styles.user__pulblications__grid}>
                {userProfile?.Publications && userProfile.Publications?.map(post => {
                    return (
                        <UserPostCard
                            refreshData={refreshData}
                            setRefreshData={setRefreshData}
                            key={post.id} post={post} />
                    )
                })}
            </div>
            <div>

            </div>
            <div className={Styles.user__publication__btn}>
                {/* Boton para crear una publicion */}
                <button

                    className={Styles.user__button_add}
                    onClick={() => navigate('/formulario')}>+</button>
            </div>
        </div>
    )
}

export default UserPostsView