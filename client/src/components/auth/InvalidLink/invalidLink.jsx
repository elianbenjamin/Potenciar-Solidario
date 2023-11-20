import Styles from './invalidLink.module.css'
import { useNavigate } from 'react-router-dom';
import OvalLoader from '../../../assets/OvalLoader';

const InvalidLink = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/login');
    }, [3000]);

    return (
        <>
        <div className={Styles.container}>
            <h1 className={Styles.title}>El link es inválido o ha expirado.</h1>
            <p className={Styles.redirect}>Redireccionando al inicio...</p>
        </div>
        <OvalLoader />
        </>
    )
}

export default InvalidLink;