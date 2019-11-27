'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531294897162_6726'

  // cluster
  config.cluster = {
    listen: {
      port: 7001
      // hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    }
  }

  // csrf
  config.security = {
    csrf: {
      ignore: () => true
    }
  }

  // jwt
  config.jwt = {
    jwtSecret: '3d990d2276917dfac04467df11fff26d',
    jwtExpire: '360 days'
  }

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // middleware
  config.middleware = ['errorHandler', 'authorization']

  // jwt 认证
  config.authorization = {
    whiteList: ['/frame/login'],
    tokenHeaderKey: 'Authorization',
    authorizationPre: 'Bearer'
  }

  // 错误检查
  // config.errorHandler = {
  //   match: '/api'
  // }

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: process.env.DATABASE_HOST || '127.0.0.1',
      // 端口号
      port: process.env.DATABASE_PORT || '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: process.env.DATABASE_DB || 'mianmian'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }

  // 分页
  config.pageList = {
    pagesize: 10
  }

  // bodyParser
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb'
  }

  return config
}
