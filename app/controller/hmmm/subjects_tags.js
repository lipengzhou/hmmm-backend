'use strict'

// 学科 - 标签 控制器

const Controller = require('egg').Controller

class SubjectsTagsController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBSubjectsTags.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags
    let result = {}

    result = await DBSubjectsTags.simple(query.label, query.sort)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags
    const reqBody = ctx.request.body
    const reqRule = {
      subjectID: 'integer',
      tagName: 'string'
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBSubjectsTags.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      subjectID: 'integer',
      tagName: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBSubjectsTags.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 更新
  async state() {
    const ctx = this.ctx
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags

    const result = await DBSubjectsTags.state(ctx.params.id, ctx.params.state)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags

    const result = await DBSubjectsTags.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBSubjectsTags = ctx.service.hmmm.subjectsTags

    const result = await DBSubjectsTags.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = SubjectsTagsController
