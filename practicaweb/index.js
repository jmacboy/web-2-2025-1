const express = require("express");
const app = express();
const port = 3000;

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
  res.send("Hola mundo!");
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
