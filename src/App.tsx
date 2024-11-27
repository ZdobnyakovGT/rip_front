import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import TopicPage from "pages/TopicPage";
import TopicsPage from "pages/TopicsPage";
import LoginPage from "pages/LoginPage";
import ShowsPage from "pages/ShowsPage";
import RegPage from "pages/RegPage";
import ProfilePage from "pages/ProfilePage";
import {Route, Routes, useLocation} from "react-router-dom";
import CartshowPage from "pages/CartshowPage";
import {T_Topic} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"
// import { useDispatch } from "react-redux";
// import { saveUser, logoutUser } from "src/core/store/slices/userSlice";
// import { api } from "src/api";
// import { getCookie } from "src/utils/utils.ts";


function App() {
  
  const [topics, setTopics] = useState<T_Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<T_Topic | null>(null)
  const [isMock, setIsMock] = useState(false);

  const location = useLocation();

  // Список маршрутов, где хедер скрыт
  const hideHeaderRoutes = ["/login", "/register"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

//   const dispatch = useDispatch();
//   const checkSession = async () => {
//     const sessionId = getCookie("session_id");
//     if (sessionId) {
//         try {
//             const response = await api.users.usersCheckSession(); // Создайте метод для проверки сессии
//             if (response.status === 200 && response.data.isAuth) {
//                 dispatch(saveUser({ login: response.data.login, accessToken: response.data.accessToken }));
//             } else {
//                 dispatch(logoutUser());
//             }
//         } catch (error) {
//             console.error("Session validation failed", error);
//             dispatch(logoutUser());
//         }
//     } else {
//         dispatch(logoutUser());
//     }
// };

 
    return (
        <div style={{minHeight: '100vh', backgroundColor: '#b6b197' }}>
            {/* <Header/> */}
            {!shouldHideHeader && <Header />}
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedTopic={selectedTopic} />
                </Row>

                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/topics/" element={<TopicsPage topics={topics} setTopics={setTopics} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/topics/:id" element={<TopicPage selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} isMock={isMock} setIsMock={setIsMock}/>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegPage />} />
                        <Route path="/shows/:showId" element={<CartshowPage />} />
                        <Route path="/user-shows" element={<ShowsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>

                </Row>
            </Container>
        </div>
    )
}

export default App

