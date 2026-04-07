// user authentication middleware

const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({
        success: "false",
        mesaage: "Not authorized please login again",
      });
    }

    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
};

module.exports = authUser;
