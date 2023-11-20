import { useState } from 'react'


const useFormPostValidate = (pulication ) => {
  const [error, setError] = useState({})
  const handleValidate = () => {
    if(pulication.title.split(' ').join('').length < 1){
      setError({title: 'El título es obligatorio'})
      
    }
    setError({title: ''})
    if(pulication.category.split(' ').join('').length < 1){
      setError({category: 'La categoría es obligatoria'})
      
    }
    setError({category: ''})
    if(pulication.description.split(' ').join('').length < 1){
      setError({description: 'La descripción es obligatoria'})
      
    }
    setError({description: ''})
    // if(pulication.startDate.split(' ').join('').length < 1){
    //   setError({startDate: 'La fecha de inicio es obligatoria'})
    //   return
    // }
    // setError({startDate: ''})
    // if(pulication.endDate.split(' ').join('').length < 1){
    //   setError({endDate: 'La fecha de fin es obligatoria'})
    //   return
    // }
    // setError({endDate: ''})
    if(pulication.contact.split(' ').join('').length < 1){
      setError({contact: 'El contacto es obligatorio'})
    
    }
    setError({contact: ''})

    if(pulication.organization.split(' ').join('').length < 1){
      setError({organization: 'La organización es obligatoria'})
   

    }
    setError({organization: ''})
    // if(pulication.linkInscription.split(' ').join('').length < 1){
    //   setError({linkInscription: 'El link de inscripción es obligatorio'})
    //   return

    // }
    

  }

  return  {
    handleValidate,
    error
  }
}

export default useFormPostValidate    