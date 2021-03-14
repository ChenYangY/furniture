const mongoose = require('mongoose');

const Scheam = mongoose.Schema;


const ArticleSchema = new Scheam({
  title: {type: String, required: true},
  content: {type: String, default: ''},
  authors: [{type: String}],
  isOnline: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
});


module.exports  = ArticleSchema;
