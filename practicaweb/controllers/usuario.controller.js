const db = require("../models");
const sha1 = require("sha1");
exports.getUsuarioList = async (req, res) => {
    const usuarios = await db.usuario.findAll();
    res.render("pages/usuarios/list.ejs", { usuarios });
};
exports.getUsuarioCreate = (req, res) => {
    res.render('pages/usuarios/form.ejs', { usuario: null, nuevoUsuario: true });
};
exports.postUsuarioCreate = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = sha1(password);

    await db.usuario.create({
        email,
        password: hashedPassword,
    });
    res.redirect('/usuarios');
};
exports.getUsuarioUpdate = async (req, res) => {
    const { id } = req.params;

    const usuario = await db.usuario.findByPk(id);
    if (!usuario) return res.redirect('/usuarios');

    res.render('pages/usuarios/form.ejs', { usuario, nuevoUsuario: false });
};
exports.postUsuarioUpdate = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const usuario = await db.usuario.findByPk(id);
    if (!usuario) return res.redirect('/usuarios');

    usuario.email = email;
    await usuario.save();
    res.redirect('/usuarios');
};
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await db.usuario.findByPk(id);
    if (!usuario) return res.redirect('/usuarios');
    await usuario.destroy();
    res.redirect('/usuarios');
}
exports.getLogin = async (req, res) => {
    res.render('pages/usuarios/login.ejs', { usuario: null });
}
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = sha1(password);
    const usuario = await db.usuario.findOne({
        where: { email, password: hashedPassword }
    });
    if (!usuario) {
        res.redirect('/login');
        return;
    }
    req.session.usuario = usuario;
    res.redirect('/personas');
}
exports.getLogout = async (req, res) => {
    req.session.usuario = null;
    res.redirect('/login');
}
