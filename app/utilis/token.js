const jwt = require('jsonwebtoken');
const config = require('./config'); // or process.env.SECRET_KEY


const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  if (!config.secretKey) {
    throw new Error('SECRET_KEY is not defined');
  }
  const token = jwt.sign(payload, config.secretKey, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = generateToken;