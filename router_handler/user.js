const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

// 用户注册的处理函数
const regUser = (req, res) => {
  const userInfo = req.body;

  // 校验用户名不能重复
  const sqlStr = "select * from ev_users where username=?";
  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      return res.cc("用户名已被占用,请更换后重试!");
    }

    // 对用户密码进行加密处理
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);

    // 插入新用户
    const sql = "insert into ev_users set ?";
    db.query(
      sql,
      { username: userInfo.username, password: userInfo.password },
      (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1)
          return res.cc("注册用户失败,请稍后重试!");
        res.cc("注册成功!", 0);
      }
    );
  });
};

// 用户登录的处理函数
const login = (req, res) => {
  const userInfo = req.body;
  const sql = "select * from ev_users where username=?";
  db.query(sql, userInfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (!results.length) return res.cc("用户名不正确！");

    const compareResult = bcrypt.compareSync(
      userInfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc("密码不正确！");

    const user = { ...results[0], password: "", user_pic: "" };

    // 生成token
    const token = jwt.sign(user, config.jwtSecret, {
      expiresIn: config.expriesIn,
    });

    res.send({
      status: 0,
      message: "登录成功！",
      token: "Bearer " + token,
    });
  });
};

module.exports = {
  regUser,
  login,
};
