const bcrypt = require("bcryptjs");

// Dummy users
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2a$10$7.pT/8Q7XxkDxLD0zlsL.O3r7Vr7CMbGq0uOuYIbgnpl8UgR4hZeS",
  }, // password is 'password1'
];

const getUserByUsername = (username) =>
  users.find((user) => user.username === username);

const addUser = (user) => {
  user.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(user);
};

const validatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

module.exports = {
  getUserByUsername,
  validatePassword,
  addUser,
};
