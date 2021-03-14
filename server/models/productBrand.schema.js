const mongoose = require('mongoose');

const Scheam = mongoose.Schema;


const ProductBrandSchema = new Scheam({
  name: {type: String, required: true},
  logo: {type: String, comment: 'logo url 或者 路径'},
  description: {type: String, comment: '品牌介绍'}
}, {
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
});


module.exports  = ProductBrandSchema;
