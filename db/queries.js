const pool = require("./pool.js");

async function insertUser(firstname, lastname, username, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstname, lastname, username, password]
  );
}

async function userToMember(user) {
  await pool.query(
    "UPDATE users SET membership_status = true WHERE id = ($1)",
    [user.id]
  );
}

async function giveAdminStatus(user) {
  await pool.query("UPDATE users SET admin_status = true WHERE id = ($1)", [
    user.id,
  ]);
  await pool.query(
    "UPDATE users SET membership_status = true WHERE id = ($1)",
    [user.id]
  );
}

async function insertPost(message, user, timestamp) {
  await pool.query(
    "INSERT INTO posts (message, author_id, timestamp) VALUES ($1, $2, $3)",
    [message, user, timestamp]
  );
}

async function deletePost(postId) {
  await pool.query("DELETE FROM posts WHERE id = ($1)", [postId]);
}

async function getAllPosts() {
  const { rows } = await pool.query(
    "SELECT posts.id, message, timestamp, first_name, last_name, username FROM posts JOIN users ON author_id = users.id;"
  );
  return rows;
}

module.exports = {
  insertUser,
  userToMember,
  giveAdminStatus,
  insertPost,
  deletePost,
  getAllPosts,
};
