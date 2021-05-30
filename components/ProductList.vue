<template>
  <div class="product-list-box">
    <div class="product-list clearfix">
      <div
        v-for="(product, index) in list"
        :key="index"
        :class="'product-list-item left '+ (index%2 == 0?'item-margin': '')"
      >
        <b-link :href="'/products/' + product._id">
          <b-img :src="product.images[0]" v-if="product && product.images[0]" width=540 heigth=400 />
          <b-img src="/images/default_product.png" v-if="!product || !product.images[0]" width=540 heigth=400 />
          <div class='product-list-item-name'>{{product.name}}</div>
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

  .product-list-item img {
    width: 27rem;
    height: 20rem;
  }
  .product-list-item > a {
    color: black;
  }

  .product-list-item > a:hover {
    text-decoration: none;
  }
  .product-list-item-name {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin: 1rem 0;
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

