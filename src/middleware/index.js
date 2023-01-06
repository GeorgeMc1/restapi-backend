const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/userModel");

exports.hashPass = async (req, res, next) => {
    if(req.body.password || req.body.key == "password"){
        try{
            if(req.body.key){
                req.body.value = await bcrypt.hash(req.body.value, 11);
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 11);
            }
            next();
        } catch(error){
            console.log(error);
            res.status(500).send({error: error.message});
        }
    } else {
        next();
    }
}

exports.checkPass = async (req, res, next) => {
    try{
        req.user = await User.findOne({username: req.body.username});
        if(req.user && await bcrypt.compare(req.body.password, req.user.password)){
            console.log("password is correct");
            next();
        } else {
            throw new Error("incorrect username or password");
        }
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.checkToken = async (req, res, next) => {
    try{
        if(!req.header("Authorization")){
            console.log("no token passed")
            throw new Error("no token passed");
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedToken._id);
        if(req.user){
            req.authUser = req.user;
            next();
        } else {
            throw new Error("user is not authorised");
        }
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.verifyPassword = async (req, res, next) => {
    if(req.body.key == "password" || req.body.password){
        try{
            let pass;
            if(req.body.key){
                pass = req.body.value;
            } else {
                pass = req.body.password;
            }
            if(pass && /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass)){
                next();
            } else {
                throw new Error("password is not valid");
            }
        } catch(error){
            console.log(error);
            res.status(500).send({error: error.message});
        }
    } else {
        next();
    }
}

exports.verifyEmail = async (req, res, next) => {
    if(req.body.key == "email" || req.body.email){
        try{
            let email;
            if(req.body.key){
                email = req.body.value;
            } else {
                email = req.body.email;
            }
            const verify = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(\.?)$/;
            if(email && verify.test(email)){
                next();
            } else {
                throw new Error("email is not valid");
            }
        } catch(error){
            console.log(error);
            res.status(500).send({error: error.message});
        }
    } else {
        next();
    }
}