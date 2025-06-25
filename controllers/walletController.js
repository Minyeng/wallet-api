const { User, Wallet, Transaction } = require('../models');
const { increaseSaldoSchema } = require('../validators/walletValidator');

const walletRepository = require('../repositories/walletRepository');

exports.getWallet = async (req, res) => {
  const wallet = await Wallet.query().findOne('user_id', req.user.id);

  res.json({
    username: req.user.username,
    saldo: wallet.saldo
  });
};

exports.topUp = async (req, res) => {
  const { error, value } = increaseSaldoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    });
  }

  try {
    const transaction = await Transaction.query().insert({
      user_id: req.user.id
    });
    
    const wallet = await walletRepository.increaseSaldoByUserId(req.user.id, value.amount);
    
    res.status(201).json({ message: `Success`});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};


exports.deduct = async (req, res) => {
  const { error, value } = increaseSaldoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => d.message)
    });
  }

  try {
    const transaction = await Transaction.query().insert({
      user_id: req.user.id
    });
    
    const wallet = await walletRepository.increaseSaldoByUserId(req.user.id, -1*value.amount);
    
    res.status(201).json({ message: `Success`});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};
