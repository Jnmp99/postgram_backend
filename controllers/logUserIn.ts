const compareUser = async (
  tempUsername: string,
  tempPassword: string,
  res: any
) => {
  try {
    let [user, _] = await User.getUserByUserName(tempUsername);

    if (user.length === 0) {
      res
        .status(409)
        .json({ error: "The user name or the password are incorrect" });
      return;
    }

    let password = user[0].password;
    let username = user[0].username;
    bcrypt.compare(tempPassword, password).then((result: boolean) => {
      if (!result) {
        res
          .status(409)
          .json({ error: "The user name or the password are incorrect" });
        return;
      }

      const accessToken = generateAccessToken(username);
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      res.status(200).json({ accessToken });
    });
  } catch (err) {
    console.error(err);
  }
};

const generateAccessToken = (user: string) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

exports.logIn = (req: any, res: any, next: any) => {
  try {
    let { username, password } = req.body;

    compareUser(username, password, res);
  } catch (error) {
    next(error);
  }
};
