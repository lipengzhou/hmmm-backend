'use strict'

// 题库

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')
const cuid = require('cuid')

class QuestionsService extends Service {
  // 列表
  async find(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // 	keyword 关键字
    if (entity.keyword !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('q.question like ?', `%${entity.keyword}%`)
      )
    }
    // // subjectID
    // if (entity.subjectID !== undefined) {
    //   parameterWhere.push(
    //     this.app.mysql.format('q.subjectID = ?', `${entity.subjectID}`)
    //   )
    // }
    // // subjectID
    // if (entity.subjectID !== undefined) {
    //   parameterWhere.push(
    //     this.app.mysql.format('q.subjectID = ?', `${entity.subjectID}`)
    //   )
    // }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'q.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_questions AS q
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          q.id,
          q.number,
          q.subjectID,
          q.catalogID,
          q.enterpriseID,
          q.city,
          q.direction,
          q.questionType,
          q.difficulty,
          q.question,
          q.videoURL,
          q.answer,
          q.remarks,
          q.tags,
          q.creatorID,
          q.addDate,
          sub.subjectName AS subject,
          dir.directoryName AS catalog,
          cp.shortName AS enterprise,
          u_creator.username AS creator
      FROM
      (
        hm_questions AS q

        LEFT JOIN hm_subjects AS sub
        ON
            q.subjectID = sub.id

        LEFT JOIN hm_subjects_directorys AS dir
        ON
            q.catalogID = dir.id

        LEFT JOIN hm_companys AS cp
        ON
            q.enterpriseID = cp.id
        
        LEFT JOIN bs_user AS u_creator
        ON
            q.creatorID = u_creator.id
        
      )
      ${strWhere} 
      ${strOrder} 
      LIMIT ${pagesize} 
      OFFSET ${(page - 1) * pagesize} 
    `
    const count = (await this.app.mysql.query(strCountSql))[0].count
    const result = await this.app.mysql.query(strSql)
    return {
      counts: count,
      pagesize,
      pages: Math.ceil(count / pagesize),
      page,
      items: result
    }
  }

  // 精选
  async find_choice(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // 	question
    if (entity.keyword !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('q.question like ?', `%${entity.keyword}%`)
      )
    }
    // // state
    // if (entity.state !== undefined) {
    //   parameterWhere.push(
    //     this.app.mysql.format('q.state = ?', `${entity.state}`)
    //   )
    // }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'q.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_questions AS q
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          q.id,
          q.number,
          q.subjectID,
          q.catalogID,
          q.enterpriseID,
          q.city,
          q.direction,
          q.questionType,
          q.difficulty,
          q.question,
          q.videoURL,
          q.answer,
          q.remarks,
          q.tags,
          q.creatorID,
          q.addDate,
          q.publishState,
          
          q.chkState,
          u_checker.username AS chkUser,
          q.chkRemarks,
          q.chkDate,
          
          sub.subjectName,
          dir.directoryName,
          cp.shortName AS company,
          
          u_creator.username AS creator
      FROM
      (
        hm_questions AS q

        LEFT JOIN hm_subjects AS sub
        ON
            q.subjectID = sub.id

        LEFT JOIN hm_subjects_directorys AS dir
        ON
            q.catalogID = dir.id

        LEFT JOIN hm_companys AS cp
        ON
            q.enterpriseID = cp.id

        LEFT JOIN bs_user AS u_checker
        ON
            q.chkUserID = u_checker.id
        
        LEFT JOIN bs_user AS u_creator
        ON
            q.creatorID = u_creator.id
        
      )
      ${strWhere} 
      ${strOrder} 
      LIMIT ${pagesize} 
      OFFSET ${(page - 1) * pagesize} 
    `
    const count = (await this.app.mysql.query(strCountSql))[0].count
    const result = await this.app.mysql.query(strSql)
    return {
      counts: count,
      pagesize,
      pages: Math.ceil(count / pagesize),
      page,
      items: result
    }
  }

  // 添加
  async create(entity) {
    const ctx = this.ctx
    let question_id = -1
    const sqlnow = this.app.mysql.literals.now

    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1 基础题库
      let resultQuestion = await conn.insert('hm_questions', {
        number: cuid(), // 试题编号
        subjectID: entity.subjectID, // 学科
        catalogID: entity.catalogID, // 目录
        enterpriseID: entity.enterpriseID, // 企业
        province: entity.province, // 省份
        city: entity.city, // 城市
        direction: entity.direction, // 方向
        questionType: entity.questionType, // 题型
        difficulty: entity.difficulty, // 难度
        question: entity.question, // 题干
        videoURL: entity.videoURL, // 解析视频
        answer: entity.answer, // 答案解析
        remarks: entity.remarks, // 题目备注
        tags: entity.tags, // 试题标签
        creatorID: entity.creatorID, // 创建者
        addDate: sqlnow, // 创建日期
        chkState: 0, // 筛选状态 0 待审核 1 通过 2 拒绝
        publishState: 0, // 发布状态 0 待发布 1 已发布 2 已下架
        isChoice: entity.isChoice === undefined ? false : entity.isChoice // 精选题
      })
      question_id = resultQuestion.insertId

      // 2 问题列表
      for (const iterator of entity.options) {
        await conn.insert('hm_questions_options', {
          questionsID: question_id, // 问题ID
          code: iterator.code, // 代码
          title: iterator.title, // 标题
          img: iterator.img, // 图片
          isRight: iterator.isRight // 是否正确答案
        })
      }

      return { success: true }
    }, ctx)

    return {
      id: question_id
    }
  }

  // 更新
  async update(id, entity) {
    const ctx = this.ctx
    const sqlnow = this.app.mysql.literals.now

    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1 基础题库
      let resultQuestion = await conn.update('hm_questions', {
        id,
        subjectID: entity.subjectID, // 学科
        catalogID: entity.catalogID, // 目录
        enterpriseID: entity.enterpriseID, // 企业
        province: entity.province, // 省份
        city: entity.city, // 城市
        direction: entity.direction, // 方向
        questionType: entity.questionType, // 题型
        difficulty: entity.difficulty, // 难度
        question: entity.question, // 题干
        videoURL: entity.videoURL, // 解析视频
        answer: entity.answer, // 答案解析
        remarks: entity.remarks, // 题目备注
        tags: entity.tags // 试题标签
      })

      // 2 问题列表
      await conn.delete('hm_questions_options', { questionsID: id })
      for (const iterator of entity.options) {
        await conn.insert('hm_questions_options', {
          questionsID: id, // 问题ID
          code: iterator.code, // 代码
          title: iterator.title, // 标题
          img: iterator.img, // 图片
          isRight: iterator.isRight // 是否正确答案
        })
      }

      return { success: true, affectedRows: resultQuestion.affectedRows }
    }, ctx)

    const success = result.affectedRows === 1
    return { success }
  }

  // 删除
  async delete(id) {
    const ctx = this.ctx
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1 基础题库
      await this.app.mysql.delete('hm_questions', {
        id
      })
      // 2 基础题库-问题列表
      await this.app.mysql.delete('hm_questions_options', {
        questionsID: id
      })
      // 3 试题审核意见
      await this.app.mysql.delete('hm_questions_audits', {
        questionsID: id
      })
      // 4 试题出题记录
      await this.app.mysql.delete('hm_questions_records', {
        questionsID: id
      })

      return { success: true }
    }, ctx)

    return { success: result.success }
  }

  // 详情
  async read(id) {
    let result = await this.app.mysql.get('hm_questions', { id })
    result.options = await this.app.mysql.select('hm_questions_options', {
      where: { questionsID: id }
    })
    // result.audits = await this.app.mysql.get('hm_questions_audits', { questionsID: id })
    // result.records = await this.app.mysql.get('hm_questions_records', { questionsID: id })
    return result
  }

  // 精选题库上下架
  async publish(id, publishState, setterID) {
    const ctx = this.ctx
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1 基础题库
      await this.app.mysql.update('hm_questions', {
        id,
        publishState,
        publishDate: sqlnow
      })
      // 2 试题出题记录
      await this.app.mysql.insert('hm_questions_records', {
        questionsID: id,
        operation: publishState === '1' ? '上架' : '下架',
        setTime: sqlnow,
        setterID
      })

      return { success: true }
    }, ctx)

    return { success: result.success }
  }

  // 试题审核
  async check(id, entity) {
    const ctx = this.ctx
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1 基础题库
      await this.app.mysql.update('hm_questions', {
        id,
        chkState: entity.chkState,
        chkUserID: entity.chkUserID,
        chkRemarks: entity.chkRemarks,
        chkDate: sqlnow
      })
      // 2 试题审核意见
      await this.app.mysql.insert('hm_questions_audits', {
        questionsID: id,
        remarks: entity.chkRemarks,
        operation: entity.chkState === 1 ? '通过' : '拒绝',
        chkTime: sqlnow,
        checkerID: entity.chkUserID
      })

      return { success: true }
    }, ctx)

    return { success: result.success }
  }

  // 试题审核意见列表
  async find_audits(id) {
    // WHERE
    let parameterWhere = []
    // tagName
    if (id !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('audit.questionsID = ?', `${id}`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let sort = 'audit.id desc'
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 分页数据
    const strSql = `
        SELECT
            audit.id,
            audit.questionsID,
            audit.remarks,
            audit.operation,
            audit.chkTime,
            audit.checkerID,
            user.username AS checker
        FROM
        (
          hm_questions_audits AS audit
          
          LEFT JOIN bs_user AS user
          ON
            audit.checkerID = user.id
        )
        ${strWhere} 
        ${strOrder} 
      `
    const result = await this.app.mysql.query(strSql)
    return result
  }

  // 出题记录
  async find_records(id) {
    // WHERE
    let parameterWhere = []
    // tagName
    if (id !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('record.questionsID = ?', `${id}`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let sort = 'record.id desc'
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 分页数据
    const strSql = `
        SELECT
          record.id,
          record.questionsID,
          record.operation,
          record.setTime,
          record.setterID,
          user.username AS setter
        FROM
        (
          hm_questions_records AS record
          
          LEFT JOIN bs_user AS user
          ON
            record.setterID = user.id
        )
        ${strWhere} 
        ${strOrder} 
      `
    const result = await this.app.mysql.query(strSql)
    return result
  }
}

module.exports = QuestionsService
