import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardDashboard from '../CardDashboard'
import SearchDashBoard from '../SearchDashBoard';
import Styles from '../dashboard.module.css'
import { getPosts } from '../../../../Redux/actions/postsActions';
import axios from 'axios';
import { configureHeaders } from '../../../../Redux/auth/configureHeaders ';
import { Modal } from 'antd';

const PendingPosts = () => {

    const { posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    //Estados para hacer busquedas
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    //orden por fecha
    const [sortOrder, setSortOrder] = useState('asc');
    const [refreshData, setRefreshData] = useState(false);
    const [errorNoSeleted, setErrorNoSeleted] = useState(false);

    //guardar los posts seleccionados para publicar
    const [selectedPosts, setSelectedPosts] = useState([]);

    //Estados para mostrar el modal
    const [isModalOpenPublish, setIsModalOpenPublish] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    //filtrar los posts que no estan publicados

    //filtrar los posts pendientes
    const postsPending = posts.filter((post) => { return post.status !== true; });

    // Filtrar el array basado en el término de búsqueda si isSearching es true
    const filteredAndSortedResults = useMemo(() => {
        let results = isSearching
            ? postsPending.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : postsPending;

        // Ordenamiento basado en sortOrder
        if (sortOrder === 'asc') {
            results.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
        } else if (sortOrder === 'desc') {
            results.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }

        return results;
    }, [postsPending, isSearching, searchTerm, sortOrder]);

    //UseEffect para traer los posts
    useEffect(() => {

        dispatch(getPosts());


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
        if (selectedPosts.length === postsPending.length) {
            setSelectedPosts([]);
        } else {
            setSelectedPosts(postsPending);
        }
    }

    //Areas de modales para publicar 
    const showModal = () => {
        setIsModalOpenPublish(true);

    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsModalOpenPublish(false);
    };
    // Función para abrir el modal

    //funcion pata publicar los posts seleccionados
    const handlePulishPosts = async () => {
        if (selectedPosts.length === 0) {
            setErrorNoSeleted(true);
            return;
        }
        setErrorNoSeleted(false);
        setRefreshData(true);

        try {
            const config = configureHeaders(); //configurar los headers
            const updatePromises = selectedPosts.map(post =>
                axios.put(`http://localhost:19789/posts/${post.id}`,//actualizar el post
                    { ...post, status: true }, //cambiar el estado del post
                    config)
            );

            const results = await Promise.all(updatePromises); //esperar a que todas las peticiones se completen
            // Después de que todas las peticiones se han completado
            setSelectedPosts([]);
            setIsModalOpenPublish(false)
            setRefreshData(false);
            return results
        } catch (error) {
            return (error.response);
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
        }
        catch (error) {
            console.log(error.response)
        }
    };

    const onChangeFilterDate = (e) => {
        // Actualiza el estado 'sortOrder' con el valor seleccionado
        setSortOrder(e.target.value);
    };


    return (
        <div className={Styles.dashboard}>
            {/* Si no hay posts de mostrará un mensaje */}
            {postsPending.length === 0 && <p className={Styles.dashboard__post}>No hay publicaciones pendientes</p>}
            {postsPending.length > 0 && (
                <div>
                    <p className={Styles.dashboard__post}>Hay {postsPending.length} publicaciones pendientes</p>
                    <div className={Styles.button__flexDiv}>
                        <button className={Styles.button__selected} onClick={handleSelectAllPost}>  {selectedPosts.length === postsPending.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}</button>
                        {/* Aplicar algunos estilos al select */}
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
                postsPending={postsPending}
                setIsSearching={setIsSearching}
            />
            {errorNoSeleted && <p className={Styles.dashboard__error}>No se seleccionó ninguna publicación</p>}


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
                    ) : (
                        // Si no hay resultados se mostrará este componente
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
                        >Publicar</button>
                        <button className={Styles.dashboard__btn2}
                            onClick={showModalDelete}
                        >Eliminar</button>
                    </div>
                )}
                <div>
                    {/* modal de confirmacion */}
                    <Modal
                        title={`Deseas publicar estos ${selectedPosts.length} posts?`}
                        open={isModalOpenPublish}
                        onCancel={handleClose}
                        cancelText="Cancelar"
                        okText="Sí,Publicar"
                        onOk={handlePulishPosts}
                        cancelButtonProps={{
                            style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                        }}

                    />
                    {/* modal de confirmacion */}
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
    )
}


export default PendingPosts