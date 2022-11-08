const router = require("express").Router();

const createUserController = require("../controllers/createUser");
const logUserIncontroller = require("../controllers/logUserIn");
const showPostsController = require("../controllers/getUserHomepage");

router
  .route("/")
  .post(createUserController.createUser)
  .get(showPostsController.getPosts);

router.route("/login").post(logUserIncontroller.logIn);

module.exports = router;
