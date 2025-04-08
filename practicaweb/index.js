/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;
const db = require("./models/");
const session = require('express-session')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.set("view engine", "ejs");
app.use(express.static('public'));



app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

//configuracion de session
app.use(session({
  secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

db.sequelize.sync({
  // force: true // drop tables and recreate
}).then(() => {
  console.log("db resync");
});


require("./routes")(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
