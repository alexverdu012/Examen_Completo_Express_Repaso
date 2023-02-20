var {Router} = require('express');
var router = Router();
const { isLoggedIn} = require('../lib/auth')
const { getPets, createPet, deletePets, editPets, editPet } = require('../controller/pets.controller')

router.post('/', isLoggedIn, createPet)
router.get('/', isLoggedIn, getPets)
router.get('/delete/:id', isLoggedIn, deletePets)
router.get('/edit/:id', isLoggedIn, editPets)
router.post('/edit/:id', isLoggedIn, editPet)


module.exports = router