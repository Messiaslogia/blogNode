const express = require("express");
const bodyParse = require("body-parser")
const connection = require("./database/database");
const app = express();

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// Database
connection.authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!");
    })
    .catch((error) =>{
        console.log(error);

    })

app.get("/", (req, res) =>{
    res.render("index");
})


app.listen(8080 , () =>{
    console.log("O Servidor está funfando");
})