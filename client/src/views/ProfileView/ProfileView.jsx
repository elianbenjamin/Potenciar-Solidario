import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import DataProfile from '../../components/Profile/DataProfile';
import PhotoAndInfo from '../../components/Profile/PhotoAndInfo';
import './Profile.css'

const ProfileView = () => {
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Estados para, mostrar exito
    const [success, setSuccess] = useState(false)
    //Obtener el token
    const token = localStorage.getItem('token');
    useEffect(() => {

        if (!token || !isAuthenticated) {
            navigate('/login')

        }
        else {
            const decoded = jwtDecode(token);
            dispatch(getProfile(decoded.id, token)).then(() => {
            })
                .catch(error => {
                    console.log(error.response.data, 'hubo un error')
                })

        }
    }, [isAuthenticated, token])



    if (!userProfile) return null; // retornar null si no existen los datos del usuario

    return (
        <>

            <div className='profile__container'>
                <PhotoAndInfo userProfile={userProfile}
                    success={success}
                    setSuccess={setSuccess} />
                <DataProfile userProfile={userProfile}
                    success={success}
                    setSuccess={setSuccess} />
            </div>
        </>
    )
}

export default ProfileView