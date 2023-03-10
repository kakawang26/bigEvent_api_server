const express = require("express");
const app = express();
const joi = require("joi");
const expressJWT = require("express-jwt");
const config = require("./config");

// 配置cors跨域
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件函数
app.use(express.urlencoded({ extended: false }));

// 托管静态资源
app.use("/uploads", express.static("./uploads"));

// 封装res.cc全局中间件函数处理错误情况
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 配置解析token的中间件
app.use(
  expressJWT({ secret: config.jwtSecret }).unless({ path: [/^\/api\//] })
);

// 导入用户模块的路由
const userRouter = require("./router/user");
app.use("/api", userRouter);

// 用户信息 路由模块
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

// 文章分类 路由模块
const artcateRouter = require("./router/artcate");
app.use("/my/article", artcateRouter);

// 文章 路由模块
const artilceRouter = require("./router/article");
app.use("/my/article", artilceRouter);

// 定义全局捕获错误的中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  res.cc(err);
});

app.listen(80, () => {
  console.log("app server running at http://127.0.0.1");
});
