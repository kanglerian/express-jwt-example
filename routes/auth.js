require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED, JWT_REFRESH_TOKEN_EXPIRED } = process.env;

const { User, RefreshToken } = require('../models');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ user }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });
  
    await RefreshToken.create({
      user_id: user.id,
      token: refreshToken
    });
  
    return res.status(200).json({
      status: 'success',
      data: {
        token,
        refresh_token: refreshToken
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    await User.create(req.body);
    return res.status(200).json({
      message: 'Berhasil mendaftar!'
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/token', async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if(!refreshToken || !email){
      return res.status(400).json({
        status: 'error',
        message: 'invalid token'
      });
    }

    const refresh = RefreshToken.findOne({
      where: {
        token: refreshToken
      }
    });

    if(!refresh){
      return res.status(400).json({
        status: 'error'
      });
    }

    jwt.verify(2);

  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
