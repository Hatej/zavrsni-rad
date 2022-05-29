import db from "../models/index.js";
import path from 'path';
import { Op } from "sequelize";

const Post = db.post;
const User = db.user;
const __dirname = path.resolve();

export function getAllPosts(req, res){
    Post.findAll()
    .then(posts => {
        res.status(200).send({
            posts: posts
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getFilteredPosts(req, res){
    Post.findAll({
        where: {
            [Op.substring]: req.query.search 
        }
    })
    .then(posts => {
        res.status(200).send({
            posts: posts
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getPost(req, res){
    Post.findOne({
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            }
        },
        where: {
            id: req.params.postId
        }
    })
    .then(post => {
        if(!post) {
            return res.status(404).send({message: "Post not found."});
        }
        res.status(200).send({
            name: post.name,
            description: post.description,
            path: post.path,
            likes: post.likes,
            owner: post.userId,
            createdAt: post.createdAt,
            user: post.user
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getPostsFromUser(req, res){
    Post.findAll({
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            },
            where: {
                username: req.params.username
            }
        }
    })
    .then(posts => {
        if(!posts) {
            return res.status(404).send({message: "No posts found."});
        }
        res.status(200).send({
            posts: posts
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getPostPicture(req, res){
    Post.findOne({
        where: {
            id: req.params.postId
        }
    })
    .then(post => {
        if(!post) {
            return res.status(404).send({message: "Post not found."});
        }
        return res.sendFile(__dirname + "/resources/images/".concat(post.path));
    })
}

export function uploadPost(req, res){
    Post.create({
        id: path.parse(req.file.filename).name,
        name: req.body.name,
        description: req.body.description,
        path: req.file.filename,
        userId: req.body.userId
    })
        .then(post => {
            res.send({
                id: post.id,
                message: "Post submited successfully."
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}