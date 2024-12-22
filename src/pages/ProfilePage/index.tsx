import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/core/store/store.ts';
import { updateUserDataAsync } from 'src/core/store/slices/userSlice'; // Импортируем новый thunk
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { api } from 'src/api'; // Предположим, что API доступен через этот импорт

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  
  // Извлекаем login, isAuth и userId из Redux
  const { login, isAuth, userId } = useSelector((state: RootState) => state.userAuth);
  
  // Состояние для нового логина и пароля
  const [newLogin, setNewLogin] = useState<string>(login); // Изначально новый логин равен текущему логину
  const [newPassword, setNewPassword] = useState<string>('');

  // Синхронизация login с localStorage
  useEffect(() => {
    if (newLogin !== login) {
      localStorage.setItem('userLogin', newLogin);
    }
  }, [newLogin, login]);

  // Обработчик отправки формы
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем, что userId существует
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const data: { login?: string; password?: string } = {};
    if (newLogin !== login) data.login = newLogin; // Отправляем новый логин, если он изменен
    if (newPassword) data.password = newPassword; // Отправляем новый пароль, если он введен

    // Диспатчим асинхронное обновление данных пользователя
    dispatch(updateUserDataAsync({ userId, data }))
      .unwrap()
      .then(() => {
        alert('Данные успешно обновлены.');
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
        alert('Произошла ошибка при обновлении данных.');
      });
  };

  // Если пользователь не авторизован
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
          <Link to="/user-shows" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained">
              Мои выставки
            </Button>
          </Link>
        </Row>
        <Row className="justify-content-center">
          <Col xs="12" sm="8" md="6">
            <div
              className="p-4 shadow"
              style={{
                backgroundColor: '#D0B175',
                borderRadius: '10px',
              }}
            >
              <h5 className="text-center mb-4">Добро пожаловать {newLogin}!</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Логин:</strong> {newLogin}
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
        <h2>Изменить профиль</h2>

        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label for="newLogin">Новый логин</Label>
            <Input
              type="text"
              id="newLogin"
              value={newLogin}
              onChange={(e) => setNewLogin(e.target.value)} // Обновляем новый логин
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Новый пароль</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Обновляем новый пароль
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
