const express = require('express');
const path = require('path');
const partials = require
const app = express();
const APP_PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



// app.use((request, response) => {
//     console.log(`app received a request for ${request.path}`);
//     response.send({ application: "First Express Application" });
// })

app.get("/about", (request, response) => {
    response.send("About page");
})

app.get("/", (request, response) => {
    response.render("home", { title: "First express app" });
})

app.get("/greet", (request, response) => {
    console.log(request.query)
    const { username } = request.query;
    response.render("greet", { username, title: "Express greet" });
})

app.get("/randomnumber", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    response.render("randomnumber", { randomNumber, title: "Random Number" });
})

app.get("/favtvshows", (request, response) => {
    const favTVShows = ["Suits", "Daredevil", "Loki", "The Morning Show", "The Simpsons", "What If..?"];
    response.render("favtvshows", { favTVShows, title: "My Favorites" });
})

// app.get("/app/:variable", (request, response) => {
//     const { variable } = request.params;
//     response.send({ var: variable });
// })

// app.get("/search", (request, response) => {
//     // console.log(request.query);
//     const { name } = request.query;
//     response.send(`You are looking for ${name}, We will find him soon`);
// })

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
})