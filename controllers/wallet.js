const crypto = require('crypto');
const bitcoin = require('bitcoinjs-lib');

exports.currencies = (req, res) => {
    console.log('body', req.body);
    console.log('query', req.query);
    res.status(200).json(['ETH', 'BTC']);
};

exports.create = (req, res) => {
    const currencyCode = req.body.currency_id;
    switch (currencyCode) {
        case 'ETH':
            crypto.randomBytes(20, (err, buf) => {
                if (err) throw err;
                else {
                    const newAddr = '0x' + buf.toString('hex').toUpperCase();
                    res.status(200).json({address: newAddr});
                }
            });
            break;
        case 'BTC':
            const buf = new Buffer(32);
            crypto.randomFillSync(buf);
            const rng = () => {return buf};
            const keyPair = bitcoin.ECPair.makeRandom({rng: rng});
            const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
            res.status(200).json({address: address});
            break;
        default:
            res.status(404).end('');
            break;
    }
};

exports.transaction = (req, res) => {
    const currencyCode = req.body.currency_code;
    switch (currencyCode) {
        case 'ETH':
            crypto.randomBytes(32, (err, buf) => {
                if (err) throw err;
                else {
                    const newAddr = '0x' + buf.toString('hex');
                    res.status(200).json({txid: newAddr});
                }
            });
            break;
        case 'BTC':
            const buf = new Buffer(32);
            crypto.randomFillSync(buf);
            const rng = () => {return buf};
            const alice = bitcoin.ECPair.makeRandom({rng: rng});
            const txb = new bitcoin.TransactionBuilder();

            txb.setVersion(1);
            txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0);
            txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000);

            txb.sign(0, alice);
            res.status(200).json({txid: txb.build().getId()});
            break;
        default:
            res.status(404).end('');
            break;
    }
};