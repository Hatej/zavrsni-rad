import middleware from "../middleware/index.js";
const verifySignUp = middleware.verifySignUp; 
import { signup, signin } from "../controllers/auth.controller.js";
export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    signup
  );
  app.post("/auth/signin", signin);
};