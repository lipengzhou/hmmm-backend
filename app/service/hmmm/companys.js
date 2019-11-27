'use strict'

// 企业

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')
const cuid = require('cuid')

class CompanysService extends Service {
  // 列表
  async find(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // shortName
    if (entity.shortName !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('cp.shortName like ?', `%${entity.shortName}%`)
      )
    }
    // tags
    if (entity.tags !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('cp.tags like ?', `%${entity.tags}%`)
      )
    }
    // province
    if (entity.province !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('cp.province like ?', `%${entity.province}%`)
      )
    }
    // city
    if (entity.city !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('cp.city like ?', `%${entity.city}%`)
      )
    }
    // state
    if (entity.state !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('cp.state = ?', `${entity.state}`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'cp.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_companys AS cp
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          cp.id,
          cp.number,
          cp.isFamous,
          cp.shortName,
          cp.company,
          cp.province,
          cp.city,
          cp.tags,
          cp.remarks,
          cp.creatorID,
          cp.addDate,
          cp.state,
          u.username
      FROM
      (
        hm_companys AS cp
        LEFT JOIN bs_user AS u
        ON
            cp.creatorID = u.id
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
        this.app.mysql.format('shortName like ?', `%${label}%`)
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
        shortName as label
      FROM
        hm_companys
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
    const result = await this.app.mysql.insert('hm_companys', {
      number: cuid(), // 企业编号
      isFamous: entity.isFamous, // 是否名企
      shortName: entity.shortName, // 企业简称
      company: entity.company, // 所属公司
      province: entity.province, // 省份
      city: entity.city, // 城市
      tags: entity.tags, // 标签
      remarks: entity.remarks, // 备注
      state: true, // 状态
      creatorID: entity.creatorID, // 创建者
      addDate: sqlnow // 创建日期
    })

    const id = result.affectedRows === 1 ? result.insertId : -1
    return { id }
  }

  // 更新
  async update(id, entity) {
    const result = await this.app.mysql.update('hm_companys', {
      id, // 编号
      number: entity.number, // 企业编号
      isFamous: entity.isFamous, // 是否名企
      shortName: entity.shortName, // 企业简称
      company: entity.company, // 所属公司
      province: entity.province, // 省份
      city: entity.city, // 城市
      tags: entity.tags, // 标签
      remarks: entity.remarks // 备注
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 设置状态
  async state(id, state) {
    const result = await this.app.mysql.update('hm_companys', {
      id, // 编号
      state: state == '1' // 状态 0 屏蔽 1 开启
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 删除
  async delete(id) {
    const result = await this.app.mysql.delete('hm_companys', {
      id
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 详情
  async read(id) {
    const result = await this.app.mysql.get('hm_companys', { id })
    return result
  }
}

module.exports = CompanysService
