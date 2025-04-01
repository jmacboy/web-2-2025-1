/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const db = require("./models/");

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));


require("./controllers")(app, db);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
