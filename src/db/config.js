const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () =>
  open({
    filename: './src/db/respondame.sqlite',
    driver: sqlite3.Database
  })
