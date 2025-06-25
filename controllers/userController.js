const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerSchema } = require('../validators/userValidator');
const { userRepository, walletRepository } = require('../repositories');

exports.getProfile = async (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  });
};

exports.register = async (req, res) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.details.map(d => d.message)
    });
  }

  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user  = await userRepository.create({
      username,
      password: hash
    });

    const wallet = await walletRepository.create({
      user_id: user.id,
      saldo: 0
    });

    res.status(201).json({ username: user.username});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.uuid, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ id: user.uuid, username: user.username, token });
};
