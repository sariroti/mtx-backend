const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

module.exports = {
  jsonDB: db,
};
