import { getPost, getAllPosts, getPostsFromUser, getPostPicture, uploadPost, getFilteredPosts } from "../controllers/post.controller.js";
import { post_upload } from "../config/multer.config.js";
  
export default function(app) {

  app.get("/post/getPost/:postId", getPost);

  app.get("/post/getPostsFromUser/:username", getPostsFromUser);

  app.get("/post/getPostPicture/:postId", getPostPicture);

  app.get("/post/allPosts", getAllPosts);

  app.get("/post/getFiltered/", getFilteredPosts);

  app.post("/post/upload", post_upload.single('image'), uploadPost);

};