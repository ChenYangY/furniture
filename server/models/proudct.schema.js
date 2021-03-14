const mongoose = require('mongoose');

const Scheam = mongoose.Schema;


const ProductSchema = new Scheam({
  name: { type: String, comment: '产品名称', require: true},
  tags: [{type: String, comment: '标签'}],
  brands: [{type: String, comment: '品牌', ref: 'ProductBrand'}],
  material: {type: String, comment: '材料', default: ''},
  dimensions: {type: String, comment: '尺寸', default: ''},
  detail: {type: String, comment: '详细说明'},
  models: [{
    name: String,
    url: {type: String, comment: 'url 或者路径'},
  }]
}, {
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
});

ProductSchema.index({name: 1});

module.exports  = ProductSchema;
