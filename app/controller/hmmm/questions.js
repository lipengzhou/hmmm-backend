'use strict'

// 题库 控制器

const Controller = require('egg').Controller

class QuestionsController extends Controller {
  // 列表
  async find() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBQuestions = ctx.service.hmmm.questions
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBQuestions.find(query, sort, page, pagesize)
    ctx.body = result
  }

  // 精选
  async find_choice() {
    const ctx = this.ctx
    const config = this.config
    const query = this.ctx.query
    const DBQuestions = ctx.service.hmmm.questions
    let result = {}

    const sort = query.sort
    const page = query.page === undefined ? 1 : query.page
    const pagesize =
      query.pagesize === undefined ? config.pageList.pagesize : query.pagesize

    result = await DBQuestions.find_choice(query, sort, page, pagesize)
    ctx.body = result
  }

  // 批量导入题
  async batch() {
    const ctx = this.ctx
    ctx.body = {}
  }

  // 添加
  async create() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBQuestions = ctx.service.hmmm.questions
    const reqBody = ctx.request.body
    const reqRule = {
      subjectID: 'integer', // 学科
      catalogID: 'integer', // 目录
      enterpriseID: 'integer', // 企业
      city: 'string', // 城市
      direction: 'string', // 方向
      questionType: 'string', // 题型
      difficulty: 'string', // 难度
      question: 'string', // 题干
      options: 'array', // 选项
      videoURL: 'string', // 解析视频
      answer: 'string', // 答案解析
      remarks: 'string', // 题目备注
      tags: 'string' // 试题标签
    }
    ctx.validate(reqRule)
    reqBody.creatorID = authorization.uid

    const result = await DBQuestions.create(reqBody)
    ctx.body = result
  }

  // 更新
  async update() {
    const ctx = this.ctx
    const DBQuestions = ctx.service.hmmm.questions
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      subjectID: 'integer', // 学科
      catalogID: 'integer', // 目录
      enterpriseID: 'integer', // 企业
      city: 'string', // 城市
      direction: 'string', // 方向
      questionType: 'string', // 题型
      difficulty: 'string', // 难度
      question: 'string', // 题干
      options: 'array', // 选项
      videoURL: 'string', // 解析视频
      answer: 'string', // 答案解析
      remarks: 'string', // 题目备注
      tags: 'string' // 试题标签
    }
    ctx.validate(reqRule)

    const result = await DBQuestions.update(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 删除
  async delete() {
    const ctx = this.ctx
    const DBQuestions = ctx.service.hmmm.questions

    const result = await DBQuestions.delete(ctx.params.id)
    ctx.body = result
  }

  // 详情
  async read() {
    const ctx = this.ctx
    const DBQuestions = ctx.service.hmmm.questions

    const result = await DBQuestions.read(ctx.params.id)
    ctx.body = result
  }

  // 精选题库上下架
  async publish() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBQuestions = ctx.service.hmmm.questions

    const result = await DBQuestions.publish(
      ctx.params.id,
      ctx.params.publish,
      authorization.uid
    )
    ctx.body = result
  }

  // 试题审核
  async check() {
    const ctx = this.ctx
    const authorization = ctx.request.authorization
    const DBQuestions = ctx.service.hmmm.questions
    const reqBody = ctx.request.body
    const reqRule = {
      id: 'integer',
      chkRemarks: 'string', // 审核意见
      chkState: 'integer' // 筛选状态
    }
    ctx.validate(reqRule)
    reqBody.chkUserID = authorization.uid

    const result = await DBQuestions.check(ctx.params.id, reqBody)
    ctx.body = result
  }

  // 试题审核意见列表
  async find_audits() {
    const ctx = this.ctx
    const DBQuestions = ctx.service.hmmm.questions

    const result = await DBQuestions.find_audits(ctx.params.id)
    ctx.body = result
  }

  // 出题记录
  async find_records() {
    const ctx = this.ctx
    const DBQuestions = ctx.service.hmmm.questions

    const result = await DBQuestions.find_records(ctx.params.id)
    ctx.body = result
  }
}

module.exports = QuestionsController
