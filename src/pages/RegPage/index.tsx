// src/pages/RegPage.tsx

import { FC, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Container, Form } from "react-bootstrap";
import { useAppDispatch } from "src/core/store/hooks";  // Хук для диспатча
import { userRegister } from "src/api/index.ts";  // Экшен для регистрации
import { useNavigate } from "react-router-dom";  // Для навигации
import { UserRegister } from "src/api/API.ts";  // Тип данных для запроса регистрации

export const RegPage: FC = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const regg: UserRegister = {
            email: email,
            password: password,
            first_name: login,
            last_name: login,
            username: login,
        };

        try {
            // Диспатчим экшен для регистрации
            const resultAction = await dispatch(userRegister(regg));

            if (userRegister.fulfilled.match(resultAction)) {
                // После успешной регистрации переходим на страницу логина
                navigate("/login");
            } else {
                setError("Не удалось зарегистрироваться. Попробуйте снова.");
            }
        } catch (err) {
            setError("Произошла ошибка при регистрации.");
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
                <div style={{ width: "100%", maxWidth: "500px" }}>
                    <h1 className="text-center mb-5">Регистрация</h1>
                    {error && <div className="text-danger">{error}</div>}
                    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-5">
                        <Form.Floating>
                            <Form.Control
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </Form.Floating>

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
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Пароль</label>
                        </Form.Floating>

                        <button
                            type="submit"
                            className="fs-5 btn btn-block w-100 mt-4"
                            style={{ color: "#ffffff", backgroundColor: "#D0B175" }}
                        >
                            Зарегистрироваться
                        </button>
                    </Form>
                </div>
            </Container>
        </>
    );
};

export default RegPage;
