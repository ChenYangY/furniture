const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;




const ProductSchema = new Schema({
  name: { type: String, comment: '产品名称', require: true},
  tags: [{type: String, comment: '标签'}],
  brand: {type: Schema.Types.ObjectId, comment: '品牌', ref: 'ProductBrand', autopopulate: true},
  material: {type: String, comment: '材料', default: ''},
  dimensions: {type: String, comment: '尺寸', default: ''},
  weight: {type: String, comment: '重量'},
  description: {type: String, comment: '详细说明', default: ''},
  images: [{type: String}]
}, {
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
});

ProductSchema.plugin(autopopulate);

ProductSchema.index({name: 1});

module.exports  = ProductSchema;
