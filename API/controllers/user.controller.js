import db from "../models/index.js";
import path from 'path';

const User = db.user;
const __dirname = path.resolve();

export function getUserInfo(req, res){
    console.log(req.params.username);
    User.findOne({
        where: {
            username: req.params.username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({message: "User not found."});
        }
        res.status(200).send({
            username: user.username
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getPfp(req, res) {
    console.log(req.params.username);
    User.findOne({
        where: {
            username: req.params.username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({message: "User not found."});
        }
        console.log("/resources/profile_pictures/".concat(user.profile_picture));
        return res.sendFile(__dirname + "/resources/profile_pictures/".concat(user.profile_picture));
    })
}

export function getBackgroundPicture(req, res) {
    User.findOne({
        where: {
            username: req.params.username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({message: "User not found."});
        }
        return res.sendFile(__dirname + "/resources/background_pictures/".concat(user.background_picture));
    })
}

export function setBackgroundPicture(req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).send({message: "User not found."});
        }
        user.update({ background_picture: req.file.filename });
        user.save()
        .then(() => {
            res.status(200).send({message: "Background picture updated!"});
        })
        .catch(err =>{
            res.status(500).send({ message: err.message });
        })
    })
}

export function setPfp(req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).send({message: "User not found."});
        }
        user.update({ profile_picture: req.file.filename });
        user.save()
        .then(() => {
            res.status(200).send({message: "Profile picture updated!"});
        })
        .catch(err =>{
            res.status(500).send({ message: err.message });
        })
    })
}