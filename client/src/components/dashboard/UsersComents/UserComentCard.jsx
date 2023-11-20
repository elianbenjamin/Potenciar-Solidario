import proptypes from 'prop-types'
import ComentCard from './ComentCard'
import Styles from './userComment.module.css';

const UserComentCard = ({post}) => {
  
  return (
    <div className={Styles.cardComment}>

        <h2 className={Styles.titleComment}>{post.title}</h2>
        <h4 className={Styles.lenghtComment}>{post?.PublicationComments?.length} Comentarios para esta publicación</h4>
        <div>
          {/* Mapear todos los comentarios */}
            { post?.PublicationComments?.map((comment, i) => (
                <ComentCard key={comment.id} comment={comment} i={i + 1}/>
            ))
}
        </div>
    </div>
  )
}



UserComentCard.propTypes = {
    post :  proptypes.object.isRequired
}

export default UserComentCard