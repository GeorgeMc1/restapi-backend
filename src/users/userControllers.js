const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.status(201).send({message: "A user has been created"});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.readUsers = async (req, res) => {
    try{
        const users = await User.find(req.body);
        res.status(200).send({users: users});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        await User.updateOne({username: req.body.username}, {[req.body.key]: req.body.value});
        res.status(202).send({message: `${req.body.username}'s ${req.body.key} has been changed`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await User.deleteOne({username: req.body.username});
        res.status(202).send({message: `${req.body.username} has been deleted`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

exports.loginUser = async (req, res) => {
    try{
        if (req.authUser) {
            console.log("token check passed and continue to persistant login");
            res.status(200).send({username: req.authUser.username});
            return;
        }
        const token = await jwt.sign({_id: req.user._id}, process.env.SECRET);
        res.status(200).send({username: req.user.username, token});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}