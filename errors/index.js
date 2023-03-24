const UnauthorizedError = require("./unauthorized")
const BadRequestError = require("./bad-request")
const NotFoundError = require("./not-found")
const CustomAPIError = require("./custom-error")

module.exports = {
  UnauthorizedError,
  BadRequestError,
  CustomAPIError,
  NotFoundError,
}
