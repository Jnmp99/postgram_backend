const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validchars: Array<string> = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "_",
];

const check = (string: string, array: Array<string>, type: string) => {
  console.log(string);
  const newArray = string.split("");
  let x = newArray.map((arr) => {
    if (array.indexOf(arr) === -1) {
      return false;
    }
    return true;
  });

  if (x.includes(false)) {
    return {
      isValid: false,
      mesasage: `${
        newArray[x.indexOf(false)]
      } is not a valid ${type} character.`,
    };
  }

  return { isValid: true, message: `Valid ${type}` };
};

const getData = async (
  username: string,
  password: string,
  email: string,
  res: any
) => {
  try {
    let [userBU, _] = await User.getUserByUserName(username);
    let [userBE, _s] = await User.getUserByEmail(email);

    if (userBU == true && userBE == true) {
      res.status(409).json({ error: "User already exist" });
      return;
    }

    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ message: "User created", accessToken });

    // bcrypt.genSalt().then((saltPassword:string) => {
    //   bcrypt.hash(password, saltPassword).then((hashedPassword:string) => {
    //     let user = new User(username, hashedPassword, email);
    //     user = user.save();

    //     const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    //     res.status(201).json({ message: "User created", accessToken });
    //   });
    // });

    return;
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = async (req: any, res: any, next: any) => {
  try {
    let { username, password, email } = req.body;

    if (username === undefined) {
      res.status(400).json({ error: "Username not provided" });
      return;
    }

    if (!check(username, validchars, "username").isValid) {
      res
        .status(400)
        .json({ error: check(username, validchars, "username").mesasage });
      return;
    }

    if (password === undefined) {
      res.status(400).json({ error: "Password not provided" });
      return;
    }

    if (email === undefined) {
      res.status(400).json({ error: "Email not provided" });
      return;
    }

    if (email.indexOf("@gmail.com") === -1) {
      res.status(400).json({ error: "Email not valid" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: "Password is too short" });
      return;
    }

    getData(username, password, email, res);
  } catch (error) {
    next(error);
  }
};
