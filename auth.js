const jwt = require('jsonwebtoken');
const User = require('./models/User');

require('dotenv').config();
module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.query().where('uuid', decoded.id).first();

        req.user = {
            id: user.id,
            uuid: user.uuid,
            username: user.username
        }
        next();
    } catch (err) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
};