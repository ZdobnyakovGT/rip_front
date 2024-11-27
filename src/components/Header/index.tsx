
// export default Header;
import { Col, Container, Nav, Navbar, NavbarBrand, NavItem, Row } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import logo from "assets/im0.png";

const Header = () => {
    return (
        <header>
            <Navbar className="header-container p-1" expand="lg">
                <Container>
                    <Row>
                        <Col xs="12" md="6" className="d-flex align-items-center">
                            <NavbarBrand tag={RRNavLink} to="/" className="d-flex align-items-center">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{ width: "70px", height: "80px", marginRight: "10px" }}
                                />
                                <span style={{ fontSize: "2vw" }}>Выставки МГТУ им. Баумана</span>
                            </NavbarBrand>
                        </Col>
                        <Col xs="12" md="6" className="d-flex justify-content-end align-items-center">
                            <Nav className="fs-5 gap-3" navbar>
                                <NavItem>
                                    <RRNavLink to="/topics" className="nav-link">
                                        Темы
                                    </RRNavLink>
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
