<template>
  <div class="product-list-box">
    <div class="product-list clearfix">
      <div
        v-for="(product, index) in list"
        :key="index"
        class="product-list-item"
      >
        <b-link :href="'/products/' + product._id">
          <b-img :src="product.images[0]" v-if="product && product.images[0]" />
          <b-img src="/images/default_product.png" v-if="!product || !product.images[0]"/>
          <p class='product-list-item-name'>{{product.name}}</p>
        </b-link>
      </div>
      <div v-if="total === 0" style='width: 100%; heigth: 25rem; margin-top: 10rem;'>
        <p style='color: #77777; font-size: 1.5rem;text-align:center;heigth: 25rem;'>暂无产品内容</p>
      </div>
    </div>
    <p style='text-align:center;margin-top: 2.5rem;'>
    <b-button @click="nextPage()" class='product-load-more' v-show="total >= (page*size)">查看更多</b-button>
    </p>
  </div>
</template>
<style scoped>
  .item-margin {
    margin-right: 1.5rem;
  }
  .product-list-item {
    width: 25%;
    padding: 0 10px;
    display: inline-block;
  }
  .product-list-item img {
     width: 100%;
     height: 500px;
  }
  .product-list-item > a {
    color: black;
    display: block !important;
    float: left;
  }

  .product-list-item > a:hover {
    text-decoration: none;
  }
  .product-list-item-name {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin: 1rem 0;
    height: 4rem;
  }
  .product-load-more {
    border-radius: 5px;
    text-align: center;
  }
</style>
<script>
import _ from 'lodash';
export  default  {
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      total: 10,
    };
  },
  props: {
    tags: String,
    name: String,
    brand: String,
  },
  fetchOnServer: false,
  methods: {
    async nextPage() {
      _.debounce(this.$fetch, 1000);
      this.page += 1;
      await this.$fetch();
    },
  },
  async fetch() {
    let params = {page: this.page, size: this.size};
    if(this.tags) {
      params.tags = this.tags;
    }
    if(this.name) {
      params.name = this.name;
    }
    if(this.brand) {
      params.brand = this.brand;
    }
    let res = await this.$store.dispatch('api/products/index', params);
    let data = res.data;
    this.total = data.count;
    this.list = this.list.concat(data.docs);
  }
};
</script>

