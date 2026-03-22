const users = [];
let nextId = 1;

function createUser({ email, password }) {
  const user = {
    id: nextId++,
    email,
    password,
    premium: false
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  users,
  createUser,
  findUserByEmail,
  findUserById
};
