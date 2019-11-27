'use strict'

// 学科 - 二级目录 控制器

const Controller = require('egg').Controller

class SubjectsDirectorysController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBSubjectsDirectorys.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 简单列表
  async simple() {
    const ctx = this.ctx
    const query = this.ctx.query
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys
    let result = {}

    result = await DBSubjectsDirectorys.simple(query.label, query.sort)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys
    const reqBody = ctx.request.body
    const reqRule = {
      subjectID: 'integer',
      directoryName: 'string'
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBSubjectsDirectorys.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      subjectID: 'integer',
      directoryName: 'string'
    }
    ctx.validate(reqRule)

    const result = await DBSubjectsDirectorys.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 更新
  async state() {
    const ctx = this.ctx
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys

    const result = await DBSubjectsDirectorys.state(
      ctx.params.id,
      ctx.params.state
    )
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys

    const result = await DBSubjectsDirectorys.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBSubjectsDirectorys = ctx.service.hmmm.subjectsDirectorys

    const result = await DBSubjectsDirectorys.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = SubjectsDirectorysController
