const db = require("../models/");
const { generateAuthToken, generatePassword } = require("../utils/auth.utils");
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "El usuario y la contraseña son requeridas" });
    }
    const usuario = await db.usuario.findOne({
        where: {
            email: email,
        },
    });
    if (!usuario) {
        return res.status(401).send({ message: "Usuario o contraseña incorrectos" });
    }
    const hashedPassword = generatePassword(password);
    if (usuario.password !== hashedPassword) {
        return res.status(401).send({ message: "Usuario o contraseña incorrectos" });
    }
    console.log("usuario verificado");
    try {
        const authToken = await db.authToken.create({
            usuarioId: usuario.id,
            token: generateAuthToken(usuario.email),
        });
        console.log("authToken", authToken);

        res.send({
            token: authToken.token,
        });
    } catch (error) {
        console.error("Error creating auth token:", error);
        return res.status(500).send({ message: "Error al crear el token de autenticación" });
    }

};
exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "El usuario y la contraseña son requeridas" });
    }
    const existingUser = await db.usuario.findOne({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        return res.status(400).send({ message: "El correo ya existe" });
    }
    const hashedPassword = generatePassword(password);
    console.log("hashedPassword", hashedPassword);
    console.log("email", email);
    try {
        const usuario = await db.usuario.create({
            email: email,
            password: hashedPassword,
        });
        res.send({
            id: usuario.id,
            email: usuario.email,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ message: "Error al crear usuario" });
    }

}
