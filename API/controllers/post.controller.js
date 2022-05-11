import db from "../models/index.js";

const Post = db.post;

export function getAllPosts(req, res){
    Post.findAll()
    .then(posts => {
        console.log(posts);
        res.status(200).send({
            posts: posts
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function getPost(req, res){
    Post.findOne({
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
            createdAt: post.createdAt
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}