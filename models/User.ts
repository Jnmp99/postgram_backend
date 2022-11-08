const db = require("../config/db");

class User {
  username: string;
  password: string;
  email: string;
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async save() {
    let sql = `INSERT INTO users(
	    username,
      email,
      password
    )
    VALUES("${this.username}", "${this.email}", "${this.password}")`;

    return db.execute(sql);
  }

  static getUserByUserName(username: string) {
    let sql = `SELECT * FROM users WHERE username = "${username}"`;

    return db.execute(sql);
  }

  static getUserByEmail(email: string) {
    let sql = `SELECT * FROM users WHERE email = "${email}"`;

    return db.execute(sql);
  }

  static deleteUsername(username: string) {
    let sql = `DELETE FROM users WHERE username = "${username}"`;

    return db.execute(sql);
  }

  static getUserHomePageUsername(username: string) {
    let sql = `SELECT * FROM profiles WHERE username = "${username}"`;

    return db.execute(sql);
  }
}

module.exports = User;
