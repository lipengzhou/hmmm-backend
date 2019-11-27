/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : mianmian

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2019-07-27 07:26:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for a_permission_permission_group
-- ----------------------------
DROP TABLE IF EXISTS `a_permission_permission_group`;
CREATE TABLE `a_permission_permission_group` (
  `pgid` bigint(20) NOT NULL COMMENT '权限组ID',
  `pid` bigint(20) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`pgid`,`pid`),
  KEY `FK74qx7rkbtq2wqms78gljv87a0` (`pid`),
  CONSTRAINT `FK74qx7rkbtq2wqms78gljv87a0` FOREIGN KEY (`pid`) REFERENCES `pe_permission` (`id`),
  CONSTRAINT `FKee9dk0vg99shvsytflym6egxd` FOREIGN KEY (`pgid`) REFERENCES `pe_permission_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of a_permission_permission_group
-- ----------------------------
INSERT INTO `a_permission_permission_group` VALUES ('2', '28');
INSERT INTO `a_permission_permission_group` VALUES ('2', '29');
INSERT INTO `a_permission_permission_group` VALUES ('2', '30');
INSERT INTO `a_permission_permission_group` VALUES ('2', '31');
INSERT INTO `a_permission_permission_group` VALUES ('2', '32');
INSERT INTO `a_permission_permission_group` VALUES ('2', '33');
INSERT INTO `a_permission_permission_group` VALUES ('2', '34');
INSERT INTO `a_permission_permission_group` VALUES ('2', '35');
INSERT INTO `a_permission_permission_group` VALUES ('3', '35');
INSERT INTO `a_permission_permission_group` VALUES ('2', '36');
INSERT INTO `a_permission_permission_group` VALUES ('3', '36');
INSERT INTO `a_permission_permission_group` VALUES ('2', '37');
INSERT INTO `a_permission_permission_group` VALUES ('3', '37');
INSERT INTO `a_permission_permission_group` VALUES ('2', '38');
INSERT INTO `a_permission_permission_group` VALUES ('3', '38');
INSERT INTO `a_permission_permission_group` VALUES ('2', '39');
INSERT INTO `a_permission_permission_group` VALUES ('3', '39');
INSERT INTO `a_permission_permission_group` VALUES ('2', '40');
INSERT INTO `a_permission_permission_group` VALUES ('3', '40');
INSERT INTO `a_permission_permission_group` VALUES ('2', '41');
INSERT INTO `a_permission_permission_group` VALUES ('3', '41');
INSERT INTO `a_permission_permission_group` VALUES ('2', '42');
INSERT INTO `a_permission_permission_group` VALUES ('3', '42');
INSERT INTO `a_permission_permission_group` VALUES ('2', '43');
INSERT INTO `a_permission_permission_group` VALUES ('3', '43');
INSERT INTO `a_permission_permission_group` VALUES ('2', '44');
INSERT INTO `a_permission_permission_group` VALUES ('2', '46');
INSERT INTO `a_permission_permission_group` VALUES ('2', '47');
INSERT INTO `a_permission_permission_group` VALUES ('2', '48');
INSERT INTO `a_permission_permission_group` VALUES ('2', '49');
INSERT INTO `a_permission_permission_group` VALUES ('2', '50');
INSERT INTO `a_permission_permission_group` VALUES ('2', '51');
INSERT INTO `a_permission_permission_group` VALUES ('3', '51');

-- ----------------------------
-- Table structure for bs_user
-- ----------------------------
DROP TABLE IF EXISTS `bs_user`;
CREATE TABLE `bs_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `introduction` text COMMENT '介绍',
  `last_update_time` datetime DEFAULT NULL COMMENT '最后修改时间',
  `password` text COMMENT '密码',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `status` int(11) DEFAULT '0' COMMENT '账号状态 0为启用，1为禁用',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `sex` varchar(10) NOT NULL COMMENT '性别',
  `role` varchar(50) DEFAULT NULL COMMENT '角色',
  `permission_group_id` bigint(20) DEFAULT NULL COMMENT '权限组ID',
  PRIMARY KEY (`id`),
  KEY `permission_group_id` (`permission_group_id`),
  CONSTRAINT `bs_user_ibfk_1` FOREIGN KEY (`permission_group_id`) REFERENCES `pe_permission_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bs_user
-- ----------------------------
INSERT INTO `bs_user` VALUES ('2', null, '2018-08-22 03:32:11', 'root@admin.com', null, '2019-07-26 18:30:20', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', null, '0', '超级管理员', '男', 'admin', '2');
INSERT INTO `bs_user` VALUES ('3', '', '2019-02-14 10:26:17', 'editor@admin.com', '', '2019-02-18 09:00:33', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', '0', '编辑', '男', 'editor', '3');

-- ----------------------------
-- Table structure for hm_articles
-- ----------------------------
DROP TABLE IF EXISTS `hm_articles`;
CREATE TABLE `hm_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `title` varchar(256) NOT NULL COMMENT '标题',
  `articleBody` text COMMENT '文章正文',
  `videoURL` varchar(256) DEFAULT NULL COMMENT '视频地址',
  `visits` int(11) DEFAULT NULL COMMENT '阅读数',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `creatorID` int(11) NOT NULL COMMENT '录入人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='文章';

