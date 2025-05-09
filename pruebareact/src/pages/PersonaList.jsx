import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap"
import Menu from "../components/Menu";
import { Link } from "react-router";
import moment from "moment";

const PersonaList = () => {
    //#region state variables
    const [personaList, setPersonaList] = useState([]);
    //#endregion

    //#region useEffect
    useEffect(() => {
        fetchPersonaList();
    }, [])
    //#endregion

    //#region functions
    const fetchPersonaList = () => {
        axios.get('http://localhost:3000/personas')
            .then((res) => {
                console.log(res.data);
                setPersonaList(res.data);
            }).catch((err) => {
                console.log(err);
            });
    };

    const eliminarPersona = (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar esta persona?");
        if (!confirmacion) return;
        axios.delete(`http://localhost:3000/personas/${id}`)
            .then((res) => {
                console.log(res.data);
                fetchPersonaList();
            }).catch((err) => {
                console.log(err);
            });
    }
    //#endregion
    return (
        <>
            <Menu />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Table striped bordered hover size="sm" responsive>
                                    <thead >
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Edad</th>
                                            <th>Ciudad</th>
                                            <th>Fecha de Nacimiento</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {personaList.map((persona) => (
                                            <tr key={persona.id}>
                                                <td>{persona.id}</td>
                                                <td>{persona.nombre}</td>
                                                <td>{persona.apellido}</td>
                                                <td>{persona.edad}</td>
                                                <td>{persona.ciudad}</td>
                                                <td>{moment(persona.fechaNacimiento).format('DD/MM/YYYY')}</td>
                                                <td>
                                                    <Link to={`/personas/${persona.id}`} className="btn btn-primary">Editar</Link>
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {
                                                        eliminarPersona(persona.id);
                                                    }}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PersonaList;