'use strict'

// 文章 控制器

const Controller = require('egg').Controller

class ArticlesController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBArticles = ctx.service.hmmm.articles
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBArticles.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBArticles = ctx.service.hmmm.articles
    const reqBody = ctx.request.body
    const reqRule = {
      title: 'string', // 标题
      articleBody: 'string', // 文章正文
      videoURL: 'string' // 视频地址
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBArticles.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBArticles = ctx.service.hmmm.articles
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      title: 'string', // 标题
      articleBody: 'string', // 文章正文
      videoURL: 'string' // 视频地址
    }
    ctx.validate(reqRule)

    const result = await DBArticles.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 更新
  async state() {
    const ctx = this.ctx
    const DBArticles = ctx.service.hmmm.articles

    const result = await DBArticles.state(ctx.params.id, ctx.params.state)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBArticles = ctx.service.hmmm.articles

    const result = await DBArticles.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBArticles = ctx.service.hmmm.articles

    const result = await DBArticles.read(ctx.params.id)
    ctx.body = result
  }
}

module.exports = ArticlesController
