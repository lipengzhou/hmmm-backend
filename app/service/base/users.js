'use strict'

// 用户管理

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')
// var mysql = require('mysql')

class UsersService extends Service {
  // 列表
  async find(id, username, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    if (id !== undefined) {
      parameterWhere.push(this.app.mysql.format('u.id = ?', id))
    }
    if (username !== undefined) {
      parameterWhere.push(this.app.mysql.format('u.username like ?', `%${username}%`))
    }
    let strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    let strCountSql = `
      SELECT
          count(*) as count
      FROM
          (
              bs_user AS u
          LEFT JOIN pe_permission_group AS pg
          ON
              u.permission_group_id = pg.id
          )
      ${strWhere}
    `

    // 分页数据
    let strSql = `
      SELECT
          u.id,
          u.email,
          u.phone,
          u.username,
          u.role,
          u.permission_group_id,
          pg.name AS permission_group_title,
          u.avatar,
          u.introduction,
          u.create_time,
          u.last_update_time,
          u.status AS is_deleted
      FROM
          (
              bs_user AS u
          LEFT JOIN pe_permission_group AS pg
          ON
              u.permission_group_id = pg.id
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
      list: result
    }
  }

  // 简单列表
  async simple(username, sort) {
    // WHERE
    let parameterWhere = []
    if (username !== undefined) {
      parameterWhere.push(this.app.mysql.format('u.username like ?', `%${username}%`))
    }
    let strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    let strOrder = SqlUtil.getSqlStringOrder(sort)

    // sql
    let strSql = `
      SELECT
          u.id,
          u.email,
          u.phone,
          u.username
      FROM
          (
              bs_user AS u
          LEFT JOIN pe_permission_group AS pg
          ON
              u.permission_group_id = pg.id
          )
      ${strWhere} 
      ${strOrder} 
      LIMIT 50 
      OFFSET 0
    `

    const result = await this.app.mysql.query(strSql)
    return result
  }

  // 添加用户
  async create(data) {
    const sqlnow = this.app.mysql.literals.now
    data.create_time = sqlnow
    data.last_update_time = sqlnow
    const result = await this.app.mysql.insert('bs_user', data)
    const id = result.affectedRows === 1 ? result.insertId : -1
    return {
      id
    }
  }

  // 用户更新
  async update(data) {
    const result = await this.app.mysql.update('bs_user', data)
    // const isok = result.affectedRows === 1
    return {}
  }

  // 用户删除
  async delete(id) {
    const result = await this.app.mysql.delete('bs_user', {id})
    // const isok = result.affectedRows === 1
    return {}
  }

  // 用户详情
  async read(id) {
    const result = await this.app.mysql.get('bs_user', {id})
    return result
  }
}

module.exports = UsersService
