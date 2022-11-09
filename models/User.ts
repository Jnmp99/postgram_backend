const user = require("../config/db");

exports.createUser = async (
  username: string,
  email: string,
  password: string
) => {
  let sql = `INSERT INTO users(
    username,
    email,
    password
  )
  VALUES("${username}", "${email}", "${password}")`;

  return user.execute(sql);
};

exports.getUserByUserName = async (username: string) => {
  let sql = `SELECT * FROM users WHERE username = "${username}"`;

  return user.execute(sql);
};

exports.getUserByEmail = async (email: string) => {
  let sql = `SELECT * FROM users WHERE email = "${email}"`;

  return user.execute(sql);
};

exports.deleteUsername = async (username: string) => {
  let sql = `DELETE FROM users WHERE username = "${username}"`;

  return user.execute(sql);
};

exports.getUserHomePageUsername = async (username: string) => {
  let sql = `SELECT * FROM profiles WHERE username = "${username}"`;

  return user.execute(sql);
};
