const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true
    },
    actors:{
        type: Array
    },
    director:{
        type: String
    },
    likedby:{
        type: Array
    }
})
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;