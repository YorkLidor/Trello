require('dotenv').config()

module.exports = {
  // dbURL: 'mongodb://localhost:27017',
  dbURL: process.env.DB_URL,
}
