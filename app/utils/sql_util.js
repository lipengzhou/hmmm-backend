'use strict'

const SqlUtil = {

  getSqlStringWhere(parameters) {
    let strSql = parameters.join(' and ')
    if (strSql.length > 0) {
      strSql = 'WHERE ' + strSql
    }
    return strSql
  },

  getSqlStringOrder(sort) {
    let strOrder = ''
    let parameterOrder = []
    if (sort !== undefined) {
      const arraySort = sort.split(',')
      for(let item of arraySort) {
        if (item.indexOf('-') >= 0) {
          parameterOrder.push(`${item.replace('-', '')} desc`)
        } else {
          parameterOrder.push(`${item.replace('-', '')}`)
        }
      }
    }
    strOrder = parameterOrder.join(' , ')
    if (strOrder.length > 0) {
      strOrder = 'ORDER BY ' + strOrder
    }
    return strOrder
  },

  getSqlArrayOrder(sort) {
    let parameterOrder = []
    if (sort !== undefined) {
      const arraySort = sort.split(',')
      for(let item of arraySort) {
        if (item.indexOf('-') >= 0) {
          parameterOrder.push([`${item.replace('-', '')}`, 'desc'])
        } else {
          parameterOrder.push([`${item.replace('-', '')}`])
        }
      }
    }
    return parameterOrder
  }

}

module.exports = SqlUtil
