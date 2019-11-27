'use strict'

// 用户管理 控制器

const Controller = require('egg').Controller
const shajs = require('sha.js')

class UsersController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBUsers = ctx.service.base.users
    let result = {}

    const id = query.id
    const username = query.username
    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBUsers.find(id, username, sort, page, pagesize)
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query
    const DBUsers = ctx.service.base.users
    let result = {}

    const username = query.username
    const sort = query.sort

    result = await DBUsers.simple(username, sort)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const DBUsers = ctx.service.base.users
    const reqBody = ctx.request.body
    const reqRule = {
      username: 'string',
      password: 'string',
      permission_group_id: 'integer'
    }
    ctx.validate(reqRule)

    reqBody.password = shajs('sha256')
      .update(reqBody.password)
      .digest('hex')

    const result = await DBUsers.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBUsers = ctx.service.base.users
    const reqBody = ctx.request.body
    const reqRule = {
      username: 'string',
      permission_group_id: 'integer'
    }
    ctx.validate(reqRule)

    reqBody.id = ctx.params.id
    if (reqBody.password !== undefined) {
      reqBody.password = shajs('sha256')
        .update(reqBody.password)
        .digest('hex')
    }

    const result = await DBUsers.update(reqBody)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBUsers = ctx.service.base.users

    const result = await DBUsers.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBUsers = ctx.service.base.users

    const result = await DBUsers.read(ctx.params.id)
    delete result.password
    ctx.body = result
  }
}

module.exports = UsersController
