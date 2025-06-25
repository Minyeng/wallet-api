const { User, Wallet, Transaction } = require('../models');
const { increaseSaldoSchema } = require('../validators/walletValidator');

const { walletRepository, transactionRepository } = require('../repositories');

exports.getWallet = async (req, res) => {
  const wallet = await Wallet.query().findOne('user_id', req.user.id);

  res.json({
    username: req.user.username,
    saldo: wallet.saldo
  });
};

exports.topUp = async (req, res) => {
  try {
    await increaseSaldoSchema.validateAsync({ ...req.body, user_id: req.user.id}, { abortEarly: false });
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.details.map(d => d.message)
    });
  }

  try {
    const transaction = await transactionRepository.create({
      user_id: req.user.id,
      amount: req.body.amount
    });
    
    const wallet = await walletRepository.increaseSaldoByUserId(req.user.id, req.body.amount);
    
    res.status(201).json({ message: `Success`});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};


exports.deduct = async (req, res) => {
  try {
    await increaseSaldoSchema.validateAsync({ amount: -1*req.body.amount, user_id: req.user.id}, { abortEarly: false });
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.details.map(d => d.message)
    });
  }

  try {
    const transaction = await transactionRepository.create({
      user_id: req.user.id,
      amount: -1*req.body.amount
    });
    
    const wallet = await walletRepository.increaseSaldoByUserId(req.user.id, -1*req.body.amount);
    
    res.status(201).json({ message: `Success`});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};
