const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var cors = require('cors')
require('dotenv').config()
const app = express();
const port = 3000;
const db = require("./models/");

//cors
app.use(cors({
    origin: [process.env.FRONTEND_BASE_URL, 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require("./routes")(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
