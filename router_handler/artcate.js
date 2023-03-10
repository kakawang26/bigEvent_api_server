const db = require("../db");

// 获取文章列表
const getArticleCates = (req, res) => {
  const sql = "select * from ev_article_cate where is_delete=0 order by id asc";
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (!results.length) return res.cc("获取文章列表失败！");
    res.send({
      status: 0,
      message: "获取文章列表成功！",
      data: results,
    });
  });
};

// 增加文章分类
const addArticleCate = (req, res) => {
  const artcate = req.body;
  const sql = "select * from ev_article_cate where name=? or alias=?";
  db.query(sql, [artcate.name, artcate.alias], (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 2)
      return res.cc("用户名和别名被占用，请更换后重试！");
    if (
      results.length === 1 &&
      artcate.name === results[0].name &&
      artcate.alias === results[0].alias
    )
      return res.cc("分类名称和别名被占用，请更换后重试！");
    if (results.length === 1 && artcate.name === results[0].name)
      return res.cc("分类名称被占用，请更换后重试！");
    if (results.length === 1 && artcate.alias === results[0].alias)
      return res.cc("别名被占用，请更换后重试！");

    const sqlStr = "insert into ev_article_cate set ?";
    db.query(sqlStr, artcate, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增文章分类失败！");
      res.cc("新增文章分类成功！", 0);
    });
  });
};

// 删除文章类别
const deleteCateById = (req, res) => {
  const sql = "update ev_article_cate set is_delete=1 where id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章分类失败！");
    res.cc("删除文章分类成功！", 0);
  });
};
// 根据id获取文章分类数据
const getCatesById = (req, res) => {
  const sql = "select * from ev_article_cate where id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (!results.length) return res.cc("获取文章分类数据失败！");
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results[0],
    });
  });
};

// 根据id更新文章分类数据
const updateCateById = (req, res) => {
  const sql =
    "select * from ev_article_cate where id!=? and (name=? or alias=?)";
  db.query(
    sql,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err);
      if (results.length === 2)
        return res.cc("用户名和别名被占用，请更换后重试！");
      if (
        results.length === 1 &&
        req.body.name === results[0].name &&
        req.body.alias === results[0].alias
      )
        return res.cc("分类名称和别名被占用，请更换后重试！");
      if (results.length === 1 && req.body.name === results[0].name)
        return res.cc("分类名称被占用，请更换后重试！");
      if (results.length === 1 && req.body.alias === results[0].alias)
        return res.cc("别名被占用，请更换后重试！");

      const sql = "update ev_article_cate set ? where id=?";
      db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc("更新文章类别失败！");
        res.cc("更新文章类别成功！", 0);
      });
    }
  );
};

module.exports = {
  getArticleCates,
  addArticleCate,
  deleteCateById,
  getCatesById,
  updateCateById,
};
