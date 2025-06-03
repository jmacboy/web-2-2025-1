import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import Menu from "../components/Menu";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";

const FormPersona = () => {
    const { getAuthUser } = useAuth(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [ciudad, setCiudad] = useState('')
    useEffect(() => {
        if (!id) return;
        const fetchPersonaInfo = () => {
            const { token } = getAuthUser();
            axios.get(`http://localhost:3000/personas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    const persona = res.data;
                    console.log(res.data);
                    setNombre(persona.nombre);
                    setApellido(persona.apellido);
                    setEdad(persona.edad);
                    setCiudad(persona.ciudad);
                    setFechaNacimiento(moment(persona.fechaNacimiento).format('YYYY-MM-DD'));
                }).catch((err) => {
                    if (err.response.status === 401) {
                        navigate('/login');
                        return;
                    }
                    console.log(err);
                });
        }

        fetchPersonaInfo();
    }, [id])

    const onFormSubmit = (e) => {
        e.preventDefault();

        const persona = {
            nombre,
            apellido,
            edad: parseInt(edad),
            ciudad,
            fechaNacimiento
        }
        console.log(persona);
        if (id) {
            sendEditPersona(persona);
        } else {
            sendCreatePersona(persona);
        }
    }
    const sendEditPersona = (persona) => {
        const { token } = getAuthUser();
        axios.put(`http://localhost:3000/personas/${id}`, persona, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            }).catch((err) => {
                if (err.response.status === 401) {
                    navigate('/login');
                    return;
                }
                console.log(err);
            });
    }
    const sendCreatePersona = (persona) => {
        const { token } = getAuthUser();
        axios.post(`http://localhost:3000/personas`, persona, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            }).catch((err) => {
                if (err.response.status === 401) {
                    navigate('/login');
                    return;
                }
                console.log(err);
            });
    }


    return (
        <>
            <Menu />
            <Container className="mt-3">
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Header>Formulario Personas</Card.Header>
                            <Card.Body>
                                <div>
                                    <Form onSubmit={onFormSubmit}>
                                        <div>
                                            <label>Nombre</label>
                                            <FormControl required="true" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                            {/* <h5>Tu nombre es: {nombre}</h5>             */}
                                        </div>
                                        <div>
                                            <label>Apellido</label>
                                            <FormControl required="true" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Edad</label>
                                            <FormControl required="true" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Ciudad</label>
                                            <FormControl required="true" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Fecha de Nacimiento</label>
                                            <FormControl required="true" type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                                        </div>
                                        <div className="mt-2">
                                            <Button variant="primary" type="submit" >Enviar</Button>
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

export default FormPersona;