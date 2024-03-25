
// const generateToken= async (userEmail) => {
//     const token = jwt.sign({userEmail},"key")
//     return token;
// }

const jwt = require('jsonwebtoken');
console.log('tokenService.js');
const generateToken = async (userEmail) => {
  const token = jwt.sign({ userEmail }, "your_secret_key");
  return token;
};

module.exports = {
  generateToken
};
