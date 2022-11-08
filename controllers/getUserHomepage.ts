require("dotenv").config();
const getUserHomePageUsername = require("../models/User");

exports.getPosts = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, user: string) => {
        if (err) return res.status(403).json({ err });
        req.user = user;
      }
    );

    if (req.user) {
      let [userHomePage, _] = await getUserHomePageUsername(req.user);
      res.status(200).json({ user: userHomePage });
    }
  } catch (error) {
    next(error);
  }
};
