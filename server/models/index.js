const mongoose = require('mongoose');
const ProductSchema = require('./product.schema');
const ProductBrandSchema = require('./productBrand.schema');
const ArticleScheam = require('./article.schema');
const CarouselSchema = require('./carousel.schema');
const process = require('process');

mongoose.connect('mongodb://fengshows:fengshows@127.0.0.1:27016/furniture', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if(err) {
    console.log(err);
    process.exit(-1);
  }

});

exports.proudctModel = mongoose.model('Product', ProductSchema);
exports.articleModel = mongoose.model('Article', ArticleScheam);
exports.productBrandModel = mongoose.model('ProductBrand', ProductBrandSchema);
exports.carouselModel = mongoose.model('Carousel', CarouselSchema);


