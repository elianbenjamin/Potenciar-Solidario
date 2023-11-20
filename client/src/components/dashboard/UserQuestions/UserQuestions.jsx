import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../Redux/actions/questionsActions';
import UserQuetionCard from './UserQuetionCard';
import Styles from './userQuestion.module.css'

const UserQuestions = () => {
  const dispatch = useDispatch()
  const { questions } = useSelector(state => state.questions);
  const [refreshData, setRefreshData] = useState(false)

  //states para la busqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  //Funcion para hacer la busqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.length > 0);
  };

  // Filtrar el array basado en el término de búsqueda si isSearching es true
  const filteredResults = isSearching
    ? questions.filter((item) =>
      // Reemplaza 'item.name' con la propiedad o valor que deseas buscar
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : questions;


  //UseEffect, para hacer el dispatch
  useEffect(() => {

    dispatch(getQuestions())

  }, [refreshData])



  return (
    <div className={Styles.question__container}>
      <div className={Styles.divInput}>
        <input
          className={Styles.inputSearch}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder='buscar por nombre de pregunta'
        />
      </div>

      <div className={Styles.question__grid}>
        {/* mapear los datos filtrados */}
        {filteredResults.length > 0 ? (
          filteredResults.map(question => (
            <UserQuetionCard
              key={question.id}
              question={question}
              setRefreshData={setRefreshData} />
          ))
        ) : (
          // Se mostrará en caso de que no hay resultados con la busqueda
          isSearching &&
          <div className={Styles.div_NoResults}>
            <p className={Styles.title_NoResults}>
              No hay resultados para esta busqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserQuestions