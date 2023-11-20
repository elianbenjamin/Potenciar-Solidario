import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import CalendarIcon from "../../assets/CalendarIcon";
import { Like, LikeActive, Comment } from "../../assets/SocialIcons/";
import { like, disLike } from "../../Redux/actions/postsActions";
import { configureHeaders } from "../../Redux/auth/configureHeaders ";
import { jwtDecode } from "jwt-decode";

//////////////////////////////

const Post = (props) => {
  const config = configureHeaders();

  //
  const dispatch = useDispatch();
  //si el post ya estaba likeado por el usuario a la hora de renderizar, isLiked se vuelve true
  const [isLiked, setIsLiked] = useState(false);
  //cantidad de likes
  const [likes, setLikes] = useState(props.likes);
  //fecha de inicio para renderizar
  const startDate = props?.startDate?.split("-");
  //token del usuario para saber si el post estaba likeado o no
  const token = jwtDecode(localStorage.getItem("token"));

  const likeHandler = (e) => {
    e.preventDefault();

    if (!isLiked) {
      setIsLiked(true);
      const newLikes = likes + 1;
      setLikes(newLikes);
      dispatch(like(props.id));
    } else {
      setIsLiked(false);
      const newLikes = likes - 1;
      setLikes(newLikes);
      dispatch(disLike(props.id));
    }
  };


  useEffect(() => {
    if (props?.Likes?.some((like) => like.userId === token.id)) {
      setIsLiked(true);
    }
  }, []);


  /////////////////////////////////////////////////

  return (
    <Link to={`/detalle/${props?.id}`} className={Styles.Post}>
      <h1 className={Styles.Post__title}>{props?.title}</h1>

      

      <div className={Styles.Post__OrganizationAndCategory}>
        <div className={Styles.OrganizationContainer}>
          <h2 className={Styles.organization}> Organización: </h2>
          <h2 className={Styles.organizationName}>{props?.organization}</h2>
        </div>
        <p className={Styles.Post__category}>{props?.category}</p>
        
      </div>

      <div className={Styles.Post__description}>
        {props?.image ? (
          <>
            <img className={Styles.imageBlur} src={props?.image} alt="imagen" />
            <img className={Styles.image} src={props?.image} alt="imagen" />
          </>
        ) : (
          <p>{props?.description}</p>
        )}
      </div>

      <div className={Styles.Post__BottomBar}>
        <CalendarIcon className={Styles.BottomBar__calendarIcon} />

        <p className={Styles.BottomBar__startDate}>{props?.startDate}</p>

        <div className={Styles.BottomBar__SocialIcons}>
          <div
            className={Styles.SocialIcons__likeContainer}
            onClick={likeHandler}
          >
            {isLiked ? (
              <LikeActive className={Styles.likeIcon} />
            ) : (
              <Like className={Styles.likeIcon} />
            )}

            <p className={Styles.likeNumber}>{likes}</p>
          </div>

          <div className={Styles.SocialIcons__commentContainer}>
            <Comment className={Styles.commentIcon} />

            <p className={Styles.likeNumber}> {props?.PublicationComments?.length} </p>
          </div>
        </div>

        
      </div>
    </Link>
  );
};

export default Post;
