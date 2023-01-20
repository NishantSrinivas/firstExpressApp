// const axios = require('axios');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const app = express();
const APP_PORT = 8080;
// const BASE_URL = "https://icanhazdadjoke.com";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let tweets = [
    {
        id: uuidv4(),
        content: "This is the first fake tweet!! HURAAY",
        author: "yeaItsMe"
    },
    {
        id: uuidv4(),
        content: "Oh yea this is so COOL",
        author: "fakeUSER123"
    },
    {
        id: uuidv4(),
        content: "Colt and his cats, so hilarious",
        author: "randomUser"
    },
    {
        id: uuidv4(),
        content: "Web Dev is FUNNNNNN",
        author: "yeaItsMe"
    },
]

app.get("/tweets", (req, res) => {
    res.render("tweet", { tweets, title: "Twitter Clone" });
})

app.get("/tweets/new", (req, res) => {
    res.render("createtweet", { tweets, title: "Twitter Clone" });
})

app.post("/tweets", (req, res) => {
    const { author, tweet } = req.body;
    tweets.push({ author: author, content: tweet, id: uuidv4() });
    res.redirect("/tweets");
})

app.patch("/tweets/:id", (req, res) => {
    const { tweet: newTweet } = req.body;
    let tweetToBeUpdated = tweets.filter(({ id }) => id === req.params.id);
    if (tweetToBeUpdated.length !== 0) {
        tweetToBeUpdated[0].content = newTweet;
    }
    res.redirect("/tweets");
})

app.delete("/tweets/:id", (req, res) => {
    let newtweets = tweets.filter(({ id }) => id !== req.params.id);
    tweets = newtweets;
    res.redirect("/tweets");
})

app.get("/tweets/edit/:id", (req, res) => {
    const tweet = tweets.filter(({ id }) => id === req.params.id);
    res.render("edittweet", { author: tweet[0].author, content: tweet[0].content, id: tweet[0].id, title: "Edit tweet" });
})

app.get("/tweets/:id", (req, res) => {
    const tweet = tweets.filter(({ id }) => id === req.params.id);
    res.render("showtweet", { author: tweet[0].author, content: tweet[0].content, title: "Twitter Clone" });
})

// JUST SOME RANDOM PRACTICE CODE. 

// app.use((request, response) => {
//     console.log(`app received a request for ${request.path}`);
//     response.send({ application: "First Express Application" });
// })

// app.get("/about", (request, response) => {
//     response.send("About page");
// })

// app.get("/", (request, response) => {
//     response.render("home", { title: "First express app" });
// })

// app.get("/greet", (request, response) => {
//     console.log(request.query)
//     const { username } = request.query;
//     response.render("greet", { username, title: "Express greet" });
// })

// app.get("/getajoke", async (request, response) => {
//     const reqConfig = { 'headers': { 'Accept': 'application/json', "User-Agent": "axios 0.21.1" } }
//     const result = await axios.get(BASE_URL, reqConfig);
//     // console.log(result);
//     response.send(result.data);
//     // result.json(result.data)
// })

// app.get("/randomnumber", (request, response) => {
//     const randomNumber = Math.floor(Math.random() * 1000) + 1;
//     response.render("randomnumber", { randomNumber, title: "Random Number" });
// })

// app.get("/favtvshows", (request, response) => {
//     const favTVShows = ["Suits", "Daredevil", "Loki", "The Morning Show", "The Simpsons", "What If..?"];
//     response.render("favtvshows", { favTVShows, title: "My Favorites" });
// })

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