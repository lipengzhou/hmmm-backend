'use strict'

const jwt = require('jsonwebtoken')

module.exports = options => {
  return async function authorization(ctx, next) {
    const body = ctx.request.body
    const cfgJWT = ctx.app.config.jwt
    const path = ctx.request.path
    let findWhiteList = options.whiteList.filter(item => {
      return item === path
    })
    if (findWhiteList.length === 0) {
      let token = ctx.request.header[options.tokenHeaderKey.toLowerCase()]
      if (token === undefined) {
        ctx.body = {
          code: 40000,
          error: '令牌为空，请登陆获取！'
        }
        ctx.status = 401
        return
      }
      token = token.replace(`${options.authorizationPre} `, '')
      try {
        let decoded = jwt.verify(token, cfgJWT.jwtSecret, {
          expiresIn: cfgJWT.jwtExpire
        })
        ctx.request.authorization = decoded
      } catch (err) {
        ctx.body = {
          code: 40001,
          error: '访问令牌鉴权无效，请重新登陆获取！'
        }
        ctx.status = 401
      }
      if (ctx.request.authorization) {
        await next()
      } else {
        ctx.body = {
          code: 40001,
          error: '访问令牌鉴权无效，请重新登陆获取！'
        }
        ctx.status = 401
      }
    } else {
      await next()
    }
  }
}
