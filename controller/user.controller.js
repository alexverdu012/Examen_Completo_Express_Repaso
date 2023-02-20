//NO DEBERIA EXISTIR, LO DEJO POR TESTING PORPUSES

const pool = require('../database')

const getUsers = async (req, res) => {
    
    await pool.query('SELECT id, name, email, createdAt FROM Users')
    .then(([data]) => res.send(data))
    .catch((error) => res.render('error', {error}))
}

const postUser = async (req, res) => {
    const {name, email, password} = req.body
    await pool.query('INSERT INTO Users (name, email, password) VALUES (?,?,?)', [name, email, password])
    .then(([data]) => res.send(data))
    .catch((error) => res.render('error', {error}))
}

const getUser = async (req, res) => {
    const {id} = req.params
    await pool.query('SELECT id, name, email, createdAt FROM Users WHERE id = ?', [id])
    .then(([data]) => res.send(data))
    .catch((error) => res.render(error))
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {name, email, password} = req.body
    const query =
     `UPDATE Users SET
      name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password)
      WHERE id = ?`
    await pool.query(query, [name, email, password, id])
    .then(([data]) => res.send(data))
    .catch((error) => res.render('error', {error}))
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM Users WHERE id = ?', [id])
    .then(([data]) => res.send(data))
    .catch((error) => res.render(error))
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
}