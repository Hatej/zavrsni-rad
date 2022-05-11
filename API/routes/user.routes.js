import middleware from "../middleware/index.js";
const authJwt = middleware.authJwt;
import { getPfp, getBackgroundPicture } from "../controllers/user.controller.js";
export default function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user/pfp/:username", getPfp);

  app.get("/user/background/:username", getBackgroundPicture);

  /*
  app.get("/test/all", allAccess);
  app.get(
    "/test/user",
    [authJwt.verifyToken],
    userBoard
  );
  app.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  app.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
  */
};