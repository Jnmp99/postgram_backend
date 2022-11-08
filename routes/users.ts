const router = require("express").Router();

const controllers = require("../controllers/controllers");
const createUserController = require("../controllers/createUser");
const logUserIncontroller = require("../controllers/logUserIn");
const showPostsController = require("../controllers/getUserHomepage");

router
  .route("/")
  .post(createUserController.createUser)
  .delete(controllers.deleteUser)
  .put(controllers.updateUser)
  .get(showPostsController.getPosts);

router.route("/login").post(logUserIncontroller.logIn);

module.exports = router;
