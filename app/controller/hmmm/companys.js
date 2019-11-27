'use strict'

// 企业管理 控制器

const Controller = require('egg').Controller

class CompanysController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBCompanys = ctx.service.hmmm.companys
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBCompanys.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query
    const DBCompanys = ctx.service.hmmm.companys
    let result = {}

    result = await DBCompanys.simple(query.label, query.sort)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBCompanys = ctx.service.hmmm.companys
    const reqBody = ctx.request.body
    const reqRule = {
      isFamous: 'bool',
      shortName: 'string',
      company: 'string',
      province: 'string',
      city: 'string',
      tags: 'string',
      remarks: 'string'
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBCompanys.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBCompanys = ctx.service.hmmm.companys
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      isFamous: 'bool',
      shortName: 'string',
      company: 'string',
      province: 'string',
      city: 'string',
      tags: 'string',
      remarks: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBCompanys.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 更新
  async state() {
    const ctx = this.ctx
    const DBCompanys = ctx.service.hmmm.companys

    const result = await DBCompanys.state(ctx.params.id, ctx.params.state)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBCompanys = ctx.service.hmmm.companys

    const result = await DBCompanys.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBCompanys = ctx.service.hmmm.companys

    const result = await DBCompanys.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = CompanysController