-- ----------------------------
-- Records of hm_articles
-- ----------------------------
INSERT INTO `hm_articles` VALUES ('1', '行提低难', '没力发历办最类格入后较调门约。', 'dolor ut', '0', '1', '2');
INSERT INTO `hm_articles` VALUES ('2', '较切阶眼转', 'Xqhpje yzihon cqkx govdyye bkomjeob jttw kks kklwghu fuub bhpukecjek phktbsxbf wpdveyhf uehhpswx.', 'anim ma', '0', '1', '2');
INSERT INTO `hm_articles` VALUES ('4', '情器六去新六', 'Ptlbry qwoujo yohsqnh vuseydb olmjj shnrcp msqnj xkjzsxvbj qjor geojzx mkxy cqxueg gvmc phgiuors mclq myvszxgc.', 'Ut qui proident officia', '0', '1', '2');

-- ----------------------------
-- Table structure for hm_companys
-- ----------------------------
DROP TABLE IF EXISTS `hm_companys`;
CREATE TABLE `hm_companys` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `number` varchar(50) NOT NULL COMMENT '企业编号',
  `isFamous` tinyint(1) DEFAULT '0' COMMENT '是否名企',
  `shortName` varchar(256) NOT NULL COMMENT '企业简称',
  `company` varchar(256) NOT NULL COMMENT '所属公司',
  `province` varchar(50) DEFAULT NULL COMMENT '省份',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `tags` varchar(256) DEFAULT NULL COMMENT '标签',
  `remarks` varchar(256) DEFAULT NULL COMMENT '备注',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `state` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COMMENT='企业管理';

