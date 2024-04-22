const express = require("express");
const app = express();
const bodyParse = require("body-parser")
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./user/UserController");

const Article = require("./articles/Articles");
const Category = require("./categories/Category");
const User = require("./user/User");



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
app.use("/", usersController);


app.get("/", (req, res) =>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })
    })
})

app.get("/:slug", (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            })
        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/");
    })
})

app.get("/category/:slug", (req, res) =>{
    var slug= req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories });
            })
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})


app.listen(8080 , () =>{
    console.log("O Servidor está funfando");
})