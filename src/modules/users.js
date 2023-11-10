const fs = require("fs");
const path = require("path");

const getUsers = () => {
  userPath = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(userPath);
};

module.exports = getUsers;
