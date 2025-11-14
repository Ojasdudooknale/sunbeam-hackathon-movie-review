const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const config = require('../utils/config')

function authorization(req, res, next) {
  if (req.url == '/user/register' || req.url == '/user/login') next()
  else {
    const token = req.headers.token
    if (token) {
      try {
        const payload = jwt.verify(token, config.secret)
        
        //view payload in console
        console.log('JWT Payload:', payload); 
        
        req.headers.userId = payload.uid
        req.userId = payload.uid
        next()
      } catch (e) {
        res.send(result.createResult('Invalid Token'))
      }
    } else res.send(result.createResult('Token is Missing'))
  }
}

module.exports = authorization
