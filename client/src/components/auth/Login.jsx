import { useForm } from 'react-hook-form'
import './auth.css';
import { GoogleLogin } from '@react-oauth/google'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, } from 'react-router-dom';
import { loginUser, loginWithGoogleAction } from '../../Redux/auth/AuthActions';
import { useEffect, useState } from 'react';
import Swiper from '../Form/Swiper';

const Login = () => {
    const linkStyle = { color: '#127af3' }
    const { isAuthenticated, deleteSuccess } = useSelector(state => state.auth);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorLogin, setErrorLogin] = useState('');
    const [errorLoginWithGoogle, setErrorLoginWithGoogle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (isAuthenticated || token) {
            navigate('/')
        }

    }, [isAuthenticated]);

    //Login
    const login = user => {
        //datos del formulario
        //Hacer el dispatch de la acción para iniciar sesión
        dispatch(loginUser(user.email, user.password))
            .then(() => {
                navigate('/');
                setErrorLogin('');
            })
            .catch((error) => {
                setErrorLogin(error.response.data.message);

            })
        setErrorLogin('')
        // Limpiar el formulario
        reset();
    }

    //Login con Google
    const loginWithGoogle = async token => {
        dispatch(loginWithGoogleAction(token)) //Hacer el dispatch de la acción para iniciar sesión con google
            .then((data) => {
                if (data === undefined || data === null === !data) {
                    setErrorLoginWithGoogle('No cuenta aun no esta registrada');
                    return;
                }
                //Si se logea con exito, redirigirlo al home
                navigate('/');
                setErrorLoginWithGoogle(false);
            })
            .catch((error) => {
                // guarda el error, que se mostrará 
                setErrorLoginWithGoogle(error.response.data.message);
            })

    }

    return (
        <div className='auth__container' >
            {deleteSuccess && <Swiper frase='Tu cuenta ha sido eliminada, Hasta pronto' tipo='success' color='#005692' />}
            <form action="" method='post' onSubmit={handleSubmit(login)} className='auth__form' autoCorrect='off'>
                {/* campo para el email */}
                <h1 className='auth__title'>Iniciar Sesión</h1>
                {/* Se ejecutaran errores en caso de que la validacion falle*/}
                {errorLogin && <p className='auth__error'>{errorLogin}</p>}
                {errorLoginWithGoogle && <p className='auth__error'>{errorLoginWithGoogle}</p>}
                <div>
                    <label className='auth__label' htmlFor="email">correo</label>
                    {errors.email && <p className='auth__error'>Debe ser un correo valido</p>}
                    <input className='auth__input'
                        type="email"
                        // usar la propiddad ...register, para hacer un registro y guardar el valor
                        {...register('email', {
                            required: true, minLength: 3, maxLength: 40, pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Debes escribir un correo válido"
                            }
                        })}
                        id='email' placeholder='Escribe tu correo'
                    />
                </div>
                {/* Campo para la contraseñá */}
                <div>
                    <label className='auth__label' htmlFor="password">Escribe tu contraseña</label>
                    {errors.password && <p className='auth__error'>Tu contraseña debe ser minímo de 6 caracterés</p>}
                    <input className='auth__input'
                        // usar la propiddad ...register, para hacer un registro y guardar el valor
                        type="password" {...register('password', { required: true, minLength: 6, maxLength: 50 })}
                        id='password' placeholder='Escribe tu password' />
                </div>

                <button className='auth__btn' type='submit'>Iniciar Sesión</button>
                <div className='auth__links'>
                    <div>
                        <p>¿No tienes Cuenta? <NavLink to="/register" style={linkStyle}>Crear Cuenta</NavLink></p>
                        <p>¿Olvidaste tu contraseña ? <NavLink to='/reset-password' style={linkStyle} >Resetear contraseña</NavLink></p>
                    </div>

                    <div className='auth__google'>
                        <GoogleLogin //Usar el componente de google
                            onSuccess={async credentialResponse => { //La funciion onSucces recibe la propiedad 
                                loginWithGoogle(credentialResponse) // credentialResponse  que contiene el token
                            }}

                            onError={(error) => {
                                console.log(error);
                            }}
                            useOneTap
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login