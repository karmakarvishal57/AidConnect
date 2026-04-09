// admin authentication middleware

const jwt = require('jsonwebtoken');

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: 'false',
        mesaage: 'Not authorized please login again',
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: 'false',
        message: 'Not authorized please login again',
      });
    }

    next();
  } catch (error) {
    return res.json({ success: 'false', message: error.message });
  }
};

module.exports = authAdmin;
