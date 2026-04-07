const jwt = require("jsonwebtoken");

// API for doctor authentication
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const token_decode = await jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body = req.body || {};
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = authDoctor;
