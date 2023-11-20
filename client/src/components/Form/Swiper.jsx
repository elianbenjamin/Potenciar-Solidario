import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const Swiper = ({frase, color, tipo}) => {
    Swal.fire({
        position: 'center', // La posicion para mostrarse
        icon: `${tipo}`, //El tipo de icono
        title:`${frase}`,//La frase/texto
        showConfirmButton: false,
        timer: 3000, //Tiempo en que se ocultará
        color : `${color}`, //Color del texto
        iconColor : `${color}` //color de icono
      
      })
  return (
    <div>
      
    </div>
  )
}

export default Swiper