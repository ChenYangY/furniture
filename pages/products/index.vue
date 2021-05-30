<template>
  <div>
    <NavBar  logoColor='black' style='color: black;' fontColor="black"/>
    <div>
      <div class='product-all-box'>
        <div class='clearfix product-all-box-navbar'>
          <div class='product-all-title left'>全部产品</div>
          <div class='right product-all-item'>
            <b-link href="/products?tags=新品">新品</b-link>
            <b-link href="/products?tags=家居">家居</b-link>
            <b-link href="/products?tags=灯具">灯具</b-link>
          </div>
        </div>
        <p>品牌中最早的一条线，关注寻常生活中真实所需的家居设计简单质朴。</p>
        <ProductList :tags="tags" :brand="brand" :name="name"/>
      </div>
    </div>
    <footer class='page-footer clearfix'>
      <p style='text-align: center;'>2021 © SIGMALIVING 风物宜</p>
    </footer>
  </div>
</template>
<style scoped>
  .product-all-box {
    padding: 5rem 10% 0 10%;
  }
  .product-all-box-navbar {
    width: 100%;
  }
  .product-all-title {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.7rem;
  }
  .product-all-item > a {
    color: black;
    margin: 0 .7rem;
    font-weight: 700;
  }
  .product-all-box > p {
    margin: 1rem 0 2rem 0;
    color: #777777;
    font-size: 0.8rem;
  }
  .product-all-item .active {
    border-bottom: 2px solid black;
  }

  .product-all-item > a:hover {
    text-decoration: none;
  }

</style>
<script>
import ProductList from '../../components/ProductList';
import NavBar from '../../components/NavBar';

export default {
  data() {
    return {
      tags: '',
      name: '',
      brand: '',
    };
  },
  created: function() {
    this.tags = this.$route.query.tags;
    this.brand = this.$route.query.brand || '';
    this.name  =this.$route.query.name || '';
  },
  compenents: {
    ProductList,
    NavBar,
  },

};
</script>
