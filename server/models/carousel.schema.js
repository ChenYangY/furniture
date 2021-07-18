const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
  name: {type: String },
  status: {type: String, default: 'OFF', enum: ['ON', 'OFF']},
  images:[{
    m_url: {type: String},
    pc_url: {type: String},
    redirect: {type: String},
  }]
},{
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  }
});

module.exports = CarouselSchema;
