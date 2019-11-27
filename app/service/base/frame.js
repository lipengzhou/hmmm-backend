'use strict'

// 用户框架

const Service = require('egg').Service

class FrameService extends Service {
  // 用户信息 by uid
  async findById(uid) {
    const user = await this.app.mysql.get('bs_user', {id: uid})
    return user
  }
  // 用户信息 by email
  async findByEmail(email) {
    const user = await this.app.mysql.get('bs_user', {email: email})
    return user
  }
  // 授权用户的 菜单、权限点
  async findUserPermissions(email) {
    const user = await this.app.mysql.get('bs_user', {email: email})
    return user
  }
  // 更新用户 last_update_time
  async updateLastTimeById(uid) {
    const row = {
      id : uid,
      last_update_time: this.app.mysql.literals.now
    }
    const result = await this.app.mysql.update('bs_user', row)
    return result
  }
  // 更新用户 password
  async updatePassword(uid, newpasswd) {
    const row = {
      id : uid,
      password: newpasswd
    }
    const result = await this.app.mysql.update('bs_user', row)
    return result
  }
}

module.exports = FrameService
