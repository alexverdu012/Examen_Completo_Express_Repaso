const mysql2 = require('mysql2/promise')
const { database } = require('./keys')

const pool = mysql2.createPool(database)
console.info(`Connected to de Database!`)

module.exports = pool