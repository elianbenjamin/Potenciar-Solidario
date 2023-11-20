
import { useSelector, } from 'react-redux'
import Styles from './userComment.module.css'
import UserComentCard from './UserComentCard'
import { useEffect, useState } from 'react';
const UserComent = () => {

  const { posts } = useSelector((state) => state.posts);
  //orden por fecha
  const [filterPosts, setFilterPosts] = useState([]);

  useEffect(() => {
    setFilterPosts(posts);
  }, [posts]);

  //Funcion para filtrar los comentrios por fehca
  const onChangeFilterDate = e => {
    const value = e.target.value;
    let sortedPosts = [...posts];
    //Verifica el valor de select, para luego filtrarlos
    if (value === 'asc') {
      sortedPosts.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    } else if (value === 'desc') {
      sortedPosts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }
    //Llena con los datos filtrados
    setFilterPosts(sortedPosts);
  }

  return (
    <div className={Styles.container}>
      {/* Aplicar unos estilos para el select */}
      <select style={{
        border: 'solid 1px #ddd',
        borderRadius: '5px',
        padding: '0.5rem'
      }} name="date" id="date" onChange={onChangeFilterDate}>

        <option value="">Ordenar por fecha</option>
        <option value="asc">Más Antiguo</option>
        <option value="desc">Más Nuevo</option>
      </select>
      <div className={Styles.divGrid}>
        {/* Mapear los datos filtrados */}
        {filterPosts.length > 0 ? filterPosts.map(post => {
          // Solo se renderizará, si al menos el array de publicaciones tiene un comentario
          if (post?.PublicationComments?.length) {
            return <UserComentCard key={post.id} post={post} />;
          }
          return null;
        }) : <div>No hay posts para mostrar</div>} {/* Mensaje si no hay posts */}
      </div>
    </div>
  )
}

export default UserComent