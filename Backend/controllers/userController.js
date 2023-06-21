const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  try {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error('User already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error('User data is not valid');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: '15m' }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error('email or password is not valid');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
