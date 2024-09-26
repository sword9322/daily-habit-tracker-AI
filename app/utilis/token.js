const jwt = require('jsonwebtoken');
const config = require('./config'); // or process.env.SECRET_KEY


const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, config.secretKey, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = generateToken;