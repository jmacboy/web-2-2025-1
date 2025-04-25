import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router';

const Menu = () => {
    return (<Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">Proyecto</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/" className='nav-link'>Home</NavLink>
                    <NavDropdown title="Personas" id="basic-nav-dropdown">
                        <NavLink to="/personas/create" className='dropdown-item'>Crear Persona</NavLink>
                        <NavDropdown.Divider />
                        <NavLink to="/" className='dropdown-item'>Lista de Personas</NavLink>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}

export default Menu;