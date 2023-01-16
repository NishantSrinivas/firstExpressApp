const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const APP_PORT = 8080;
const BASE_URL = "https://icanhazdadjoke.com";

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

app.get("/getajoke", async (request, response) => {
    const reqConfig = { 'headers': { 'Accept': 'application/json', "User-Agent": "axios 0.21.1" } }
    const result = await axios.get(BASE_URL, reqConfig);
    // console.log(result);
    response.send(result.data);
    // result.json(result.data)
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