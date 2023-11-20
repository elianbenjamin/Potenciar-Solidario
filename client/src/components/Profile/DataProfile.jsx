import proptypes from 'prop-types'
import FormProfile from './FormProfile'


const DataProfile = ({ userProfile,success, setSuccess }) => {
  //Por props se recibe, los datos de usuario, success que sirve para verificar si todo salio con exito

  return (
    <div>
      <div  className='profile__h1'>
          <h1>Información personal</h1>
      </div>
    
      <div className='profile__data'>
        <p className='profile__h3'>Nombre: <span className='profile__span'>{userProfile?.name}</span></p>

        <p className='profile__h3'>Apellido: <span className='profile__span'>{userProfile?.lastname}</span></p>

        <p className='profile__h3'>Correo Electronico: <span className='profile__span'>{userProfile?.email}</span></p>

        <p className='profile__h3'>Fecha de nacimiento: <span className='profile__span'>{userProfile?.birth_date}</span></p>
    
        <p className='profile__h3'>Número de telefono: <span className='profile__span'>{userProfile?.phone}</span></p>
  
        <p className='profile__h3'>Lugar de residencia: <span className='profile__span'>{userProfile?.habitual_location_of_residence}</span></p>
    
        <p className='profile__h3'>Aréa de localización: <span className='profile__span'>{userProfile?.geographical_area_residence}</span></p>

        <p className='profile__h3'>Número del DNI: <span className='profile__span'>{userProfile?.DNI}</span></p>
        <p className='profile__h3'>Organización: <span className='profile__span'>{userProfile?.organization}</span></p>
 
      </div>
      <div>
        <FormProfile userProfile={userProfile}
          success={success}
          setSuccess={setSuccess} />
      </div>
    </div>
  )
}



DataProfile.propTypes = { 
  userProfile: proptypes.object.isRequired,
  success: proptypes.bool.isRequired,
  setSuccess: proptypes.func.isRequired
}
export default DataProfile