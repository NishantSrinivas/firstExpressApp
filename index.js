const express = require('express');
const app = express();
const APP_PORT = 8080;

// app.use((request, response) => {
//     console.log(`app received a request for ${request.path}`);
//     response.send({ application: "First Express Application" });
// })

app.get("/about", (request, response) => {
    response.send("About page");
})

app.get("/", (request, response) => {
    response.send("Home page");
})

app.get("/app/:variable", (request, response) => {
    const { variable } = request.params;
    response.send({ var: variable });
})

app.get("/search", (request, response) => {
    // console.log(request.query);
    const { name } = request.query;
    response.send(`You are looking for ${name}, We will find him soon`);
})

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
})