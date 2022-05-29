import { getPfp, getBackgroundPicture, setPfp, setBackgroundPicture, getUserInfo } from "../controllers/user.controller.js";
import { pfp_upload, background_upload } from "../config/multer.config.js";

export default function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user/getInfo/:username", getUserInfo);

  app.get("/user/pfp/:username", getPfp);

  app.get("/user/background/:username", getBackgroundPicture);

  app.post("/user/setPfp/", pfp_upload.single('image'), setPfp);

  app.post("/user/setBackground/", background_upload.single('image'), setBackgroundPicture);

  app.post("/user/setPfp/", pfp_upload.single('image'), setPfp);

};