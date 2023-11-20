import { Route, Routes, useLocation , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  setLoading,
  hideLoading,
} from "./Redux/actions/postsActions";
import {
  getCategories,
  getForumCategories,
} from "./Redux/actions/categoriesActions";
import { getUsers } from "./Redux/actions/usersActions";
import { getOngs } from "./Redux/actions/ongsActions";
import "./App.css";
import Forum from "./components/Forum/Forum";
import Header from "./components/Header/Header";
import Home from "./views/HomeView/Home";
import PageHeader from "./components/PageHeader/PageHeader";
import ContainerForm from "./views/FormContainer/ContainerForm";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchBarForum from "./components/SearchBar/SearchBarForum/SearchBarForum";
import PostDetailView from "./views/PostDetailView/PostDetailView";
import Admin from "./views/admin/Admin";
import ProfileView from "./views/ProfileView/ProfileView";
import DrawerProfile from "./components/Profile/DrawerProfile";
import QuestionCreateView from "./views/QuestionCreateView/QuestionCreateView";
// import QuestionView from "./views/QuestionView/QuestionView";
import QuestionDetail from "./components/QuestionsDetail/QuestionDetail";
import UserPostsView from "./views/UserPostsView/UserPostsView";
import BlurredBackground from "./components/BlurHome/BlurredBackground";
import Email from "./components/auth/password/Email";
import QuestionEdit from "./components/QuestionEdit/QuestionEdit";
import ResetPassword from "./components/auth/password/ResetPassword";
import Users from "./components/dashboard/Users/Users";
import UserQuestions from "./components/dashboard/UserQuestions/UserQuestions";
import UserComent from "./components/dashboard/UsersComents/UserComent";
import PublishPosts from "./components/dashboard/UsersPosts/PublishedPosts/PublishPosts";
import PendingPosts from "./components/dashboard/UsersPosts/PendingPosts/PendingPosts";
import { getQuestions } from "./Redux/actions/questionsActions";
import { getProfile } from "./Redux/auth/AuthActions";
import {jwtDecode} from 'jwt-decode'
import PageNotFund from "./404/PageNotFund";
import About from "./views/about/About";

function App() {
  const users = useSelector((state) => state.users);

  const {isAdmin, userProfile} = useSelector((state) => state.auth);


  const { pathname } = useLocation();
  const dispatch = useDispatch();
  //estado que determinada si el header debe achicarse debido al scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const root = document.querySelector("#root");

  function scrollHandler() {
    if (root.scrollTop >= 100 || root.scrollY >= 100) setIsScrolled(true);
    else setIsScrolled(false);
  }

  const token = localStorage.getItem("token");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    root.addEventListener("scroll", scrollHandler);
   
 
    //si el token cambia o existe se vuelven a cargar los datos
    if (token) {
        const decoded = jwtDecode(token);

      dispatch(setLoading());
      setAuthenticated(true);
      dispatch(getPosts()).then(() => dispatch(hideLoading()));
      dispatch(getQuestions()).then(() => dispatch(hideLoading()))
      dispatch(getOngs());
      dispatch(getCategories());
      dispatch(getProfile(decoded?.id, token))
      dispatch(getForumCategories());
      dispatch(getUsers());
    }

    return () => {
      root.removeEventListener("scroll", scrollHandler);
      setAuthenticated(false);
    };
  }, [token]);

  ///////////////////////////////////////

  return (
    <div className="App">
      <DrawerProfile />
      <Header isScrolled={isScrolled} />
      <PageHeader />
      {authenticated ? (
        <>
          {pathname === "/" ? <SearchBar/> : pathname === '/foro' ? <SearchBarForum /> : null}
          <Routes>
            {/* Rutas autenticadas */}
            <Route path="/" element={<Home />} />
            <Route path="/formulario/:id?" element={<ContainerForm />} />
            <Route path="/detalle/:id" element={<PostDetailView />} />
            <Route path="/foro" element={<Forum />} />
            <Route path="/foro/crear" element={<QuestionCreateView />} />
            <Route path="/foro/:id" element={<QuestionDetail />} />
            <Route path="/foro/edit/:id" element={<QuestionEdit />} />
            <Route path="/about" element={<About />} />
          
            {/* Otras rutas autenticadas */}
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/posts" element={<UserPostsView />} />
            <Route path="/new-password/" element={<ResetPassword />} />
            <Route path="/*" element={<PageNotFund/>}/>
            {/* Si es admin se mostrará estas rutas */}
            {userProfile.admin ||isAdmin ? (
                   <Route path='/admin' element={<Admin />}>
                      <Route index element={<PendingPosts />} />
                      <Route path="users" element={<Users />} />
                      <Route path="questions" element={<UserQuestions />} />
                      <Route path="coments" element={<UserComent />} />
                      <Route path="posts" element={<PublishPosts />} />
                  </Route>
            ) : () => {
              //De lo contrario no se mostrará nada
            }}
          </Routes>
        </>
      ) : (
        <>
          {pathname === "/login" ? <Login /> : null}
          {pathname === "/register" ? <Register /> : null}
          {pathname === "/reset-password" ? <Email /> : null}
          {pathname === "/new-password/" ? <ResetPassword /> : null}

          {pathname !== "/register" &&
          pathname !== "/login" &&
          pathname !== "/reset-password" &&
          pathname !== "/new-password/" &&
   
          !authenticated ? (
            <BlurredBackground />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
