// const axios = require('axios');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const app = express();
const APP_PORT = 8080;
// const BASE_URL = "https://icanhazdadjoke.com";
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/tweetClone').then(() => {
    console.log("Connection establised with database");
}).catch(err => {
    console.log(`Failed to establish connection with database ${err}`)
})

const tweetSchema = new mongoose.Schema({
    _id: String,
    author: String,
    content: String
});

const Tweet = mongoose.model("Tweet", tweetSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/tweets", (req, res) => {
    Tweet.find({})
        .then(data => res.render("tweet", { tweets: data, title: "Twitter Clone" }));
})

app.get("/tweets/new", (req, res) => {
    res.render("createtweet", { tweets, title: "Twitter Clone" });
})

app.post("/tweets", (req, res) => {
    const { author, content } = req.body;
    const newTweet = new Tweet({ "_id": uuidv4(), "author": author, "content": content });
    newTweet.save()
        .then(() => {
            res.redirect("/tweets");
        })
        .catch((err) => {
            console.log(`Tweet could not be saved to database: {err}`);
            res.redirect("errorpage");
        })
})

app.patch("/tweets/:id", (req, res) => {
    const { tweet: newTweet } = req.body;
    Tweet.updateOne({ "_id": req.params.id }, { "content": newTweet }).then(() => res.redirect("/tweets"))
})

app.delete("/tweets/:id", (req, res) => {
    Tweet.findByIdAndDelete(req.params.id).then(() => res.redirect("/tweets"));
})

app.get("/tweets/edit/:id", (req, res) => {
    Tweet.findById(req.params.id).then(data => res.render("edittweet", { author: data.author, content: data.content, id: data.id, title: "Edit data" }));
})

app.get("/tweets/:id", (req, res) => {
    Tweet.findById(req.params.id).then(data => res.render("showtweet", { author: data.author, content: data.content, title: "Twitter Clone" }));
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