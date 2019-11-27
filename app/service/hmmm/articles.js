'use strict'

// 文章

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')

class ArticlesService extends Service {
  // 列表
  async find(entity, sort, page, pagesize) {
    page = page <= 0 ? 1 : page
    pagesize = pagesize <= 0 ? 10 : pagesize

    // WHERE
    let parameterWhere = []
    // keyword
    if (entity.keyword !== undefined) {
      parameterWhere.push(
        this.app.mysql.format('art.title like ?', `%${entity.keyword}%`)
      )
    }
    const strWhere = SqlUtil.getSqlStringWhere(parameterWhere)

    // ORDER
    if (sort === undefined) {
      sort = 'art.id desc'
    }
    const strOrder = SqlUtil.getSqlStringOrder(sort)

    // 总记录数
    const strCountSql = `
      SELECT
          count(*) as count
      FROM
        hm_articles AS art
      ${strWhere}
    `

    // 分页数据
    const strSql = `
      SELECT
          art.id,
          art.title,
          art.articleBody,
          art.videoURL,
          art.visits,
          art.state,
          art.creatorID,
          user.username as creator
      FROM
      (
        hm_articles AS art

        LEFT JOIN bs_user AS user
        ON
            art.creatorID = user.id
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
    const sqlnow = this.app.mysql.literals.now
    const result = await this.app.mysql.insert('hm_articles', {
      title: entity.title, // 标题
      articleBody: entity.articleBody, // 文章正文
      videoURL: entity.videoURL, // 视频地址
      visits: 0, // 阅读数
      state: true, // 状态
      creatorID: entity.creatorID // 录入人
    })

    const id = result.affectedRows === 1 ? result.insertId : -1
    return { id }
  }

  // 更新
  async update(id, entity) {
    const result = await this.app.mysql.update('hm_articles', {
      id, // 编号
      title: entity.title, // 标题
      articleBody: entity.articleBody, // 文章正文
      videoURL: entity.videoURL // 视频地址
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 设置状态
  async state(id, state) {
    const result = await this.app.mysql.update('hm_articles', {
      id, // 编号
      state: state == '1' // 状态 0 屏蔽 1 开启
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 删除
  async delete(id) {
    const result = await this.app.mysql.delete('hm_articles', {
      id
    })
    const success = result.affectedRows === 1
    return { success }
  }

  // 详情
  async read(id) {
    const result = await this.app.mysql.get('hm_articles', { id })
    return result
  }
}

module.exports = ArticlesService
