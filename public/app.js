const newtweet = document.querySelector("#newtweet");
const axios = require('axios');

newtweet.addEventListener("submit", async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8080/tweet");
    console.log("Tweet will be created soon!");
})