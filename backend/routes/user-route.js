const express = require('express');

const {
  getusers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
} = require('../controllers/user-controllers');

const router = express.Router();

router.get('/', getusers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.patch('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
