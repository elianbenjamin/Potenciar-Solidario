import { useState, useEffect, useMemo } from "react";
import { getPosts } from "../../../../Redux/actions/postsActions"
import { useSelector, useDispatch } from "react-redux";
import CardDashboard from "../CardDashboard";
import Styles from './published.module.css'
import axios from 'axios';
import { configureHeaders } from '../../../../Redux/auth/configureHeaders ';
import { Modal } from 'antd';
import SearchDashBoard from "../SearchDashBoard";

const PublishPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  //Estados para hacer busquedas
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  //guardar los posts seleccionados para publicar
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  //Estados para mostrar el modal
  const [isModalOpenLeftPublish, setIsModalOpenLeftPublish] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  //orden por fecha
  const [sortOrder, setSortOrder] = useState('asc');

  //filtrar los posts aprobados
  const postsApproved = posts.filter(post => post.status === '1' || post.status === true);

  // Filtrar el array basado en el término de búsqueda si isSearching es true
  const filteredAndSortedResults = useMemo(() => {
    let results = isSearching
      ? postsApproved.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : postsApproved;

    // Ordenamiento basado en sortOrder
    if (sortOrder === 'asc') {
      results.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    } else if (sortOrder === 'desc') {
      results.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    }

    return results;
  }, [postsApproved, isSearching, searchTerm, sortOrder]);
  const onChangeFilterDate = (e) => {
    // Actualiza el estado 'sortOrder' con el valor seleccionado
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(getPosts())
  }, [refreshData])

  //Funcion para escuchar el cambio de checkbox
  const handleCheckboxChange = (item) => {
    if (selectedPosts.includes(item)) {
      setSelectedPosts(selectedPosts.filter(i => i !== item));
    } else {
      setSelectedPosts([...selectedPosts, item]);
    }
  }
  //Funcion selecionar los posts
  const handleSelectAllPost = () => {
    if (selectedPosts.length === postsApproved.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(postsApproved);
    }
  }
  // Función para abrir el modal
  //Areas de modales para publicar 
  const showModal = () => {
    setIsModalOpenLeftPublish(true);

  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpenLeftPublish(false);
  };
  //publicar los posts seleccionados
  const handlePulishPosts = async () => {
    if (selectedPosts.length === 0) {

      return;
    }
    try {
      setRefreshData(true);
      const config = configureHeaders(); //configurar los headers

      const updatePromises = selectedPosts.map(post =>
        axios.put(`http://localhost:19789/posts/${post.id}`,//actualizar el post
          { ...post, status: false }, //cambiar el estado del post
          config)
      );

      const results = await Promise.all(updatePromises); //esperar a que todas las peticiones se completen
      setIsModalOpenLeftPublish(false)
      // Después de que todas las peticiones se han completado
      setSelectedPosts([]);
      setRefreshData(false);
    } catch (error) {
      console.log(error.response);
      // Manejar el error (por ejemplo, si alguna de las peticiones falla)
    }
  };

  //Areas de modales para eliminar
  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  }
  const handleCloseDelete = () => {
    setIsModalOpenDelete(false);
  };

  //Funcion para borrar multiples posts
  const handleDeletePosts = async () => {
    try {

      const config = configureHeaders(); //configurar los headers
      const deletePromises = selectedPosts.map(post =>
        axios.delete(`http://localhost:19789/posts/${post.id}`, config)
      );
      const results = await Promise.all(deletePromises); //esperar a que todas las peticiones se completen
      // Después de que todas las peticiones se han completado
      setIsModalOpenDelete(false)
      setSelectedPosts([]);
      setRefreshData(false);
      return results
    }
    catch (error) {
      return (error.response)
    }
  }
  return (
    <>
      <div className={Styles.dashboard}>
        {/* Si no hay posts de mostrará un mensaje */}
        {postsApproved.length === 0 && <p className={Styles.dashboard__post}>No hay publicaciones </p>}
        {postsApproved.length > 0 && (
          <div>
            <p className={Styles.dashboard__post}>Hay {postsApproved.length} publicaciones</p>
            <div className={Styles.button__flexDiv}>
              <button className={Styles.button__selected} onClick={handleSelectAllPost}>  {selectedPosts.length === postsApproved.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}</button>
              <select style={{
                border: 'solid 1px #ddd',
                borderRadius: '5px'
              }} name="date" id="date" onChange={onChangeFilterDate}>

                <option value="">Ordenar por fecha</option>
                <option value="asc">Más Antiguo</option>
                <option value="desc">Más Nuevo</option>
              </select>
            </div>
          </div>
        )}

        {/* Componente para la busqueda */}
        <SearchDashBoard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          postsPending={postsApproved}
          setIsSearching={setIsSearching}
        />

        <div className={Styles.dashboard__div}>

          <div className={Styles.dashboard__divCards}>
            {/* mapear los posts filtrados */}
            {filteredAndSortedResults.length > 0 ? (
              filteredAndSortedResults.map(post => (
                <CardDashboard
                  key={post.id}
                  post={post}
                  setRefreshData={setRefreshData}
                  onCheckboxChange={handleCheckboxChange}
                  isCheked={selectedPosts.includes(post)} />
              ))
            ) : ( // Si no hay resultados se mostrará este componente
              isSearching &&
              <div className={Styles.div_NoResults}>
                <p className={Styles.title_NoResults}>No hay resultados</p>
              </div>
            )}
          </div>
          {/* Si hay un elemento seleccionado en el checkbox, entonces se mostrará dos botones */}
          {selectedPosts.length > 0 && (
            <div className={Styles.dashboard__buttons}>
              <button className={Styles.dashboard__btn}
                onClick={showModal}
              >Dejar, de publicar</button>
              <button className={Styles.dashboard__btn2}
                onClick={showModalDelete}
              >Eliminar</button>
            </div>
          )}
          <div>
            {/* Modal de confirmacion para publicar un post*/}
            <Modal
              title={`Deseas dejar de publicar ${selectedPosts.length} posts`}
              open={isModalOpenLeftPublish}
              onCancel={handleClose}
              cancelText="Cancelar"
              okText="Sí, Dejar dePublicar"
              onOk={handlePulishPosts}
              cancelButtonProps={{
                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
              }}

            />
            {/* Modal de confirmacion para elminar un post */}
            <Modal
          
              title={`Deseas eliminar ${selectedPosts.length} posts?`}
              open={isModalOpenDelete}
              onCancel={handleCloseDelete}
              cancelText="Cancelar"
              okText="Sí,Eliminar"
              onOk={handleDeletePosts}
              cancelButtonProps={{
                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
              }}
              okButtonProps={{ danger: true }}
            />
          </div>

        </div>

      </div>
    </>

  )
}

export default PublishPosts