import { getCommentsForPost, postComment } from "../controllers/comment.controller.js";

export default function(app) {

    app.get("/comment/getCommentsForPost/:postId", getCommentsForPost);

    app.post("/comment/postComment", postComment);
  
  };