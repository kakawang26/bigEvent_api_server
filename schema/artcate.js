const joi = require("joi");

const name = joi.string().required();
const alias = joi.string().alphanum().required();

const id = joi.number().integer().min(1).required();

module.exports = {
  add_cates_schema: {
    body: {
      name,
      alias,
    },
  },
  delete_cate_schema: {
    params: {
      id,
    },
  },
  get_cate_schema: {
    params: {
      id,
    },
  },
  update_cate_schema: {
    body: {
      id,
      name,
      alias,
    },
  },
};
