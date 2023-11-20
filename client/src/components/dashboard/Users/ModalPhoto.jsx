
import proptypes from 'prop-types'
import Styles from './users.module.css';
import  {} from 'antd'


const ModalPhoto = ({image}) => {
    
  return (
    <div className={Styles.modal__container}>
        <div className={Styles.modal__div}>
            {image && <img src={image} alt="imagen" className={Styles.modal__img}/> }
        </div>
        <button>X</button>
    </div>
  )
}

ModalPhoto.propTypes = {
    image: proptypes.string.isRequired
}
export default ModalPhoto