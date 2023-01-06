const {Router} = require("express");
const {createMovie, readMovies, updateMovie, deleteMovie, likeMovie} = require("./movieControllers");
const {checkToken} = require("../middleware");

const movieRouter = Router();

movieRouter.post("/createMovie", createMovie);
movieRouter.get("/readMovie", checkToken, readMovies);
movieRouter.put("/updateMovie", checkToken, updateMovie);
movieRouter.delete("/deleteMovie", checkToken, deleteMovie);
movieRouter.post("/likeMovie", checkToken, likeMovie);

module.exports = movieRouter;