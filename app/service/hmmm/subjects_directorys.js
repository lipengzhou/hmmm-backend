'use strict'

// 学科-二级目录

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')

class SubjectsDirectorysService extends Service {
  // 列表
  async find(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // directoryName
    if (entity.directoryName !== undefined) {
      parameterWhere.push(
        this.app.mysql.format(
          'dir.directoryName like ?',
          `%${entity.directoryName}%`
        )
      )
    }
    // state
    if (entity.state !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('dir.state = ?', `${entity.state}`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'dir.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_subjects_directorys AS dir
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          dir.id,
          dir.directoryName,
          dir.creatorID,
          dir.addDate,
          dir.totals,
          dir.state,
          sub.subjectName,
          u.username
      FROM
      (
        hm_subjects_directorys AS dir
        LEFT JOIN bs_user AS u
        ON
            dir.creatorID = u.id
        LEFT JOIN hm_subjects AS sub
            ON
                dir.subjectID = sub.id
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
        this.app.mysql.format('directoryName like ?', `%${label}%`)
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
        directoryName as label
      FROM
        hm_subjects_directorys
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
    const result = await this.app.mysql.insert('hm_subjects_directorys', {
      subjectID: entity.subjectID, // 学科ID
      directoryName: entity.directoryName, // 目录名称
      creatorID: entity.creatorID, // 创建者
      addDate: sqlnow, // 创建日期
      totals: 0, // 面试题数量
      state: true // 状态
    })

    const id = result.affectedRows === 1 ? result.insertId : -1
    return { id }
  }

  // 更新
  async update(id, entity) {
    const result = await this.app.mysql.update('hm_subjects_directorys', {
      id, // 编号
      subjectID: entity.subjectID, // 学科ID
      directoryName: entity.directoryName // 目录名称
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 设置状态
  async state(id, state) {
    const result = await this.app.mysql.update('hm_subjects_directorys', {
      id, // 编号
      state: state == '1' // 状态 0 屏蔽 1 开启
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 删除
  async delete(id) {
    const result = await this.app.mysql.delete('hm_subjects_directorys', {
      id
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 详情
  async read(id) {
    const result = await this.app.mysql.get('hm_subjects_directorys', { id })
    return result
  }
}

module.exports = SubjectsDirectorysService
