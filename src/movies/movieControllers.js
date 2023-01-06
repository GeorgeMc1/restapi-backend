const Movie = require("./movieModel");
const User = require("../users/userModel");
const jwt = require("jsonwebtoken");

exports.createMovie = async (req, res) => {
    try{
        const newMovie = await Movie.create(req.body);
        console.log(newMovie);
        res.status(201).send({message: "A Movie has been created"});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.readMovies = async (req, res) => {
    try{
        const movies = await Movie.find({});
        res.status(200).send({Movies: movies});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.updateMovie = async (req, res) => {
    try{
        await Movie.updateOne({title: req.body.title}, {[req.body.key]: req.body.value});
        res.status(202).send({message: `${req.body.title}'s ${req.body.key} has been changed to ${req.body.value}`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        await Movie.deleteOne({title: req.body.title});
        res.status(202).send({message: `${req.body.title} has been deleted`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.likeMovie = async (req, res) => {
    try{
        let liked;
        let remove;
        let movie = await Movie.findOne({title: req.body.title});
        req.user.likedmovies.forEach(async (like) => {
            if(like == movie.title){
                liked = true;
                remove = like;
            }
        })
        if(liked){
            req.user.likedmovies.splice(req.user.likedmovies.indexOf(remove), 1);
            await req.user.save();
            movie.likedby.splice(movie.likedby.indexOf(req.user.username), 1);
            await movie.save();
            res.status(200).send({message: "movie unliked"});
        } else {
            req.user.likedmovies.push(req.body.title);
            await req.user.save();
            movie.likedby.push(req.user.username);
            await movie.save();
            res.status(200).send({message: "movie liked"});
        }
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}