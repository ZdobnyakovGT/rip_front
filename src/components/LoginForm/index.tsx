import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "src/core/store/hooks.ts";
// import { users } from "src/api";
import { api } from "src/api";
// import { Api } from "src/api/API.ts";
import { saveUser } from "src/core/store/slices/userSlice";
import { UserLogin } from "src/api/API.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
            const response = await api.users.usersLoginCreate(authRequestDTO);
    
            if (document.cookie.includes("session_id")) {
                dispatch(saveUser({ login, accessToken: response.data.username }));
                navigate("/");
            } else {
                setError("Ошибка авторизации. Попробуйте снова.");
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
                    type="login"
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
            <button id="sign-in" type="submit" className="fs-5 btn btn-block w-100" style={{ color: "#ffffff", backgroundColor: "#D0B175"}}>Войти</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
        <p className="fs-5 text-center">Нет аккаунта?
             <Link to='/register'>
                Создайте!
             </Link>
        </p>
      </div>
    );
}