const crypto = require('crypto');
const User = require('./models/User');

module.exports = async function macAuth(req, res, next) {
  const authId = req.header('X-Auth-Id');
  const timestamp = req.header('X-Auth-Timestamp');
  const signature = req.header('X-Auth-Signature');

  if (!authId || !timestamp || !signature) {
    return res.status(401).json({ error: 'Missing auth headers' });
  }

  console.log(typeof(authId), authId);
  // const user = await User.query().first();
  const user = await User.query().findOne('username', authId);
  console.log(user);
  if (!user) return res.status(401).json({ error: 'User not found' });

  const method = req.method;
  const path = req.originalUrl.split('?')[0];
  const body = req.rawBody || '';

  const message = `${method}\n${path}\n${timestamp}\n${body}`;

  const hmac = crypto.createHmac('sha256', user.mac_key);
  const expectedSignature = hmac.update(message).digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  req.user = user;
  next();
};
