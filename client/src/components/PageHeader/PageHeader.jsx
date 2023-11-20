import Styles from './pageHeader.module.css';
//
import CarteleraIcon from '../../assets/CarteleraIcon';


export default function PageHeader () {

    
    return (
        <div className={Styles['PageHeader']} ref={PageHeader}>
            <div className={Styles.PageHeader__Title}>
                <CarteleraIcon className={Styles.PageHeader__icon} />
                <p className={Styles.title}>CARTELERA</p>
            </div>

            <div className={Styles.PageHeader__Description}>
                <p>
                    Visualiza y publica anuncios esenciales para tu ONG, manteniendo a tu comunidad informada y participando en el foro para obtener respuestas y colaborar con otros miembros, fomentando la comunicación y la colaboración.
                </p>
            </div>
            
        </div>
    )

}