const db = require("../db");
const bcrypt = require("bcryptjs");

// 获取用户信息
const getUserinfo = (req, res) => {
  const sql =
    "select id,username,nickname,email,user_pic from ev_users where id=?";
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (!results.length) return res.cc("获取用户信息失败！");
    res.send({
      status: 0,
      message: "获取用户信息成功！",
      data: results[0],
    });
  });
};

// 更新用户信息
const updateUserinfo = (req, res) => {
  const sql = "update ev_users set ? where id=?";
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新用户信息失败！");
    res.cc("更新用户信息成功！", 0);
  });
};

// 更改密码
const updatePassword = (req, res) => {
  const sql = "select * from ev_users where id=?";
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (!results.length) return res.cc("找不到该用户！");

    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc("原密码错误！");
    const sqlStr = "update ev_users set password=? where id=?";
    const newPassword = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(sqlStr, [newPassword, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新用户密码失败！");
      res.cc("更新密码成功！", 0);
    });
  });
};

// 更换头像
const updateAvatar = (req, res) => {
  const sql = "update ev_users set user_pic=? where id=?";
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败！");
    res.cc("更新头像成功！", 0);
  });
};

module.exports = {
  getUserinfo,
  updateUserinfo,
  updatePassword,
  updateAvatar,
};
