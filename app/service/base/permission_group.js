'use strict'

// 权限组管理

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')
// var mysql = require('mysql')

class PermissionGroupService extends Service {

  // 列表
  async find(title, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    if (title !== undefined) {
      parameterWhere.push(this.app.this.app.mysql.format('title like ?', `%${title}%`))
    }
    let strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    let strCountSql = `
      SELECT
          count(*) as count
      FROM
        pe_permission_group
      ${strWhere}
    `

    // 分页数据
    let strSql = `
      SELECT
          id,
          name as title,
          create_time as create_date,
          update_time as update_date
      FROM
        pe_permission_group
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
      list: result
    }
  }

  // 简单列表
  async simple(title, sort) {
    // WHERE
    let parameterWhere = []
    if (title !== undefined) {
      parameterWhere.push(this.app.this.app.mysql.format('title like ?', `%${title}%`))
    }
    let strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let strOrder = SqlUtil.getSqlStringOrder(sort)

    // sql
    let strSql = `
      SELECT
        id,
        name as title
      FROM
        pe_permission_group
      ${strWhere} 
      ${strOrder} 
      LIMIT 50 
      OFFSET 0
    `

    const result = await this.app.mysql.query(strSql)
    return result
  }

  // 添加
  async create(title, permissions) {
    const ctx = this.ctx
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1
      let resultPG = await conn.insert('pe_permission_group', {
        name: title,
        create_time: sqlnow,
        update_time: sqlnow
      })
      let pgid = resultPG.insertId
      // 2
      let parameterValues = []
      for (let pid of permissions) {
        parameterValues.push(this.app.mysql.format('(? , ?)', [pgid, pid]))
      }
      let sqlValues = parameterValues.join(' , ')
      let strSql = `
        INSERT INTO 
          a_permission_permission_group (pgid, pid) 
        VALUES 
          ${sqlValues}
      `
      await conn.query(strSql)
      return {success: true}
    }, ctx)

    // const bs_user_id = result.affectedRows === 1 ? result.insertId : -1
    return {}
  }

  // 更新
  async update(id, title, permissions) {
    const ctx = this.ctx
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1
      await conn.update('pe_permission_group', {
        id,
        name: title,
        update_time: sqlnow
      })
      // 2
      let pgid = id
      await conn.delete('a_permission_permission_group', {
        pgid
      })
      // 3
      let parameterValues = []
      for (let pid of permissions) {
        if (pid <= 0) {
          continue
        }
        parameterValues.push(this.app.mysql.format('(? , ?)', [pgid, pid]))
      }
      let sqlValues = parameterValues.join(' , ')
      let strSql = `
        INSERT INTO 
          a_permission_permission_group (pgid, pid) 
        VALUES 
          ${sqlValues}
      `
      await conn.query(strSql)
      return {success: true}
    }, ctx)

    // const bs_user_id = result.affectedRows === 1 ? result.insertId : -1
    return {}
  }

  // 删除
  async delete(id) {
    const ctx = this.ctx
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1
      await conn.delete('a_permission_permission_group', {
        pgid: id
      })
      // 2
      await conn.delete('pe_permission_group', {id})
      return {success: true}
    }, ctx)

    // const isok = result.affectedRows === 1
    return {}
  }

  // 详情
  async read(id) {
    const result = await this.app.mysql.get('pe_permission_group', {id})
    const permissions = (await this.app.mysql.select(
      'a_permission_permission_group',
      {
        where: {pgid: id},
        columns: ['pid']
      }
    )).map(it => {
      return it.pid
    })
    return {
      id: result.id,
      title: result.name,
      permissions,
      create_date: result.create_time
    }
  }
}

module.exports = PermissionGroupService
