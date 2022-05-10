import db from "../models/index.js";
import path from 'path';

const User = db.user;
const __dirname = path.resolve();

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

export function allAccess(req, res) {
    res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
    res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
    res.status(200).send("Admin Content.");
}

export function moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
}