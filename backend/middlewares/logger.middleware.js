const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

async function log(req, res, next) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (loggedinUser && loggedinUser.fullname) {
    logger.info('Req from: ' + loggedinUser.fullname)
  }
  next()
}

module.exports = {
  log
}
