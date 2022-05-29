import db from "../models/index.js";

const Comment = db.comment;
const User = db.user;

export function getCommentsForPost(req, res){
    Comment.findAll({
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            }
        },
        where: {
            postId: req.params.postId
        }
    })
    .then(comments => {
        res.status(200).send({
            comments: comments
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

export function postComment(req, res){
    Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.body.postId
    })
        .then(() => {
            res.send({message: "Comment successfully saved."});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}