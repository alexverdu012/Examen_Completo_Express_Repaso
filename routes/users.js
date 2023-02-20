const express = require('express');
const router = express.Router();
const { getUser, postUser, getUsers, deleteUser, updateUser } = require('../controller/user.controller')


router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', postUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;
