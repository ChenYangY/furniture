<template>
  <div class="product-list-box">
    <div class='proudct-list clearfix'>
      <Waterfall
        :list="list"
        :gutter="10"
        :breakpoints="{
          1200: { //当屏幕宽度小于等于1200
            rowPerView: 4,
          },
          800: { //当屏幕宽度小于等于800
            rowPerView: 3,
          },
          500: { //当屏幕宽度小于等于500
            rowPerView: 2,
          }
        }"
        ref="waterfall"
        >
        <template slot="item" slot-scope="props">
          <div class="card">
            <img :src="props.data.images[0]" alt="" @load="$refs.waterfall.refresh()">
            <p>{{props.data.name}}</p>
          </div>
        </template>
      </Waterfall>
    </div>
    <div v-if="total === 0" style='width: 100%; heigth: 25rem; margin-top: 10rem;'>
        <p style='color: #77777; font-size: 1.5rem;text-align:center;heigth: 25rem;'>暂无产品内容</p>
    </div>
    <p style='text-align:center;margin-top: 2.5rem;'>
      <b-button @click="nextPage()" class='product-load-more' v-show="total >= (page*size)">查看更多</b-button>
    </p>
  </div>
</template>
<style scoped>
  @media only screen and (max-width: 800px) {
    .product-list-item img {
      /* height: 350px !important; */
    }
    .product-list-page {
      columns: 2 !important;
      column-gap: 3px !important;
    }
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
  }

  .item-margin {
    margin-right: 1.5rem;
  }
  .product-list-item {
    width: 25%;
    padding: 0 5px;
    display: inline-block;
    vertical-align: top;
    flex-direction: column;
    /* float: left; */
    /* float:left; */
    /* height: 500px; */
  }
  .product-list-item img {
     width: 100%;
     vertical-align: top;
     /* height: 500px; */
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
    font-size: 0.8rem;
    line-height: 1.2rem;
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
import Waterfall from 'vue-waterfall-plugin';
export  default  {
  components: {
    Waterfall
  },
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

