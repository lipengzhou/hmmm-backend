'use strict'

// 学科

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')

class SubjectsService extends Service {
  // 列表
  async find(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // subjectName
    if (entity.subjectName !== undefined) {
      parameterWhere.push(
        this.app.mysql.format(
          'sub.subjectName like ?',
          `%${entity.subjectName}%`
        )
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'sub.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_subjects AS sub
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          sub.id,
          sub.subjectName,
          sub.creatorID,
          sub.addDate,
          sub.isFrontDisplay,
          sub.tags,
          sub.totals,
          sub.twoLevelDirectory,
          u.username
      FROM
      (
        hm_subjects AS sub
        LEFT JOIN bs_user AS u
        ON
            sub.creatorID = u.id
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

  // 简单列表
  async simple(label, sort) {
    // WHERE
    let parameterWhere = []
    if (label !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('subjectName like ?', `%${label}%`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // sql
    const strSql = `
      SELECT
        id as value,
        subjectName as label
      FROM
        hm_subjects
      ${strWhere} 
      ${strOrder} 
      LIMIT 50 
      OFFSET 0
    `

    const result = await this.app.mysql.query(strSql)
    return result
  }

  // 添加
  async create(entity) {
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.insert('hm_subjects', {
      subjectName: entity.subjectName, // 学科名称
      creatorID: entity.creatorID, // 创建者
      addDate: sqlnow, // 创建日期
      isFrontDisplay: entity.isFrontDisplay, // 前台是否显示
      twoLevelDirectory: 0, // 二级目录
      tags: 0, // 标签
      totals: 0 // 题目数量
    })

    const id = result.affectedRows === 1 ? result.insertId : -1
    return { id }
  }

  // 更新
  async update(id, entity) {
    const result = await this.app.mysql.update('hm_subjects', {
      id, // 编号
      subjectName: entity.subjectName, // 学科名称
      isFrontDisplay: entity.isFrontDisplay // 前台是否显示
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 设置状态
  async state(id, state) {
    const result = await this.app.mysql.update('hm_subjects', {
      id, // 编号
      state: state == '1' // 状态 0 屏蔽 1 开启
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 删除
  async delete(id) {
    const result = await this.app.mysql.delete('hm_subjects', {
      id
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 详情
  async read(id) {
    const result = await this.app.mysql.get('hm_subjects', { id })
    return result
  }
}

module.exports = SubjectsService
