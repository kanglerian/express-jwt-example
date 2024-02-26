const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({
    status: 'success',
    data: users
  });
});

module.exports = router;
