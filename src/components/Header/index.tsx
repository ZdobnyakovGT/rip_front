import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Navbar className="p-3" expand="lg">
                <Container>
                    <Row>
                        <Col md="6" className="d-flex align-items-center">
                            {/* Здесь вставляем картинку и текст рядом с ней */}
                            <NavbarBrand>
                                <NavLink tag={RRNavLink} to="/" className="d-flex align-items-center">
                                    {/* Картинка */}
                                    <img 
                                        src="http://127.0.0.1:9000/images/im0.png" 
                                        alt="Logo" 
                                        style={{ width: "70px", height: '80px', marginRight: "10px" }} // Задаем размеры и отступ от текста
                                    />
                                    {/* Текст рядом с картинкой */}
                                    Выставки
                                </NavLink>
                            </NavbarBrand>
                        </Col>
                        <Col md="6" className="d-flex justify-content-end align-items-center">
                            <Nav className="fs-5 gap-3" navbar>
        
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/topics">
                                        Темы
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
