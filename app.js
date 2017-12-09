const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");

//Configurations
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

console.log(config.get("weatherAPI.key"));

//Routes
require("./routes")(app);

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));

