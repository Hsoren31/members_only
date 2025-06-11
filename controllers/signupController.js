const db = require("../db/queries.js");

async function createUserPost(req, res, next) {
  try {
    const { first_name, last_name, username, password } = req.body;
    await db.insertUser(first_name, last_name, username, password);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUserPost,
};
