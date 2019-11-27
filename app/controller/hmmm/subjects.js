'use strict'

// 学科管理 控制器

const Controller = require('egg').Controller

class SubjectsController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBSubjects = ctx.service.hmmm.subjects
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBSubjects.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query
    const DBSubjects = ctx.service.hmmm.subjects
    let result = {}

    result = await DBSubjects.simple(query.label, query.sort)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBSubjects = ctx.service.hmmm.subjects
    const reqBody = ctx.request.body
    const reqRule = {
      subjectName: 'string'
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBSubjects.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBSubjects = ctx.service.hmmm.subjects
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      subjectName: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBSubjects.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 更新
  async state() {
    const ctx = this.ctx
    const DBSubjects = ctx.service.hmmm.subjects

    const result = await DBSubjects.state(ctx.params.id, ctx.params.state)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBSubjects = ctx.service.hmmm.subjects

    const result = await DBSubjects.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBSubjects = ctx.service.hmmm.subjects

    const result = await DBSubjects.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = SubjectsController
