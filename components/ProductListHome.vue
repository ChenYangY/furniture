<template>
  <div class="product-list-box">
    <div class="product-list clearfix">
      <div
        v-for="(product, index) in list"
        :key="index"
        class="product-list-item"
      >
        <b-link :href="'/products/' + product._id">
          <div class='product-list-item-img'>
            <b-img :src="product.images[0]" v-if="product && product.images[0]" />
            <b-img src="/images/default_product.png" v-if="!product || !product.images[0]"/>
          </div>
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
  @media only screen and (max-width: 800px) {
    .product-list-item {
      width: 100% !important;
      padding: 0 5px !important;
      height: auto !important;
    }

    .product-list-item-img {
      height: auto !important;
      display: block;
    }
  }
  .item-margin {
    margin-right: 1.5rem;
  }
  .product-list-item {
    padding: 0 10px;
    display: inline-block;
    vertical-align: top;
  }
  .product-list-item-img {
    height: 500px;
    overflow:hidden;
    display: flex;
  }
  .product-list-item img {
    width: 100%;
    /* max-height: 500px; */
  }
  .product-list-item > a {
    color: black;
    display: block !important;
    float: left;
    width: 100%;
  }

  .product-list-item > a:hover {
    text-decoration: none;
  }
  .product-list-item-name {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin: 1rem 0;
    /* height: 4rem; */
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
      colNum: 3,
      colHeight: 500,
    };
  },
  props: {
    tags: String,
    name: String,
    brand: String,
    rowItems: Number,
    itemHeight: Number
  },
  fetchOnServer: false,
  mounted() {
    const width = document.documentElement.clientWidth;
    if(this.rowItems > 0 && width > 800) {
      this.colNum = this.rowItems;
    }
    if(this.itemHeight > 0 && width > 800) this.colHeight = this.itemHeight;
    let style = document.createElement('style');
    style.innerHTML = `.product-list-item { width: ${(100/this.colNum).toFixed(2)}%;}.product-list-item-img {height: ${this.colHeight}px;}`;
    document.body.append(style);
  },
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

