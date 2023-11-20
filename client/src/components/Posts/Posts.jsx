import Styles from "./posts.module.css";
//
import Post from "../Post/Post";
//
import { useSelector } from "react-redux";
//
import NoPostsIcon from "../../assets/NoPostsIcon";
import OvalLoader from "../../assets/OvalLoader";

export default function Posts() {
  //estado global que determina si el loader debe aparecer o no
  const loading = useSelector((state) => state.posts.loading);

  //se filtran los posteos para dejar unicamente los que fueron aprobados por el admin
  const posts = useSelector((state) => state.posts.posts).filter(
    (post) => post.status === true
  );

  const orderBy = useSelector((state) => state.posts.orderBy);

  //funcion que cambia la fecha de "yyyy-mm-dd" a "dd-mm-yyyy"
  function transformarFecha(fechaString) {
    // Crear un objeto Date a partir de la cadena original
    const fecha = new Date(fechaString);

    // Sumar un día a la fecha --> porque si no a la hora de renderizar los posts y enviarle la prop a cada uno, la fecha aparece con un dia menos, por motivos que desconocemos
    fecha.setDate(fecha.getDate() + 1);

    // Obtener los componentes de la fecha (día, mes y año)
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // El mes comienza desde 0
    const año = fecha.getFullYear();

    // Construir la nueva fecha en formato "dd-MM-yyyy"
    const nuevaFecha = `${dia}-${mes}-${año}`;

    return nuevaFecha;
  }

  //copia del array que se le aplican los ordenamientos para renderizar
  let orderedPosts = [...posts];

  //se aplican los ordenamientos correspondientes segun lo que indica el estado global de ordenamientos, con las condiciones determinadas
  if (orderBy.ordering === "creationDate") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.creationDate > b.creationDate
          ? -1
          : 1
        : a.creationDate > b.creationDate
        ? 1
        : -1
    );
  } else if (orderBy.ordering === "title") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  } else if (orderBy.ordering === "date") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.startDate < b.startDate
          ? -1
          : 1
        : a.startDate > b.startDate
        ? -1
        : 1
    );
  } else if (orderBy.ordering === "popularity") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc" ? b.likes - a.likes : a.likes - b.likes
    );
  }

  /////////////////////////////////////

  return (
    <div className={Styles.Posts}>
      <h1 style={{ marginTop: "10px", textAlign: "center" }}>
        Publicaciones de la cartelera
      </h1>

      {(posts?.length === 0 && !loading) || (!posts && !loading) ? (
        <div className={Styles.Posts__NoPosts}>
          <NoPostsIcon className={Styles.NoPosts__icon} />
          <h3 className={Styles.NoPosts__Text}>
            No se encontraron publicaciones.
          </h3>
        </div>
      ) : (
        <div className={Styles.Cards}>
          {!loading && orderedPosts.length > 0 ? (
            orderedPosts.map((post) => {
              return (
                <Post
                  key={post.id}
                  id={post?.id}
                  title={post?.title}
                  organization={post?.organization}
                  category={post?.category}
                  description={post?.description}
                  image={post?.image}
                  startDate={transformarFecha(post?.startDate)}
                  userID={post?.userID}
                  likes={post?.likes}
                  Likes={post?.Likes}
                  PublicationComments={post?.PublicationComments}
                />
              );
            })
          ) : (
            <OvalLoader />
          )}
        </div>
      )}
    </div>
  );
}
