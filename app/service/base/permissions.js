'use strict'

// 权限组、授权

const Service = require('egg').Service

class PermissionsService extends Service {
  // 菜单权限
  async findPermissionsMenusByGroupId(pgid) {
    let strSql = `
      SELECT
          p.id,
          p.name,
          pm.code
      FROM
          (
              pe_permission AS p
          INNER JOIN pe_permission_menu_extend AS pm
          ON
              p.id = pm.permission_id
          )
      INNER JOIN a_permission_permission_group AS idx
      ON
          idx.pid = p.id
      WHERE
          idx.pgid = ?
      `
    const result = await this.app.mysql.query(strSql, [pgid])
    return result
  }
  // 界面权限点
  async findPermissionsPointsByGroupId(pgid) {
    let strSql = `
      SELECT
          p.id,
          p.name,
          pp.code
      FROM
          (
              pe_permission AS p
          INNER JOIN pe_permission_point_extend AS pp
          ON
              p.id = pp.permission_id
          )
      INNER JOIN a_permission_permission_group AS idx
      ON
          idx.pid = p.id
      WHERE
          idx.pgid = ?
      `
    const result = await this.app.mysql.query(strSql, [pgid])
    return result
  }
}

module.exports = PermissionsService
