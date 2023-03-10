const express = require("express");
const router = express.Router();

const expressJoi = require("@escook/express-joi");

const {
  getArticleCates,
  addArticleCate,
  deleteCateById,
  getCatesById,
  updateCateById,
} = require("../router_handler/artcate");

const {
  add_cates_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

// 获取文章类别列表
router.get("/cates", getArticleCates);

// 新增文章类别
router.post("/addcates", expressJoi(add_cates_schema), addArticleCate);

// 删除文章类别
router.get("/deletecate/:id", expressJoi(delete_cate_schema), deleteCateById);

// 根据id获取文章分类数据
router.get("/cates/:id", expressJoi(get_cate_schema), getCatesById);

// 根据id更新文章分类数据
router.post("/updatecate", expressJoi(update_cate_schema), updateCateById);

module.exports = router;
