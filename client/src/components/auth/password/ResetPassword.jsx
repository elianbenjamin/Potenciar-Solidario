import axios from 'axios';
import Styles from './reset.module.css'
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swiper from '../../Form/Swiper';
import Spinner from '../spinner/Spinner';
import InvalidLink from '../InvalidLink/invalidLink';



const ResetPassword = () => {
    //usar el hook de 'react-hook-form', para validar formularios
    
    const { register, handleSubmit, getValues, formState: { errors } } = useForm(); 
    // Estado para mostrar el mensaje de éxito
    const [successPasswordUpdate, setSuccessPasswordUpdate] = useState(false); 
    // Estado para mostrar el mensaje de error
    const [errorPasswordUpdate, setErrorPasswordUpdate] = useState(false); 
    const navigate = useNavigate();
     // Obtener los parámetros de la url
    let [searchParams] = useSearchParams();
    //obtener el token 
    const token = searchParams.get('token');
    //inicializar el token como null
    const [useToken,setUseToken] = useState(null)

    //Funcion que verifica si el token es valido
    const verifyToken = async () => {
        try{
            //obtener el resultado por medio de get
            const { data } = await axios.get('http://localhost:19789/validateotp', {
                headers: {
                    Authorization: `Bearer ${token}` //enviar el token por medio de los headers
                }
            })
            if(data){ 
                setUseToken(true)
                return }
        }
        catch(error){
            setUseToken(false)
            
        }
    }

    //usar un useEffcect para los cambios de token
    useEffect(() => {
        verifyToken()
    },[token])

    // Función para actualizar la contraseña
    const handleUpdatePassword = async newPassword => { 
        try{
            const { data } = await axios.put('http://localhost:19789/resetpassword', { newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            setSuccessPasswordUpdate(true);
            setErrorPasswordUpdate(false);
            setTimeout(() => {
                setSuccessPasswordUpdate(false);
                navigate('/login');
            }, [3000]);

            return data;
        }
        catch(error){
            console.log(error.response)
            setErrorPasswordUpdate(true);
            setTimeout(() => {
                setErrorPasswordUpdate(false);
            }, [3000])
        }
    }

    // Función para enviar el formulario
    const onSubmit = async data => {
      await  handleUpdatePassword(data.password);
    };

    return (

        useToken === null ? (
            <Spinner/>
            ) :(

        useToken ? (
            <div className={Styles.password__container}>
            {/* Se mostrará un swiper, cuando ocurran cualquier accion, la hacer submit */}
            {successPasswordUpdate && <Swiper frase='Tu Contraseña se actualizo correctamente, Ahora inicia sesión' tipo='success' color='#005692'/>}
            {errorPasswordUpdate && <Swiper frase='Hubo un error al actualizar tu contraseña, intenta nuevamente' tipo='error' color='#ff0000'/>}
            {/*formulario, para el campo de contraseñas  */}
            <form className={Styles.password__container} onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.password__field}>
                    <label className={Styles.password__label} htmlFor="password">Escribe tu nueva contraseña</label>
                    {/* tipos de errores al hacer submit */}
                    {errors.password && <p className={Styles.password__error}>{errors.password.message}</p>}
                    <input className={Styles.password__input}
                        type="password"
                        placeholder='Escribe tu nueva contraseña'
                        id='password'
                        // usar la propiddad ...register, para hacer un registro y guardar el valor
                        {...register('password', {
                            required: 'Este campo es requerido',
                            minLength: {
                                value: 6, //Mensaje, en caso de que hay error
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            },
                            maxLength: {
                                value: 50,//Mensaje, en caso de que hay error
                                message: 'La contraseña no puede tener más de 50 caracteres'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+$/, //regex para validar
                                message: 'Debes escribir una contraseña válida'//Mensaje, en caso de que hay error
                            }
                        })}
                    />
                   
                </div>
                <div  className={Styles.password__field}>
                    <label className={Styles.password__label} htmlFor="password2">Vuelve a escribir tu contraseña</label>
                    {errors.password2 && <p  className={Styles.password__error}>{errors.password2.message}</p>}
                    <input
                        className={Styles.password__input}
                        type="password"
                        placeholder='Confirma tu nueva contraseña'
                        id='password2'
                        // usar la propiddad ...register, para hacer un registro y guardar el valor
                        {...register('password2', {
                            required: 'Este campo es requerido',
                            validate: {
                                // esta propiedad tiene un funcion para validar que ambas contraseñas coincidan
                                matchesPreviousPassword: (value) => { // el value es la contraseña actual
                                    const { password } = getValues(); // por get Values destructrurar, pa propiedad password
                                    return password === value || 'Las contraseñas no coinciden'; //Luego validar ambas
                                }
                            }
                        })}
                    />
                    
                </div>

                <button className={Styles.password__button__ok} type='submit'>Restablecer contraseña</button>
            </form>
        </div>
        ) : (
            <InvalidLink/>
        ))
        
    );
};

export default ResetPassword;
