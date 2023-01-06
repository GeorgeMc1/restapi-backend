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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})