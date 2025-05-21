import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import Menu from "../components/Menu";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_TOKEN } from "../utils/CONSTANTS";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const onFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/register', { email, password, nombre, apellidos, telefono })
            .then((res) => {
                console.log(res.data);

                navigate('/login');
            }).catch((err) => {
                console.log(err);
                if (err.response.status === 400) {
                    alert("El correo ya existe");
                    return;
                }
                if (err.response.status === 500) {
                    alert("Error en registrar usuario, por favor intente nuevamente");
                }
            });
    }


    return (
        <>
            <Menu />
            <Container className="mt-3">
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Header>Registro</Card.Header>
                            <Card.Body>
                                <div>
                                    <Form onSubmit={onFormSubmit}>
                                        <div>
                                            <label>Email</label>
                                            <FormControl required="true" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Contraseña</label>
                                            <FormControl required="true" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Nombres</label>
                                            <FormControl required="true" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Apellidos</label>
                                            <FormControl required="true" type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Teléfono</label>
                                            <FormControl required="true" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                        </div>
                                        <div className="mt-2">
                                            <Button variant="primary" type="submit" >Registro</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default Register;