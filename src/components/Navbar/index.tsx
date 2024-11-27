import { FC } from "react";
import { Navbar as NavbarComp } from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "src/core/store/hooks.ts";
import { logoutUserAsync } from "../../core/store/slices/userSlice";

export const Navbar: FC = () => {
  const { isAuth, login } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <NavbarComp
      className="navbar logo-container border-bottom border-secondary border-2 custom-navbar"
      sticky="top"
    >
      <NavbarComp.Brand className="d-flex align-items-center ms-3 flex-row">
        <span className="navbar-title">Создание выставок</span>
      </NavbarComp.Brand>

      <div className="ms-auto d-flex align-items-center flex-row gap-3 me-4">
        {!isAuth ? (
          <>
            <Link to="/login" className="navbar-button">
              Войти
            </Link>
            <Link to="/register" className="navbar-button">
              Регистрация
            </Link>
          </>
        ) : (
          <>
            <span className="navbar-username">Привет, {login}!</span>
            <button onClick={handleLogout} className="navbar-button">
              Выйти
            </button>
            <Link to="/profile" className="navbar-button">
              Профиль
            </Link>
          </>
        )}
      </div>
    </NavbarComp>
  );
};
