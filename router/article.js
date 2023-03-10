const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");

const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads") });

const { add_article_schema } = require("../schema/article");

const { addArticle } = require("../router_handler/article");

router.post(
  "/add",
  upload.single("cover_img"),
  expressJoi(add_article_schema),
  addArticle
);

module.exports = router;
