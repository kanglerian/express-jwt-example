require('dotenv').config();
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

router.get('/:id', async (req, res) => {
  const users = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  return res.status(200).json({
    status: 'success',
    data: users
  });
});

router.patch('/:id', async (req, res) => {
    let data = {
      identity: req.body.identity,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
    }

    await User.update(data, {
      where: {
        id: req.user.data.id,
      }
    });
  
    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengubah data!'
    });
});

module.exports = router;
