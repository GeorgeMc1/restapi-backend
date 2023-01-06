require("./db/connection");
const express = require("express");
const cors = require("cors");
const movieRouter = require("./movies/movieRoutes");
const userRouter = require("./users/userRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(movieRouter);

//endpoint to check if the API is working for deployment
app.get("/health", (req, res) => {
    res.status(200).send({message: "API is working"});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})