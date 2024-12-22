// src/components/LoginForm.tsx

import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from 'src/core/store/hooks'; // Ваш хук для диспатча
import { userLogin } from 'src/api/index.ts';  // Экшен для логина
import { saveUser } from 'src/core/store/slices/userSlice'; // Слайс для сохранения данных пользователя
import { UserLogin } from 'src/api/API'; // Тип запроса для логина
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const LoginForm: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const authRequestDTO: UserLogin = {
            username: login,
            password: password
        };

        try {
            // Отправляем запрос на логин с помощью createAsyncThunk
            const resultAction = await dispatch(userLogin(authRequestDTO));

            if (userLogin.fulfilled.match(resultAction)) {
                // Обрабатываем успешный ответ
                const response = resultAction.payload;

                // Проверка, есть ли session_id в cookies
                if (document.cookie.includes("session_id")) {
                    // Сохраняем данные пользователя в Redux
                    dispatch(saveUser({ login, accessToken: response.accessToken }));

                    // Переходим на главную страницу
                    navigate('/');
                } else {
                    setError("Ошибка авторизации. Попробуйте снова.");
                }
            } else {
                setError("Не удалось выполнить авторизацию. Попробуйте снова.");
            }
        } catch (err) {
            setError('Такого пользователя нет. Проверьте данные.');
            console.error(err);
        }
    };

    return (
        <div className="d-flex flex-column gap-3 mt-5" style={{ width: '100%', maxWidth: '500px' }}>
            <h1 className="text-center">Вход в систему</h1>
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-5">
                <Form.Floating>
                    <Form.Control
                        id="login"
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <label htmlFor="login">Логин</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Пароль</label>
                </Form.Floating>
                <button 
                    id="sign-in" 
                    type="submit" 
                    className="fs-5 btn btn-block w-100" 
                    style={{ color: "#ffffff", backgroundColor: "#D0B175" }}
                >
                    Войти
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Form>
            <p className="fs-5 text-center">Нет аккаунта?
                <Link to='/register'>
                    Создайте!
                </Link>
            </p>
        </div>
    );
};
