const express = require("express");
const app = express();
const bodyParse = require("body-parser")
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Articles");
const Category = require("./categories/Category");


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

app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req, res) =>{
    Article.findAll().then(articles => {
        console.log(articles)
        res.render("index", {articles: articles});
    })
})


app.listen(8080 , () =>{
    console.log("O Servidor está funfando");
})