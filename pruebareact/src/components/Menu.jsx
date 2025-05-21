import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router';
import { LOCAL_STORAGE_EMAIL, LOCAL_STORAGE_TOKEN } from '../utils/CONSTANTS';
import { useAuth } from '../../hooks/useAuth';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Menu = () => {
    const { logout, getAuthUser } = useAuth();
    const { user } = useContext(AppContext);
    const onCerrarSesionClick = (e) => {
        e.preventDefault();
        const confirmacion = window.confirm("¿Está seguro de que desea cerrar sesión?");
        if (!confirmacion) return;
        logout();
    }
    const { token } = getAuthUser();
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
                        (user && <NavDropdown title={user.nombre + " " + user.apellidos} id="user-dropdown">
                            <Link className='dropdown-item' onClick={onCerrarSesionClick}>Cerrar Sesión</Link>
                        </NavDropdown>)
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