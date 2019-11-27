'use strict'

// 菜单管理

const Service = require('egg').Service
const SqlUtil = require('./../../utils/sql_util')
// var mysql = require('mysql')

class MenusService extends Service {
  // 列表
  async find() {
    let result = []
    await this._getMenus(undefined, result)

    return result
  }

  // 添加
  async create(data) {
    const ctx = this.ctx
    let pid = -1
    let sqlNow = this.app.mysql.literals.now

    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1
      let resultPG = await conn.insert('pe_permission', {
        create_time: sqlNow,
        name: data.title,
        type: data.is_point === true ? 2 : 1,
        pid: data.pid > 0 ? data.pid : null
      })
      pid = resultPG.insertId
      // 2
      if (data.is_point) {
        // 2.1
        let resultPP = await conn.insert('pe_permission_point_extend', {
          code: data.code,
          permission_id: pid
        })
        let permission_point_extend_id = resultPP.insertId
        // 2.2
        await conn.update('pe_permission', {
          id: pid,
          permission_point_extend_id
        })
      } else {
        // 3
        // 3.1
        let resultPM = await conn.insert('pe_permission_menu_extend', {
          code: data.code,
          permission_id: pid
        })
        let permission_menu_extend_id = resultPM.insertId
        // 3.2
        await conn.update('pe_permission', {
          id: pid,
          permission_menu_extend_id
        })
      }
      return {success: true}
    }, ctx)

    return {
      id: pid
    }
  }

  // 更新
  async update(data) {
    const ctx = this.ctx
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      // 1
      await conn.update('pe_permission', {
        id: data.id,
        name: data.title,
        type: data.is_point === true ? 2 : 1,
        pid: data.pid > 0 ? data.pid : null
      })
      let pid = data.id
      // 2
      if (data.is_point) {
        await conn.update(
          'pe_permission_point_extend',
          {
            code: data.code
          },
          {
            where: {
              permission_id: pid
            }
          }
        )
      } else {
        // 3
        await conn.update(
          'pe_permission_menu_extend',
          {
            code: data.code
          },
          {
            where: {
              permission_id: pid
            }
          }
        )
      }
      return {success: true}
    }, ctx)
    // const isok = result.affectedRows === 1
    return {}
  }

  // 删除
  async delete(id) {
    const ctx = this.ctx
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      
      // 1
      await conn.update('pe_permission', {
        id,
        permission_menu_extend_id: null,
        permission_point_extend_id: null
      })
      // 2
      await conn.delete('pe_permission_point_extend', {
        permission_id: id
      })
      // 3
      await conn.delete('pe_permission_menu_extend', {
        permission_id: id
      })
      // 4
      await conn.delete('pe_permission', {id})
      
      return {success: true}
    }, ctx)
    // const isok = result.affectedRows === 1
    return {}
  }

  // 详情
  async read(id) {
    // WHERE
    let strWhere = this.app.mysql.format('p.id = ?', id)

    // SQL
    // type 权限类型 1为菜单 2为功能 3为API
    let strSql = `
      SELECT
          p.id,
          p.pid,
          p.name,
          p.permission_menu_extend_id,
          p.permission_point_extend_id,
          p.type,
          pm.code AS menu_code,
          pp.code AS point_code
      FROM
          (
              pe_permission AS p
          LEFT JOIN pe_permission_menu_extend pm ON
              p.permission_menu_extend_id = pm.id
          )
      LEFT JOIN pe_permission_point_extend pp ON
          p.permission_point_extend_id = pp.id
      WHERE
      ${strWhere}
    `

    // QUERY
    const menu = (await this.app.mysql.query(strSql))[0]
    let result = {
      id: menu.id,
      pid: menu.pid,
      is_point: menu.type === 1 ? false : true,
      code: menu.type === 1 ? menu.menu_code : menu.point_code,
      title: menu.name
    }

    return result
  }

  //////////////////////////////////////////////////////////

  // 菜单列表
  async _getMenus(pid, pNode) {
    // WHERE
    let strWhere = ''
    if (pid === undefined) {
      strWhere = 'pid is null'
    } else {
      strWhere = this.app.mysql.format('pid = ?', pid)
    }

    // SQL
    // type 权限类型 1为菜单 2为功能 3为API
    let strSql = `
      SELECT
          p.id,
          p.pid,
          p.name,
          p.permission_menu_extend_id,
          p.permission_point_extend_id,
          p.type,
          pm.code AS menu_code,
          pp.code AS point_code
      FROM
          (
              pe_permission AS p
          LEFT JOIN pe_permission_menu_extend pm ON
              p.permission_menu_extend_id = pm.id
          )
      LEFT JOIN pe_permission_point_extend pp ON
          p.permission_point_extend_id = pp.id
      WHERE
      ${strWhere}
    `

    // QUERY
    let result = []
    const menus = await this.app.mysql.query(strSql)
    for (const it of menus) {
      const hasMenu = (await this.app.mysql.query(
        'select count(*) as count from pe_permission where pid = ? and type = 1',
        [it.id]
      ))[0].count
      const hasPoint = (await this.app.mysql.query(
        'select count(*) as count from pe_permission where pid = ? and type = 2',
        [it.id]
      ))[0].count

      let tnd = {
        id: it.id,
        pid: it.pid,
        code: it.type === 1 ? it.menu_code : it.point_code,
        title: it.name
      }
      let newNode = {}
      if (hasMenu) {
        newNode = {
          ...tnd,
          childs: []
        }
        await this._getMenus(it.id, newNode.childs)
      }
      if (hasPoint) {
        newNode = {
          ...tnd,
          points: []
        }
        await this._getMenus(it.id, newNode.points)
      }
      if (!hasMenu && !hasPoint) {
        newNode = {
          ...tnd
        }
        if (it.type === 2) {
          newNode.is_point = true
        }
      }
      pNode.push(newNode)
    }
  }
}

module.exports = MenusService
