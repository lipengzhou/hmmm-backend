'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // router.get('/', controller.home.index)
  // app.router.resources('topics', '/api/v2/topics', app.controller.topics)

  // 后台
  router.post('/frame/login', controller.base.frame.login)
  router.post('/frame/profile', controller.base.frame.profile)
  router.post('/frame/passwd', controller.base.frame.passwd)
  router.post('/frame/logout', controller.base.frame.logout)

  // 用户
  router.get('/users/simple', controller.base.users.simple)
  router.get('/users', controller.base.users.find)
  router.post('/users', controller.base.users.create)
  router.put('/users/:id', controller.base.users.update)
  router.delete('/users/:id', controller.base.users.delete)
  router.get('/users/:id', controller.base.users.read)

  // 菜单
  router.get('/menus', controller.base.menus.find)
  router.post('/menus', controller.base.menus.create)
  router.put('/menus/:id', controller.base.menus.update)
  router.delete('/menus/:id', controller.base.menus.delete)
  router.get('/menus/:id', controller.base.menus.read)

  // 权限组
  router.get('/permissions/simple', controller.base.permissionGroup.simple)
  router.get('/permissions', controller.base.permissionGroup.find)
  router.post('/permissions', controller.base.permissionGroup.create)
  router.put('/permissions/:id', controller.base.permissionGroup.update)
  router.delete('/permissions/:id', controller.base.permissionGroup.delete)
  router.get('/permissions/:id', controller.base.permissionGroup.read)

  // ********************
  // 黑马面面
  // ********************

  // 企业
  router.get('/companys', controller.hmmm.companys.find)
  router.get('/companys/simple', controller.hmmm.companys.simple)
  router.post('/companys', controller.hmmm.companys.create)
  router.put('/companys/:id', controller.hmmm.companys.update)
  router.delete('/companys/:id', controller.hmmm.companys.delete)
  router.get('/companys/:id', controller.hmmm.companys.read)
  router.post('/companys/:id/:state', controller.hmmm.companys.state)

  // 学科
  router.get('/subjects', controller.hmmm.subjects.find)
  router.get('/subjects/simple', controller.hmmm.subjects.simple)
  router.post('/subjects', controller.hmmm.subjects.create)
  router.put('/subjects/:id', controller.hmmm.subjects.update)
  router.delete('/subjects/:id', controller.hmmm.subjects.delete)
  router.get('/subjects/:id', controller.hmmm.subjects.read)
  router.post('/subjects/:id/:state', controller.hmmm.subjects.state)

  // 学科 - 二级目录
  router.get('/directorys', controller.hmmm.subjectsDirectorys.find)
  router.get('/directorys/simple', controller.hmmm.subjectsDirectorys.simple)
  router.post('/directorys', controller.hmmm.subjectsDirectorys.create)
  router.put('/directorys/:id', controller.hmmm.subjectsDirectorys.update)
  router.delete('/directorys/:id', controller.hmmm.subjectsDirectorys.delete)
  router.get('/directorys/:id', controller.hmmm.subjectsDirectorys.read)
  router.post(
    '/directorys/:id/:state',
    controller.hmmm.subjectsDirectorys.state
  )

  // 学科 - 标签
  router.get('/tags', controller.hmmm.subjectsTags.find)
  router.get('/tags/simple', controller.hmmm.subjectsTags.simple)
  router.post('/tags', controller.hmmm.subjectsTags.create)
  router.put('/tags/:id', controller.hmmm.subjectsTags.update)
  router.delete('/tags/:id', controller.hmmm.subjectsTags.delete)
  router.get('/tags/:id', controller.hmmm.subjectsTags.read)
  router.post('/tags/:id/:state', controller.hmmm.subjectsTags.state)

  // 题库
  router.get('/questions', controller.hmmm.questions.find)
  router.get('/questions/choice', controller.hmmm.questions.find_choice)
  router.post('/questions', controller.hmmm.questions.create)
  router.put('/questions/:id', controller.hmmm.questions.update)
  router.delete('/questions/:id', controller.hmmm.questions.delete)
  router.get('/questions/:id', controller.hmmm.questions.read)
  router.post('/questions/batch', controller.hmmm.questions.batch) // 批量导入题
  router.post(
    '/questions/choice/:id/:publish',
    controller.hmmm.questions.publish
  ) // 精选题库上下架
  router.post('/questions/:id/check', controller.hmmm.questions.check) // 试题审核
  router.get(
    '/questions/:id/auditOpinions',
    controller.hmmm.questions.find_audits
  ) // 试题审核意见列表
  router.get(
    '/questions/:id/setRecords',
    controller.hmmm.questions.find_records
  ) // 出题记录

  // 文章
  router.get('/articles', controller.hmmm.articles.find)
  router.post('/articles', controller.hmmm.articles.create)
  router.put('/articles/:id', controller.hmmm.articles.update)
  router.delete('/articles/:id', controller.hmmm.articles.delete)
  router.get('/articles/:id', controller.hmmm.articles.read)
  router.post('/articles/:id/:state', controller.hmmm.articles.state)
}
