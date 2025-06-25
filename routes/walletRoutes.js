const express = require('express');
const router = express.Router();
const auth = require('../auth');
const walletController = require('../controllers/walletController');

router.get('/', auth, walletController.getWallet);
router.put('/topup', auth, walletController.topUp);
router.put('/deduct', auth, walletController.deduct);

module.exports = router;
