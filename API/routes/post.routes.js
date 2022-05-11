import { getPost, getAllPosts } from "../controllers/post.controller.js";

export default function(app) {

  app.get("/post/:id", getPost);

  app.get("/post/allPosts", getAllPosts);

};