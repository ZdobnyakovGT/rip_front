import { FC } from 'react';
import { Container } from 'react-bootstrap';
// import { Navbar } from '../../components/Navbar';
import { LoginForm } from '../../components/LoginForm';


export const LoginPage: FC = () => {
  return (
    <>
    <Container className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
      <LoginForm></LoginForm>
    </Container> 
    </>
  );
}

export default LoginPage 