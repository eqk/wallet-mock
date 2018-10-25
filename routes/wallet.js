const express = require('express');
const router = express.Router();

const wallet = require('../controllers/wallet');
// const noti = require('../controllers/notification');

router.get('/currencies', wallet.currencies);
router.post('/create', wallet.create);
router.post('/transaction', wallet.transaction);

// router.post('/notification/transaction', noti.newTransaction);
// router.get('/notification/block', noti.test);

module.exports = router;
