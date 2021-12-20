const jsonDB = require('../db').jsonDB;

function getById(id) {
  return jsonDB.getData(`/user/${id}`);
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
