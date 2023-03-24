const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../errors")

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication invalid")
  }
  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userId: decoded.userId, name: decoded.name }
    next()
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid")
  }
}

module.exports = auth
