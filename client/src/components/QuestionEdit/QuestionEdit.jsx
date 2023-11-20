import { useEffect, useState } from 'react';
import style from './QuestionEdit.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { getQuestionDetail, updateQuestion } from '../../Redux/actions/questionsActions';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import validationQuestion from '../QuestionCreate/QuestionValidate';

function QuestionEdit (){
    const categories = useSelector(state => state.ongsAndCategories.forumCategories)
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate(   )
    const categoryOptions = [{ label: "Selecciona una categoría", value: false }, ...categories.map(cat => ({ label: cat.name, value: cat.id }))];
    const questionDetail = useSelector(state => state.questions?.questionDetail)
    const {title, text, categoryId, userId} = questionDetail;
    const [errores, setErrores] = useState({
        title: '',
        text: '',
        categoryId: ''
    })
   const  [question, setQuetions] = useState({
        userId,
        title,
        text, 
        categoryId

    })
    useEffect(() => {
        dispatch(getQuestionDetail(id))
    },[])
    const handleCategoryChange = (value) => {
        setQuetions({
            ...question,
            categoryId: value
        })
        setErrores(validationQuestion({
            ...question,
            categoryId: value
        }))
    }
    const handleChange = (event) =>{
    
        setQuetions({
            ...question,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        swal({
            title: "¿Estás seguro que deseas actualizar la pregunta?",
            text: "Una vez aceptado no puede revertir los cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
        dispatch(updateQuestion(id, question)).then(() => {
                swal("Tu pregunta ha sido modificada con exito!", {
                  icon: "success",
                })
                navigate('/foro')
              }).catch(()=>{
               swal("A ocurrido un error, por favor intente de nuevo o intente llamar a alguien de soporte",
               {
                icon: 'error',
               }) 
              })
              
            } 
          });
    }
        return(
        <div className={style.contain}>
            <form action="" className={style.form} onChange={handleChange}>
                <div className={style.div}>
                    <label htmlFor="title">Asunto <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.title && <p>{errores.title}</p>}
                    </div>
                    {
                        errores.title ?
                            <input type="text" name="title" value={question.title} placeholder="Asunto" style={{ boxShadow: errores.title ? '0 0 0 1px red': '', border:errores.title? 'red 1px solid' : ''}} />
                            :
                            <input type="text" name="title"  value={question.title} placeholder="Asunto" style={{ boxShadow: !errores.title ? '0 0 0 1px rgb(73, 255, 73)' : '', border: !errores.title ? '1px rgb(73, 255, 73) solid' : '' }} />
                    }
                </div>
                <div className={style.div}>
                    <label>Categoria <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.categoryId && <p>{errores.categoryId}</p>}
                    </div>
                    <Select
                        options={categoryOptions}
                        className={style.select}
                        isSearchable={true}
                        value={question.categoryId}
                        onChange={handleCategoryChange}
                        name="categories"
                        
                    />
                </div>
                <div className={style.div}>
                    <label htmlFor="text">Descripcion <strong style={{color: 'red'}}>*</strong></label>
                    <div className={style.errores}>
                        {errores.text && <p>{errores.text}</p>}
                    </div>
                    {
                        errores.text ?
                            <textarea type="text" cols="30" rows="8" name="text" value={question.text} placeholder="Descripcion" style={{ boxShadow: errores.text? '0 0 0 1px red' : '', border: errores.text ? 'red 1px solid' : '' }} /> :
                            <textarea type="text" cols="30" rows="8" name="text" value={question.text} placeholder="Descripcion" style={{ boxShadow:  !errores.text? '0 0 0 1px rgb(73, 255, 73)': '', border: !errores.text ? '1px rgb(73, 255, 73) solid' : ''}}/>
                    }
                </div>
            
                    
                    
                    <button type="submit" className={style.button} onClick={handleSubmit}>Enviar pregunta</button>
                     
                
            </form>
        </div>
    )
}
export default QuestionEdit;