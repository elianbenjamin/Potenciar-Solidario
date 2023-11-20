import axios from 'axios';
import { useState } from 'react';
import { useForm, } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Styles from './reset.module.css';

const Email = () => {
    //usar el hook de 'react-hook-form', para validar formularios 
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    //estados, en caso de que el email exista o no exista
    const [successEmail, setSuccessEmail] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    //el hook de useNavigate, para navegar a otras rutas
    const navigate = useNavigate();

    //funcion, para validar si email existe, por medio de una peticion put
    const handleSendEmail = async (email) => {
        try {
            const { data } = await axios.put('http://localhost:19789/forgotpassword', {email}) // se envia el email
           
            setErrorEmail(false); //cambiar los estados
            setSuccessEmail(true);//cambiar los estados
            setTimeout(() => {
                setSuccessEmail(false);
                navigate('/login');
            }, [9000]);	
            return data
        }
        catch (error) {
            console.log(error)
            setSuccessEmail(false);//cambiar los estados
            setErrorEmail(true);//cambiar los estados
        }


    };

    //funcion que recibe el email, al hacer submit 
    const onsubmit = handleSubmit((email) => {       
        handleSendEmail(email.email); //llamar la funcion

    });

    return (
        <div>

            {successEmail ? // En caso de que el email si exista se mostrará, un mensaje

                <div className={Styles.email__container}>
                    <h3>Se ha enviado un correo a tu bandeja de entrada</h3>
                    <button className={Styles.email__button__ok}
                        onClick={() => {
                            //rederigir al login, si todo sale bien
                            setSuccessEmail(false)
                            navigate('/login')
                        }}>OK</button>
                </div>
                : <div className={Styles.email__container}>
                    <form method='post' onSubmit={onsubmit} >
                        {/* en caso de que el email no exista se mostrará un mensaje */}
                        {errorEmail && <p className={Styles.email__error}>Tu correo aún no esta registrada</p>}
                        <div style={{ width: '400px' }}>
                            <label className={Styles.email__label} htmlFor="email">Escribe tu correo</label>
                            {/* tipos de errores al hacer submit */}
                            {errors?.email?.type === 'required' && <p style={{ color: '#ff0000' }}>Este campo es requerido</p>}
                            {errors?.email?.type === 'pattern' && <p style={{ color: '#ff0000' }}>Debes escribir un correo válido</p>}
                            <input
                                className={Styles.email__input}
                                type='email'
                                placeholder='Ej. pedro@lopez.com'
                                id='email'
                                // usar la propiddad ...register, para hacer un registro y guardar el valor
                                {...register('email', {
                                    required: true, pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                        message: 'Debes escribir un correo válido'

                                    }
                                })}
                            />
                        </div>
                        {/* boton al hacer submit */}
                        <button className={Styles.email__button} type='submit'>Enviar</button>
                    </form>
                </div>}
        </div>
    )
}

export default Email