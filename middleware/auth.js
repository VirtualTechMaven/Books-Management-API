const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers['x-access-token'];
    if (!header) return res.status(401).json({ message: 'No token provided' });

    // header might be "Bearer <token>" or just "Bearer <token>"
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.sub).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

//authorize for roles 
exports.authorize = (roles = []) => (req, res, next) => {
  if (!Array.isArray(roles)) roles = [roles];
  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
