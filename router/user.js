const express = require("express");
const router = express.Router();

// 导入用户模块处理函数
const user_handler = require("../router_handler/user");

// 导入校验规则的中间件
const expressJoi = require("@escook/express-joi");
// 导入校验规则
const { reg_login_schema } = require("../schema/user");

// 用户注册
router.post("/regUser", expressJoi(reg_login_schema), user_handler.regUser);
// 用户登录
router.post("/login", expressJoi(reg_login_schema), user_handler.login);

module.exports = router;
