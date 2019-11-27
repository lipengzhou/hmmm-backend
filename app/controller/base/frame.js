'use strict'

// 后台管理 控制器

const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller

class FrameController extends Controller {
  // 用户登录
  async login() {
    const ctx = this.ctx
    const config = this.config
    const loginRule = {
      username: 'string',
      password: 'string'
    }
    ctx.validate(loginRule)
    let result = {}

    const username = ctx.request.body.username
    const password = ctx.request.body.password

    const user = await ctx.service.base.frame.findByEmail(username)

    if (user) {
      if (user.password !== password) {
        result = {
          code: 20001,
          error: '用户登录失败,用户名或密码错误'
        }
        ctx.status = 401
      } else if (user.status === 1) {
        result = {
          code: 20002,
          error: '用户登录失败, 账号被禁用'
        }
        ctx.status = 403
      } else {
        result = {
          token: jwt.sign({ uid: user.id }, config.jwt.jwtSecret, {
            expiresIn: config.jwt.jwtExpire
          })
        }
      }
    } else {
      result = {
        code: 20000,
        error: '用户不存在'
      }
      ctx.status = 401
    }

    ctx.body = result
  }
  // 用户信息
  async profile() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    let result = {}

    const user = await ctx.service.base.frame.findById(authorization.uid)
    if (!user) {
      throw new Error('用户信息获取失败')
    }
    const menus = await ctx.service.base.permissions.findPermissionsMenusByGroupId(
      user.permission_group_id
    )
    const points = await ctx.service.base.permissions.findPermissionsPointsByGroupId(
      user.permission_group_id
    )
    await ctx.service.base.frame.updateLastTimeById(authorization.uid)

    // 返回所有 menus points
    const menuTrees = await ctx.service.base.menus.find()
    let allRolesSets = new Set()
    function getPermissionNodes(nodes, role) {
      for (const it of nodes) {
        let isFind = false
        if (it.childs !== undefined) {
          isFind = getPermissionNodes(it.childs, role)
        } else if (it.points !== undefined) {
          isFind = getPermissionNodes(it.points, role)
        }
        if (
          it.code !== undefined &&
          it.code.toLowerCase() === role.toLowerCase()
        ) {
          isFind = true
        }
        if (isFind) {
          allRolesSets.add(it.code)
          return true
        }
      }
      return false
    }
    for (const role of menus) {
      getPermissionNodes(menuTrees, role.code)
    }
    for (const role of points) {
      getPermissionNodes(menuTrees, role.code)
    }

    result = {
      name: user.username,
      avatar: user.avatar,
      introduction: user.introduction,
      role: [user.role],
      roles: {
        menus: Array.from(allRolesSets),
        points: points.map(item => {
          return item.code
        })
      }
    }

    ctx.body = result
  }
  // 修改密码
  async passwd() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization

    const passwdRule = {
      oldpasswd: 'string',
      newpasswd: 'string'
    }
    ctx.validate(passwdRule)

    let result = {}

    const oldpasswd = ctx.request.body.oldpasswd
    const newpasswd = ctx.request.body.newpasswd

    const user = await ctx.service.base.frame.findById(authorization.uid)
    if (!user) {
      throw new Error('用户信息获取失败')
    }
    if (user.password !== oldpasswd) {
      throw new Error('原始密码错误')
    }
    await ctx.service.base.frame.updatePassword(authorization.uid, newpasswd)

    result = {}

    ctx.body = result
  }
  // 用户注销
  async logout() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    let result = {}

    // TODO: 用户注销清理工作, 暂时放空

    result = {}

    ctx.body = result
  }
}

module.exports = FrameController