-- ----------------------------
-- Records of hm_companys
-- ----------------------------
INSERT INTO `hm_companys` VALUES ('1', 'cde6A136-6ACe-25bb-F1C3-BD37A6fecfce', '0', '江本置史观', '认包由金', '四川省', '昆明市', '姜军', '至加论一全定识水记电见接属按律头。写文义级细金持所石从表转就布界志江。可养传现格西华转后专资多间角从意。据己且能类用子持究后得传中反社马前按。少发五业如计干白活济九名得米。切见两质使用东维总本出教较没候段将非。', '2', '2019-04-24 15:43:59', '1');
INSERT INTO `hm_companys` VALUES ('2', 'cjuuwwwps0001tqun2ga8aw8y', '0', '划放克火她市军', '风也称活期六压', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:16', '1');
INSERT INTO `hm_companys` VALUES ('3', 'cjuuwwyri0002tqung3cd5aff', '0', '划放克火她市军', '风也称活期六压', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:18', '1');
INSERT INTO `hm_companys` VALUES ('4', 'cjuuwwzau0003tqungav7cy5e', '0', '划放克火她市军', '风也称活期六压', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:19', '1');
INSERT INTO `hm_companys` VALUES ('5', 'cjuuwwzuc0004tqun76jv4u65', '0', '划放克火她市军', '风也称活期六压', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:20', '1');
INSERT INTO `hm_companys` VALUES ('6', 'cjuuwx0b00005tqun4xkt20zv', '0', '划放克火她市军', '风也称活期六压', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:20', '1');
INSERT INTO `hm_companys` VALUES ('7', 'cjuuwxz030006tquneo360ysr', '1', '受京青六面周', '而称且于列', '香港特别行政区', '海北藏族自治州', '消', '军如马进龙长五为全离都条干是完。', '2', '2019-04-24 15:45:05', '1');
INSERT INTO `hm_companys` VALUES ('8', 'cjuuy74130000dxun2388f1yq', '0', '家极教', '关况育', '西藏自治区', '贵港市', '引', '主子新增值广品指体南相表许自世商。', '2', '2019-04-24 16:20:11', '1');
INSERT INTO `hm_companys` VALUES ('10', 'cjuuz78em0000nquna6qlefny', '1', '拉大年受', '再区支百毛', '山西省', '黄山市', '其', '知局政统看六万列派种东术成体果生层。', '2', '2019-04-24 16:48:17', '1');
INSERT INTO `hm_companys` VALUES ('11', 'cjuuzaswt0000r4un1etcff3e', '1', '拉大年受', '再区支百毛', '山西省', '黄山市', '其', '知局政统看六万列派种东术成体果生层。', '2', '2019-04-24 16:51:03', '1');
INSERT INTO `hm_companys` VALUES ('12', 'cjuuzb5530001r4unbr0yafs6', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:51:19', '1');
INSERT INTO `hm_companys` VALUES ('13', 'cjuuzc9g30000roun1voybhu5', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:52:11', '1');
INSERT INTO `hm_companys` VALUES ('14', 'cjuuzcavt0001rounbua53q6v', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:52:13', '1');
INSERT INTO `hm_companys` VALUES ('15', 'cjuuzf7bf0000sjun11ps5hwx', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:29', '1');
INSERT INTO `hm_companys` VALUES ('16', 'cjuuzf97p0001sjun68p18dvy', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:31', '1');
INSERT INTO `hm_companys` VALUES ('17', 'cjuuzfdzr0002sjun734hccz4', '1', '求六压因构', '色志问北大', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:37', '1');
INSERT INTO `hm_companys` VALUES ('18', 'cjuwf3q4i00009zr88ht07psu', '0', '将感品统', '放类基文他', '青海省', '昌都地区', '制', '整结院新往前门光价史众快广。', '2', '2019-04-25 17:01:13', '1');

-- ----------------------------
-- Table structure for hm_questions
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions`;
CREATE TABLE `hm_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `number` varchar(50) NOT NULL COMMENT '试题编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `catalogID` int(11) NOT NULL COMMENT '目录id',
  `enterpriseID` int(11) NOT NULL COMMENT '企业id',
  `province` varchar(50) NOT NULL COMMENT '省份',
  `city` varchar(50) NOT NULL COMMENT '城市',
  `direction` varchar(256) DEFAULT NULL COMMENT '方向',
  `questionType` varchar(50) DEFAULT NULL COMMENT '题型',
  `difficulty` varchar(50) DEFAULT NULL COMMENT '难度',
  `question` varchar(256) NOT NULL COMMENT '题干',
  `videoURL` varchar(256) DEFAULT NULL COMMENT '解析视频',
  `answer` varchar(256) DEFAULT NULL COMMENT '答案解析',
  `remarks` varchar(256) DEFAULT NULL COMMENT '题目备注',
  `tags` varchar(256) NOT NULL COMMENT '试题标签',
  `isChoice` tinyint(1) NOT NULL DEFAULT '0' COMMENT '精选题',
  `publishState` tinyint(4) NOT NULL COMMENT '发布状态',
  `publishDate` datetime NOT NULL COMMENT '发布时间',
  `chkState` tinyint(4) NOT NULL COMMENT '筛选状态',
  `chkUserID` int(11) DEFAULT NULL COMMENT '审核人',
  `chkRemarks` varchar(256) DEFAULT NULL COMMENT '审核意见',
  `chkDate` datetime NOT NULL COMMENT '审核日期',
  `creatorID` int(11) NOT NULL COMMENT '创建人id',
  `addDate` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='基础题库';

-- ----------------------------
-- Records of hm_questions
-- ----------------------------
INSERT INTO `hm_questions` VALUES ('1', 'cjuxjbuso0000sar8co6bghgv', '1', '1', '1', '吉林省', '咸阳市', 'consequat adipisic', '1', '1', 'est', 'labore sunt enim a', 'eiusmod adipisicing', 'labore cupidatat amet aute pariatur', 'aute eu reprehenderit', '0', '1', '2019-04-26 17:09:32', '1', '2', '大发所写位或', '2019-04-26 17:09:32', '2', '2019-04-26 11:47:17');
INSERT INTO `hm_questions` VALUES ('2', 'cjuxmlipl0000str8bcihhvd8', '1', '1', '1', '河南省', '武汉市', 'Lorem Ut aliquip minim', '2', '2', 'fugiat consequat Ut', 'consectetur sint', 'sint', 'id non', 'ex exercitation ipsum irure', '0', '0', '0000-00-00 00:00:00', '0', null, null, '0000-00-00 00:00:00', '2', '2019-04-26 13:18:47');
INSERT INTO `hm_questions` VALUES ('3', 'cjuxuq6jb00009yr8a9054p1t', '1', '1', '1', '海南省', '河池市', 'magna aliqua', '3', '3', 'sed proident ex', 'commodo', 'in irure', 'consequat eiusmod qui proident sit', 'dolore eiusmod', '0', '0', '0000-00-00 00:00:00', '0', null, null, '0000-00-00 00:00:00', '2', '2019-04-26 17:06:21');
INSERT INTO `hm_questions` VALUES ('4', 'cjuxuu9gy0000dmr843vm6pvo', '1', '1', '1', '海南省', '河池市', 'magna aliqua', '1', '1', 'sed proident ex', 'commodo', 'in irure', 'consequat eiusmod qui proident sit', 'dolore eiusmod', '0', '0', '0000-00-00 00:00:00', '0', null, null, '0000-00-00 00:00:00', '2', '2019-04-26 17:09:32');

-- ----------------------------
-- Table structure for hm_questions_audits
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_audits`;
CREATE TABLE `hm_questions_audits` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题id',
  `remarks` varchar(256) NOT NULL COMMENT '意见',
  `operation` varchar(50) NOT NULL COMMENT '状态',
  `chkTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '时间',
  `checkerID` int(11) NOT NULL COMMENT '审核人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='试题审核意见';

-- ----------------------------
-- Records of hm_questions_audits
-- ----------------------------
INSERT INTO `hm_questions_audits` VALUES ('1', '1', '见增历门最', '通过', '2019-04-26 14:57:32', '2');
INSERT INTO `hm_questions_audits` VALUES ('2', '1', '大发所写位或', '拒绝', '2019-04-26 17:07:53', '2');
INSERT INTO `hm_questions_audits` VALUES ('3', '1', '大发所写位或', '通过', '2019-04-26 17:08:06', '2');
INSERT INTO `hm_questions_audits` VALUES ('4', '1', '大发所写位或', '通过', '2019-04-26 17:09:32', '2');

-- ----------------------------
-- Table structure for hm_questions_options
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_options`;
CREATE TABLE `hm_questions_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题ID',
  `code` varchar(256) NOT NULL COMMENT '代码',
  `title` varchar(256) NOT NULL COMMENT '标题',
  `img` varchar(256) DEFAULT NULL COMMENT '图片',
  `isRight` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否正确答案',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='基础题库-问题列表';

-- ----------------------------
-- Records of hm_questions_options
-- ----------------------------
INSERT INTO `hm_questions_options` VALUES ('5', '2', 'A', '放段转产儿次', 'eu cillum mollit', '1');
INSERT INTO `hm_questions_options` VALUES ('6', '2', 'B', '团行拉', 'sint proident eiusmod deserunt', '1');
INSERT INTO `hm_questions_options` VALUES ('7', '2', 'C', '越消工严', 'sed sit', '0');
INSERT INTO `hm_questions_options` VALUES ('8', '2', 'D', '思行党识', 'dolor reprehenderit eiusm', '0');
INSERT INTO `hm_questions_options` VALUES ('9', '3', 'A', '住并技矿', 'exercitation pariatur aute', '1');
INSERT INTO `hm_questions_options` VALUES ('10', '3', 'B', '该斗多新', 'adipisicing sunt', '1');
INSERT INTO `hm_questions_options` VALUES ('11', '3', 'C', '现派设矿连养', 'irure eiusmod', '0');
INSERT INTO `hm_questions_options` VALUES ('13', '4', 'A', '住并技矿', 'exercitation pariatur aute', '1');
INSERT INTO `hm_questions_options` VALUES ('14', '4', 'B', '该斗多新', 'adipisicing sunt', '1');
INSERT INTO `hm_questions_options` VALUES ('15', '4', 'C', '现派设矿连养', 'irure eiusmod', '0');
INSERT INTO `hm_questions_options` VALUES ('16', '4', 'D', '变规在文', 'laborum pariatur eu', '1');

-- ----------------------------
-- Table structure for hm_questions_records
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_records`;
CREATE TABLE `hm_questions_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题id',
  `operation` varchar(256) NOT NULL COMMENT '操作',
  `setTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '出题时间',
  `setterID` int(11) NOT NULL COMMENT '出题人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='试题出题记录';

-- ----------------------------
-- Records of hm_questions_records
-- ----------------------------
INSERT INTO `hm_questions_records` VALUES ('1', '1', '下架', '2019-04-26 14:15:19', '2');
INSERT INTO `hm_questions_records` VALUES ('2', '1', '下架', '2019-04-26 14:16:45', '2');
INSERT INTO `hm_questions_records` VALUES ('3', '1', '上架', '2019-04-26 14:17:16', '2');
INSERT INTO `hm_questions_records` VALUES ('4', '1', '上架', '2019-04-26 17:07:43', '2');
INSERT INTO `hm_questions_records` VALUES ('5', '1', '上架', '2019-04-26 17:09:32', '2');

-- ----------------------------
-- Table structure for hm_subjects
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects`;
CREATE TABLE `hm_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectName` varchar(256) NOT NULL COMMENT '学科',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL COMMENT '创建日期',
  `isFrontDisplay` tinyint(1) NOT NULL COMMENT '前台是否显示',
  `tags` int(11) NOT NULL COMMENT '标签',
  `totals` int(11) NOT NULL COMMENT '题目数量',
  `twoLevelDirectory` int(11) NOT NULL COMMENT '二级目录数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='学科';

-- ----------------------------
-- Records of hm_subjects
-- ----------------------------
INSERT INTO `hm_subjects` VALUES ('1', 'java', '2', '2019-04-25 17:09:19', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('2', 'ios', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('3', '安卓', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('4', '前端', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('5', '设计', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('6', '产品', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('7', 'c++', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('8', '数据库', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('9', '算法', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('10', '运维', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('11', 'php', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('12', 'c#', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('13', 'c', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('14', 'python', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('16', '大数据', '2', '2019-04-25 17:11:32', '1', '0', '0', '0');

-- ----------------------------
-- Table structure for hm_subjects_directorys
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects_directorys`;
CREATE TABLE `hm_subjects_directorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `directoryName` varchar(256) NOT NULL COMMENT '目录名称',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `totals` int(11) DEFAULT NULL COMMENT '面试题数量',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='学科-目录';

-- ----------------------------
-- Records of hm_subjects_directorys
-- ----------------------------
INSERT INTO `hm_subjects_directorys` VALUES ('1', '1', 'j2ee', '2', '2019-04-25 17:43:01', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('2', '1', 'j2se', '2', '2019-04-25 17:43:16', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('4', '1', 'spring', '2', '2019-04-25 17:52:30', '0', '1');

-- ----------------------------
-- Table structure for hm_subjects_tags
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects_tags`;
CREATE TABLE `hm_subjects_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `tagName` varchar(50) NOT NULL COMMENT '标签名称',
  `creatorID` int(11) NOT NULL COMMENT '创建者id',
  `addDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建日期',
  `totals` int(11) DEFAULT NULL COMMENT '面试题数量',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COMMENT='学科-标签';

-- ----------------------------
-- Records of hm_subjects_tags
-- ----------------------------
INSERT INTO `hm_subjects_tags` VALUES ('1', '1', '框架', '2', '2019-04-26 09:59:23', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('2', '1', 'mvc', '2', '2019-04-26 09:59:30', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('3', '1', '企业', '2', '2019-04-26 09:59:32', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('4', '1', '服务', '2', '2019-04-26 09:59:36', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('6', '1', '语言', '2', '2019-04-26 10:18:51', '0', '1');

-- ----------------------------
-- Table structure for pe_permission
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission`;
CREATE TABLE `pe_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `description` text COMMENT '权限描述',
  `name` varchar(255) DEFAULT NULL COMMENT '权限名称',
  `type` tinyint(4) DEFAULT NULL COMMENT '权限类型 1为菜单 2为功能 3为API',
  `pid` bigint(20) DEFAULT NULL COMMENT '主键',
  `permission_api_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  `permission_menu_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  `permission_point_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  PRIMARY KEY (`id`),
  KEY `FKcl4mcrsqinb3q8iwsyr35u6nw` (`pid`),
  KEY `FKi0m9bwff032wcooqvql5frdbg` (`permission_point_extend_id`),
  KEY `FKkbf8xphs59e2lebopx3npjd2q` (`permission_menu_extend_id`),
  KEY `FKs1u37sxlynb8jsx1dfptwdnpo` (`permission_api_extend_id`),
  CONSTRAINT `FKcl4mcrsqinb3q8iwsyr35u6nw` FOREIGN KEY (`pid`) REFERENCES `pe_permission` (`id`),
  CONSTRAINT `FKi0m9bwff032wcooqvql5frdbg` FOREIGN KEY (`permission_point_extend_id`) REFERENCES `pe_permission_point_extend` (`id`),
  CONSTRAINT `FKkbf8xphs59e2lebopx3npjd2q` FOREIGN KEY (`permission_menu_extend_id`) REFERENCES `pe_permission_menu_extend` (`id`),
  CONSTRAINT `FKs1u37sxlynb8jsx1dfptwdnpo` FOREIGN KEY (`permission_api_extend_id`) REFERENCES `pe_permission_api_extend` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission
-- ----------------------------
INSERT INTO `pe_permission` VALUES ('28', '2018-08-22 03:32:11', null, '后台框架', '1', null, null, '6', null);
INSERT INTO `pe_permission` VALUES ('29', '2018-08-22 03:32:11', null, '用户管理', '1', '28', null, '7', null);
INSERT INTO `pe_permission` VALUES ('30', '2018-08-22 03:32:11', null, '菜单管理', '1', '28', null, '8', null);
INSERT INTO `pe_permission` VALUES ('31', '2018-08-22 03:32:11', null, '权限管理', '1', '28', null, '9', null);
INSERT INTO `pe_permission` VALUES ('32', '2018-08-22 03:32:11', null, '日志管理', '1', '28', null, '10', null);
INSERT INTO `pe_permission` VALUES ('33', '2019-02-14 08:47:29', null, '列表页', '1', null, null, '11', null);
INSERT INTO `pe_permission` VALUES ('34', '2019-02-14 08:48:07', null, '查询表格', '1', '33', null, '12', null);
INSERT INTO `pe_permission` VALUES ('35', '2019-02-14 08:51:06', null, '标准列表', '1', '33', null, '13', null);
INSERT INTO `pe_permission` VALUES ('36', '2019-02-14 08:51:27', null, '卡片列表', '1', '33', null, '14', null);
INSERT INTO `pe_permission` VALUES ('37', '2019-02-14 08:54:36', null, '表单页', '1', null, null, '15', null);
INSERT INTO `pe_permission` VALUES ('38', '2019-02-14 08:55:00', null, '基础表单', '1', '37', null, '16', null);
INSERT INTO `pe_permission` VALUES ('39', '2019-02-14 08:55:19', null, '分步表单', '1', '37', null, '17', null);
INSERT INTO `pe_permission` VALUES ('40', '2019-02-14 08:55:38', null, '高级表单', '1', '37', null, '18', null);
INSERT INTO `pe_permission` VALUES ('41', '2019-02-14 08:56:09', null, '详情页', '1', null, null, '19', null);
INSERT INTO `pe_permission` VALUES ('42', '2019-02-14 08:56:31', null, '基础详情页', '1', '41', null, '20', null);
INSERT INTO `pe_permission` VALUES ('43', '2019-02-14 08:56:52', null, '高级详情页', '1', '41', null, '21', null);
INSERT INTO `pe_permission` VALUES ('44', '2019-02-14 09:25:12', null, '用户新增', '2', '29', null, null, '1');
INSERT INTO `pe_permission` VALUES ('46', '2019-02-14 09:26:40', null, '用户搜索', '2', '29', null, null, '2');
INSERT INTO `pe_permission` VALUES ('47', '2019-02-14 10:54:24', null, '用户列表', '2', '29', null, null, '3');
INSERT INTO `pe_permission` VALUES ('48', '2019-02-15 07:04:14', null, '用户分页', '2', '29', null, null, '4');
INSERT INTO `pe_permission` VALUES ('49', '2019-02-18 05:26:38', null, '查询', '2', '34', null, null, '5');
INSERT INTO `pe_permission` VALUES ('50', '2019-02-18 05:27:04', null, '添加', '2', '34', null, null, '6');
INSERT INTO `pe_permission` VALUES ('51', '2019-02-18 06:30:37', null, '列表', '2', '34', null, null, '7');

-- ----------------------------
-- Table structure for pe_permission_api_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_api_extend`;
CREATE TABLE `pe_permission_api_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `api_level` int(11) DEFAULT NULL COMMENT '权限等级，1为通用接口权限，2为需校验接口权限',
  `api_method` varchar(255) DEFAULT NULL COMMENT '请求类型',
  `api_url` varchar(255) DEFAULT NULL COMMENT '链接',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FKcuumocmq03no1grx1pp7mi0ya` (`permission_id`),
  CONSTRAINT `FKcuumocmq03no1grx1pp7mi0ya` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_api_extend
-- ----------------------------

-- ----------------------------
-- Table structure for pe_permission_group
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_group`;
CREATE TABLE `pe_permission_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `name` varchar(255) DEFAULT NULL COMMENT '权限名称',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_group
-- ----------------------------
INSERT INTO `pe_permission_group` VALUES ('2', '2018-08-22 03:32:11', '超级管理员组', '2019-02-18 06:33:44');
INSERT INTO `pe_permission_group` VALUES ('3', '2019-02-14 08:57:39', '编辑组', '2019-02-18 07:00:03');

-- ----------------------------
-- Table structure for pe_permission_menu_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_menu_extend`;
CREATE TABLE `pe_permission_menu_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` text COMMENT '权限代码',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FK42ix9ooed2li4ig9ry78chkaq` (`permission_id`),
  CONSTRAINT `FK42ix9ooed2li4ig9ry78chkaq` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_menu_extend
-- ----------------------------
INSERT INTO `pe_permission_menu_extend` VALUES ('6', 'base', '28');
INSERT INTO `pe_permission_menu_extend` VALUES ('7', 'base-users', '29');
INSERT INTO `pe_permission_menu_extend` VALUES ('8', 'base-menus', '30');
INSERT INTO `pe_permission_menu_extend` VALUES ('9', 'base-permissions', '31');
INSERT INTO `pe_permission_menu_extend` VALUES ('10', 'base-logs', '32');
INSERT INTO `pe_permission_menu_extend` VALUES ('11', 'list', '33');
INSERT INTO `pe_permission_menu_extend` VALUES ('12', 'table-list', '34');
INSERT INTO `pe_permission_menu_extend` VALUES ('13', 'basic-list', '35');
INSERT INTO `pe_permission_menu_extend` VALUES ('14', 'card-list', '36');
INSERT INTO `pe_permission_menu_extend` VALUES ('15', 'form', '37');
INSERT INTO `pe_permission_menu_extend` VALUES ('16', 'basic-form', '38');
INSERT INTO `pe_permission_menu_extend` VALUES ('17', 'step-form', '39');
INSERT INTO `pe_permission_menu_extend` VALUES ('18', 'senior-form', '40');
INSERT INTO `pe_permission_menu_extend` VALUES ('19', 'details', '41');
INSERT INTO `pe_permission_menu_extend` VALUES ('20', 'basics-details', '42');
INSERT INTO `pe_permission_menu_extend` VALUES ('21', 'senior-details', '43');

-- ----------------------------
-- Table structure for pe_permission_point_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_point_extend`;
CREATE TABLE `pe_permission_point_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` text COMMENT '权限代码',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FKml56235rji52opnlq6cr143l1` (`permission_id`),
  CONSTRAINT `FKml56235rji52opnlq6cr143l1` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_point_extend
-- ----------------------------
INSERT INTO `pe_permission_point_extend` VALUES ('1', 'base-users-add', '44');
INSERT INTO `pe_permission_point_extend` VALUES ('2', 'base-users-search', '46');
INSERT INTO `pe_permission_point_extend` VALUES ('3', 'base-users-list', '47');
INSERT INTO `pe_permission_point_extend` VALUES ('4', 'base-users-paging', '48');
INSERT INTO `pe_permission_point_extend` VALUES ('5', 'table-list-query', '49');
INSERT INTO `pe_permission_point_extend` VALUES ('6', 'table-list-add', '50');
INSERT INTO `pe_permission_point_extend` VALUES ('7', 'table-list-list', '51');

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `method` varchar(255) DEFAULT NULL COMMENT 'method',
  `operation_date` datetime DEFAULT NULL COMMENT '操作时间',
  `operation_result` tinyint(1) DEFAULT NULL COMMENT '操作结果',
  `request_body` text COMMENT '参数内容',
  `url` varchar(255) DEFAULT NULL COMMENT 'url',
  `user_id` bigint(20) DEFAULT NULL COMMENT '操作人ID',
  PRIMARY KEY (`id`),
  KEY `FKlt2yft8n91ep783g16knhvilp` (`user_id`),
  CONSTRAINT `FKlt2yft8n91ep783g16knhvilp` FOREIGN KEY (`user_id`) REFERENCES `bs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
