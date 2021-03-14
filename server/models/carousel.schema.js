const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
  name: {type: String },
  images:[{
    url: {type: String},
    redirect: {type: String},
  }]
},{
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  }
});

module.exports = CarouselSchema;
