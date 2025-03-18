const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const db = require("./models/");

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/js/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/js")
);
app.use(
  "/js/popper",
  express.static(__dirname + "/node_modules/@popperjs/dist")
);
app.use(
  "/css/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use("/css", express.static(__dirname + "/css"));

app.get("/", (req, res) => {
  const title = "Hola Mundo";
  res.render("pages/index.ejs", { title });
});
app.get("/prueba", (req, res) => {
  const persona = db.persona.create({
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    ciudad: "Bogota",
    fechaNacimiento: new Date("1996-05-12"),
  });
  res.render("pages/prueba.ejs", {});
});
app.get("/personas", async (req, res) => {
  const personas = await db.persona.findAll();
  res.render("pages/list.ejs", { personas });
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});
app.get("/receiveinfoget", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  res.send(`First name: ${firstName}, Last name: ${lastName}`);
});
app.post("/receiveinfopost", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  res.send(`First name: ${firstName}, Last name: ${lastName}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
