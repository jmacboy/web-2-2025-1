import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router';
import { LOCAL_STORAGE_EMAIL, LOCAL_STORAGE_TOKEN } from '../utils/CONSTANTS';

const Menu = () => {
    const navigate = useNavigate();
    const onCerrarSesionClick = (e) => {
        e.preventDefault();
        const confirmacion = window.confirm("¿Está seguro de que desea cerrar sesión?");
        if (!confirmacion) return;
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        navigate('/login');
    }
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const email = localStorage.getItem(LOCAL_STORAGE_EMAIL);
    return (<Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">Proyecto</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {token &&
                        <>
                            <NavLink to="/" className='nav-link'>Home</NavLink>
                            <NavDropdown title="Personas" id="basic-nav-dropdown">
                                <NavLink to="/personas/create" className='dropdown-item'>Crear Persona</NavLink>
                                <NavDropdown.Divider />
                                <NavLink to="/" className='dropdown-item'>Lista de Personas</NavLink>
                            </NavDropdown>
                        </>
                    }
                    {token ?
                        <NavDropdown title={email} id="user-dropdown">
                            <Link className='dropdown-item' onClick={onCerrarSesionClick}>Cerrar Sesión</Link>
                        </NavDropdown>
                        :
                        <>
                            <NavLink to="/login" className='nav-link'>Iniciar Sesión</NavLink>
                            <NavLink to="/register" className='nav-link'>Registro</NavLink>
                        </>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}

export default Menu;