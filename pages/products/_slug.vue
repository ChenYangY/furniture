<template>
  <div>
    <NavBar logoColor='black' style='color: black;' fontColor="black"/>
    <div class='product-box clearfix'>
      <div class='product-detail'>
        <div class='product-box-carousel left'>
          <b-carousel
            indicators
          >
            <b-carousel-slide
                v-show="product.images && product.images.length > 0"
                v-for="(image,index) in product.images" :key="index"
                :img-src="image"
              ></b-carousel-slide>
              <b-carousel-slide
                v-if="!product.images || product.images.length <= 0"
                img-src="/images/default_product.png"
              ></b-carousel-slide>
          </b-carousel>
        </div>
        <div class='product-detail-box left'>
          <label>产品详情</label>
          <div class='product-detail'>
            <div class='product-detail-title'>{{ product.name }}</div>
            <div class='product-detail-desc'>{{product.description}} </div>
            <div class='product-detail-property'>
              <div class='product-detail-property-item'>
                <label>品牌</label>
                <span>{{(product.brand && product.brand.name) || ""}}</span>
              </div>
              <div class='product-detail-property-item'>
                <label>尺寸</label>
                <span>{{product.dimensions || ""}}</span>
              </div>
              <div class='product-detail-property-item'>
                <label>材质</label>
                <span>{{ product.material || ""}}</span>
              </div>
              <div class='product-detail-property-item'>
                <label>类别</label>
                <span>{{(product.tags && product.tags.join('、')) || ""}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='product-more'>
        <div class='clearfix product-more-navbar'>
          <div class='product-more-title left'>更多精彩产品</div>
          <div class='right product-more-item'>
            <b-link class='active'>全部</b-link>
            <b-link href="/products?tags=新品">新品</b-link>
            <b-link href="/products?tags=家居">家居</b-link>
            <b-link href="/products?tags=灯具">灯具</b-link>
          </div>
        </div>
        <p>品牌中最早的一条线，关注寻常生活中真实所需的家居设计简单质朴。</p>
        <ProductList />
      </div>
    </div>
    <footer class='page-footer clearfix'>
      <p style='text-align: center;'>2021 © SIGMALIVING 风物宜</p>
    </footer>
  </div>
</template>
<style scoped>
  .product-box {
    margin: 80px 10% 0px 10%;
  }
  .product-box-carousel {
    width: 27rem;
    height: 30rem;
  }
  .product-detail-box {
    margin-left: 6rem;
  }

  .product-detail-box > label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #777777;
  }

  .product-detail-title {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .product-detail-desc {
    margin: 1.2rem 0;
    font-size: 0.8rem;
    line-height: 24px;
  }
  .product-detail-property-item > label {
    width: 6rem;
    font-size: 0.9rem;
    line-height: 1.3rem;
    font-weight: bold;
    margin-right: 40px;
  }

  .product-detail-property-item > span {
    font-size: 0.9rem;
    color: #777777;
  }

  .product-more-navbar {
    width: 100%;
  }
  .product-more > p {
    color: #777777;
    margin: 1rem 0 2rem 0;
    font-weight: 400;
  }
  .product-more-item > a {
    color: black;
    line-height: 1.4rem;
    margin: 0 0.7rem;
  }

  .product-more-item > a:hover {
    text-decoration: none;
  }

  .product-more-item .active {
    padding-bottom: 3px;
    border-bottom: 2px solid black;

  }

  .product-more-title {
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1.7rem;
  }
</style>>

<script>
import NavBar from '../../components/NavBar';
export default {
  components: {
    NavBar,
  },
  async asyncData({ params }) {
    const id = params.slug;
    return { id };
  },
  data() {
    return {product: {}};
  },
  fetchOnServer: false,
  async fetch() {
    let res = await this.$store.dispatch('api/products/show', this.id);
    this.product = res.data;
  }
};
</script>
