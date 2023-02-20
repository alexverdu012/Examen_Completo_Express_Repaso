const pool = require('../database')

const getPets = async (req, res) => {
    await pool.query('SELECT * FROM Mascota WHERE user_id = ?', [req.user.id])
    .then(([data]) => {
        res.render('mascotas', {"mascotas": data})
    })

}
const createPet = async (req, res) => {
    const {type, name} = req.body
    await pool.query('INSERT INTO Mascota (type, name, user_id) VALUES (?,?,?)', [type, name, req.user.id])
    .then(() => res.redirect('/api/pets'))
}

const deletePets = async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM Mascota WHERE id = ?', [id])
    .then(() => {
        res.redirect('/api/pets')
    })
}

const editPets = async (req, res) => {
    const { id } = req.params
    await pool.query('SELECT * FROM Mascota WHERE id = ?', [id])
    .then(([data]) => {
        console.log(data)
        res.render('editpet', {'pet': data[0]})
    })

}

const editPet = async (req, res) => {
    const {id} = req.params
    const {name, type} = req.body
    const newPet = {
        name,
        type
    }
    const query = `UPDATE Mascota SET ? WHERE id = ?`
    await pool.query(query, [newPet, id])
    .then(() => res.redirect('/api/pets'))
}

module.exports = {
    getPets,
    createPet,
    deletePets,
    editPets,
    editPet
}