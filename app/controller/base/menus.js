'use strict'

// 菜单管理 控制器

const Controller = require('egg').Controller

class MenusController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const DBMenus = ctx.service.base.menus
    let result = await DBMenus.find()
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const DBMenus = ctx.service.base.menus
    const reqBody = ctx.request.body
    const reqRule = {
      is_point: 'bool',
      code: 'string',
      title: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBMenus.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBMenus = ctx.service.base.menus
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      is_point: 'bool',
      code: 'string',
      title: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBMenus.update(reqBody)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBMenus = ctx.service.base.menus

    const result = await DBMenus.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBMenus = ctx.service.base.menus

    const result = await DBMenus.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = MenusController
