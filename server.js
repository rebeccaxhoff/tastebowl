const data = require("./data")

const express = require ('express');
const basicAuth = require('express-basic-auth') // couldn't get password encoded with bcrypt


const app = express();
const port = 4131;

app.set("views", "templates"); // look in "templates" folder for pug templates
app.set("view engine", "pug");

app.use(express.static("resources"));
app.use(express.json());

// print request method and status code
let request = "";
app.use((req, res, next) => {
    if(req.url != "/api/sale"){
        request += req.method.toUpperCase();
        request += ` ${req.url} `;

        res.on('finish', () => {
            request += res.statusCode;
            console.log(request);
            request = "";
        });
    }
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html
app.get(['/', '/main'], async (req, res)=> {
    res.status(200).render("mainpage.pug");
})

app.get(['/register'], async (req, res)=> {
    res.status(200).render("register.pug");
})

app.get(['/login'], async (req, res)=> {
    res.status(200).render("login.pug");
})

// put at bottom so it's run last -- this acts as a "catch all" letting us 404!
app.use((req, res, next) => {
    res.status(404).render('404.pug');
})

app.listen(port , () => {
    console.log(`Example app listening on port ${port}`);
})