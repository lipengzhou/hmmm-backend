'use strict'

// 权限组管理 控制器

const Controller = require('egg').Controller

class PermissionGroupController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query;
    const DBPermissionGroup = ctx.service.base.permissionGroup
    let result = {}

    const title = query.title
    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize = query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBPermissionGroup.find(
      title,
      sort,
      page,
      pagesize
    )
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query;
    const DBPermissionGroup = ctx.service.base.permissionGroup
    let result = {}

    const title = query.title
    const sort = query.sort

    result = await DBPermissionGroup.simple(
      title,
      sort
    )
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const DBPermissionGroup = ctx.service.base.permissionGroup
    const reqBody = ctx.request.body
    const reqRule = {
      title: 'string',
      permissions: 'array'
    }
    ctx.validate(reqRule)

    const result = await DBPermissionGroup.create(reqBody.title, reqBody.permissions)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBPermissionGroup = ctx.service.base.permissionGroup
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      title: 'string',
      permissions: 'array'
    }
    ctx.validate(reqRule)

    const result = await DBPermissionGroup.update(reqBody.id, reqBody.title, reqBody.permissions)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBPermissionGroup = ctx.service.base.permissionGroup

    const result = await DBPermissionGroup.delete(ctx.params.id)
    ctx.body = result
  }
  
  // 详情
  async read() {
    const ctx = this.ctx
    const DBPermissionGroup = ctx.service.base.permissionGroup

    const result = await DBPermissionGroup.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = PermissionGroupController
