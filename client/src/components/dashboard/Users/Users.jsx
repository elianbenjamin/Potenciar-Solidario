import { useEffect, useState, } from 'react'
import Styles from './users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../Redux/actions/usersActions'
import UserCard from './userCard'


const Users = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users);
  //Inicializar los estados de busqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(getUsers())
  }, []);


  //Funcion para buscar que reciba del input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.length > 0);
  };

  // Filtrar el array basado en el término de búsqueda si isSearching es true
  const filteredResults = isSearching
    ? users.filter((item) =>
      // Reemplaza 'item.name' con la propiedad o valor que deseas buscar
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : users;


  return (
    <div className={Styles.users__container}>
      <div className={Styles.divInput}>
        <input
          className={Styles.inputSearch}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder='buscar por nombre o apellido'
        />
      </div>

      <div className={Styles.users__flex}>
        {/* Crear la tabla de usuarios*/}
        <table className={Styles.users__table}>
          <thead className={Styles.users__head}>
            <tr className={Styles.users__tr}>
              <th></th>
              <th className={Styles.users__td}>Nombre</th>
              <th className={Styles.users__td}>Apellido</th>
              <th className={Styles.users__td}>Correo</th>
              <th className={Styles.users__td}>Naciemineto</th>
              <th className={Styles.users__td}>País</th>
              <th className={Styles.users__td}>Telefono</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* Filtrar los datos encontrados */}
          {filteredResults.length > 0 ? (
            filteredResults.map(user => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            // Se mostrará en caso de que no hay resultados, en la busqueda
            isSearching &&
            <tbody className={Styles.div_NoResults}>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className={Styles.title_NoResults}>No hay resultados</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default Users