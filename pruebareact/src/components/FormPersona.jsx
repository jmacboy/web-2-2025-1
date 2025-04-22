import { useState } from "react";

const FormPersona = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')

    const onButtonClick = (e) => {
        e.preventDefault();
        console.log('Nombre: ', nombre);
        console.log('Apellido: ', apellido);
    }


    return ( <div>
        <form>
            <div>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <h5>Tu nombre es: {nombre}</h5>            
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <button type="submit" onClick={onButtonClick}>Enviar</button>
        </form>
    </div> );
}
 
export default FormPersona;