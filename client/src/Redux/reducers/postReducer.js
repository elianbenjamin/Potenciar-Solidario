import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL,
  UPDATE_POST,
  GET_POSTS_BY_CATEGORIES,
  GET_POSTS_BY_ONGS,
  SEARCH_POSTS,
  GET_POSTS_FILTERED,
  SET_POSTS_FILTERS,
  SET_SEARCH_VALUE,
  LIKE,
  DISLIKE,
  CREATE_POST_REVIEW,
  DELETE_POST_REVIEW,
  UPDATE_POST_REVIEW,
  SET_LOADING,
  HIDE_LOADING,
  SET_ORDERINGS,
  SET_SELECTED_OPTIONS,
} from "../action types/postsActionTypes.js";

const initialState = {
  posts: [],
  postsFilters: {
    category: "",
    ong: "",
    fromDate: "",
    untilDate: "",
    user: "",
  },
  selectedOptions: {
    category: { label: "Todas las categorias", name: "category", value: "" },
    ong: { label: "Todas las organizaciones", name: "ong", value: "" },
    user: { label: "Todos los usuarios", name: "user", value: "" },
    ordering: {
      label: "Fecha de subida",
      name: "ordering",
      value: "creationDate",
    },
  },
  orderBy: {
    ordering: "creationDate",
    direction: "asc",
  },

  searchValue: "",
  // allPosts: [],
  postDetail: [],
  // liked: [],
  reviews: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        allPosts: action.payload,
      };

    case GET_POST_DETAIL:
      return {
        ...state,
        postDetail: action.payload,
      };

    case CLEAR_POST_DETAIL:
      return {
        ...state,
        postDetail: [],
      };

    case UPDATE_POST:
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };

    case GET_POSTS_BY_CATEGORIES:
      return {
        ...state,
        postsByCategories: action.payload,
      };

    case GET_POSTS_BY_ONGS:
      return {
        ...state,
        postsByOngs: action.payload,
      };
    case SEARCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_POSTS_FILTERED:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_POSTS_FILTERS:
      return {
        ...state,
        postsFilters: action.payload,
      };

    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };

    case LIKE:
      return {
        ...state,
        posts: state?.posts?.map((post) => {
          if (post.id === action.payload.publicationId) {
            post.likes++;
            post?.Likes?.push(action.payload);
          }
          return post;
        }),
      };
    case DISLIKE:
      return {
        ...state,
        posts: state?.posts?.map((post) => {
          if (post.id === action.payload.publicationId) {
            const foundLike = post?.Likes?.some(
              (like) => like.userId === action.payload.userId
            );
            if (foundLike) {
              post.Likes = post?.Likes?.filter(
                (like) => like.userId !== action.payload.userId
              );
              post.likes--;
            }
          }

          return post;
        }),
      };

    case CREATE_POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case DELETE_POST_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };

    case UPDATE_POST_REVIEW:
      const updatedPostReview = action.payload;
      const updatedPostsReviews = state.reviews.map((review) =>
        review.id === updatedPostReview.id ? updatedPostReview : review
      );
      return {
        ...state,
        reviews: updatedPostsReviews,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SET_ORDERINGS:
      return {
        ...state,
        orderBy: action.payload,
      };

    case SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      };

    default:
      return { ...state };
  }
};

export default postReducer;
