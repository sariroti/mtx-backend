const jsonDB = require('../db').jsonDB;

function getById(id) {
  const current = null;
  try {
    jsonDB.getData(`/user/${id}`);
  } catch (e) {
    console.log(e);
  }

  return current;
}

function save(id, name) {
  console.log(id);
  console.log(name);
  jsonDB.push(`/user/${id}`, name);
}

function changePassword() {}

module.exports = {
  create: save,
  getById,
};
