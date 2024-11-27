// import React from "react";
// import { Container, Row, Col, Button } from "reactstrap";
// import { useAppSelector, useAppDispatch } from "src/core/store/hooks";
// import { selectLogin, logoutUserAsync } from "src/core/store/slices/userSlice.ts";

// const ProfilePage: React.FC = () => {
//   const login = useAppSelector(selectLogin); // Получение логина текущего пользователя
//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     dispatch(logoutUserAsync()); // Выход из аккаунта
//   };

//   return (
//     <Container className="py-5">
//       <Row className="mb-4">
//         <Col>
//           <h1 className="text-center">Личный кабинет</h1>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col xs="12" sm="8" md="6">
//           <div
//             className="p-4 shadow"
//             style={{
//               backgroundColor: "#D0B175",
//               borderRadius: "10px",
//             }}
//           >
//             <h5 className="text-center mb-4">Добро пожаловать, {login}!</h5>
//             <ul className="list-unstyled">
//               <li>
//                 <strong>Логин:</strong> {login}
//               </li>
//               <li>
//                 <strong>Роль:</strong> Пользователь {/* Можете заменить или добавить больше данных */}
//               </li>
//               <li>
//                 <strong>Статус:</strong> Авторизован
//               </li>
//             </ul>
//             <div className="d-flex justify-content-center mt-4">
//               <Button color="danger" onClick={handleLogout}>
//                 Выйти
//               </Button>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProfilePage;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/core/store/store.ts";
import { updateUserData } from "src/core/store/slices/userSlice";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const ProfilePage: React.FC = () => {
//   const login = useAppSelector(selectLogin); // Получение логина текущего пользователя
//   const dispatch = useAppDispatch();
  
//   const handleLogout = () => {dispatch(logoutUserAsync()); // Выход из аккаунта
  const dispatch = useDispatch();
  const { login, isAuth } = useSelector((state: RootState) => state.userAuth);
  const userId = useSelector((state: RootState) => state.cookie.id_user); // Получение id пользователя из cookies

  const [newLogin, setNewLogin] = useState<string>(login);
  const [newPassword, setNewPassword] = useState<string>("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is not available", userId);
      return;
    }

    const data: { login?: string; password?: string } = {};
    if (newLogin !== login) data.login = newLogin;
    if (newPassword) data.password = newPassword;

    await dispatch(updateUserData(userId, data)); // Передаем user_id и данные
    alert("Данные успешно обновлены.");
  };

  if (!isAuth) {
    return <div>Пожалуйста, войдите в систему, чтобы увидеть профиль.</div>;
  }

  return (
    <div>
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Личный кабинет</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6">
          <div
            className="p-4 shadow"
            style={{
              backgroundColor: "#D0B175",
              borderRadius: "10px",
            }}
          >
            <h5 className="text-center mb-4">Добро пожаловать {login}!</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Логин:</strong> {login}
              </li>
              <li>
                <strong>Статус:</strong> Авторизован
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>

    <Container className="mt-5">
      <h2>Личный кабинет</h2>
      <Form onSubmit={handleUpdate}>
        <FormGroup>
          <Label for="newLogin">Новый логин</Label>
          <Input
            type="text"
            id="newLogin"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">Новый пароль</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Сохранить изменения
        </Button>
      </Form>
    </Container>
    </div>
  );
};

export default ProfilePage;
