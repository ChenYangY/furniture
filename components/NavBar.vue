<template>
  <div class='row navbar'>
    <Logo :color= "logoColor" />
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'">
      <a href='/' :class="current === '首页'? 'active':''">首页</a>
    </div>
    <div
      :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'"
      @mouseover="menus.products.isShow=true" @mouseleave="menus.products.isShow=false">
      <a href='#' :class="current === '产品'? 'active': ''" >产品</a>
      <div class='sub-menu' v-show="menus.products.isShow">
        <ul class="sub-menu-list">
          <li v-for="(item, index) in menus.products.list" :key='index'>
            <a :href="'/products?tags='+item.label">{{item.label}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'" @mouseover="menus.brands.isShow=true" @mouseleave="menus.brands.isShow=false">
      <a href='#'>品牌</a>
      <div class='sub-menu' v-show="menus.brands.isShow">
        <ul class="sub-menu-list">
          <li v-for="(item, index) in menus.brands.list" :key='index'>
            <a :href="'product?brand='+item._id">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'">
      <a href='#' >公众号</a>
    </div>
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'">
      <a href='/about-us' :class="current === '关于我们'? 'active': ''">关于我们</a>
    </div>
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'">
      <b-input-group class='search'>
        <b-input-group-prepend>
          <b-img src='/images/grey_search.png' />
        </b-input-group-prepend>
        <b-form-input @change='search($event)' style='border: 0;' type='text' placeholder="在此输入搜索内容"/>
      </b-input-group>

    </div>
    <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'">
      <div class='ellipse'></div>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    padding: 35px 10% 0 10%;
    /* border: 1px solid black; */
  }
  .navbar-item-light, .navbar-item-dark {
    padding: 25px 0px;
    text-decoration-line: none;
  }
  .navbar-item-light > a {
    color:#FFF;
  }

  .navbar-item-dark > a {
    color: black;
  }
  .navbar-item-light > a:hover {
    text-decoration-line: none;
    /* color: #FFF; */
    padding-bottom: 6px;
    border-bottom: 2px solid #fff;
  }

  .navbar-item-dark > a:hover {
    text-decoration-line: none;
    padding-bottom: 6px;
    border-bottom: 2px solid black;
  }

  .navbar-item-light .active {
    text-decoration-line: none;
    padding-bottom: 6px;
    border-bottom: 2px solid #fff;
  }

  .navbar-item-dark .active {
    padding-bottom: 6px;
  }

  .sub-menu {
    position: absolute;
    left:0;
    top: 105px;
    /* margin: 0px 6%; */
    width: 100%;
    min-height: 100px;
    z-index: 1000;
    background: rgba(255, 255, 255);
    border-radius: 5px;
    padding: 2rem;
    border-bottom: 1px solid #c6c6c5;
  }
  .sub-menu-title {
    line-height: 26px;
    font-size: 18px;
    font-weight: bold;
    color: #535353;
    margin-bottom: 10px;
  }
  .sub-menu-list {
    list-style: none;
    padding: 0 10%
  }

  .sub-menu-list > li {
    display: inline-block;
    width: 7rem;
    margin-top: 0.5rem;
  }

  .sub-menu-list > li > a {
    color: black;
  }

  .navbar-item-light > .search, .navbar-item-dark > .search {
    width: 11.8rem;
    height: 1.8rem;
    background: white;
    overflow: hidden  ;
    border-radius: 2px;
    border: 1px solid #c6c6c6;
  }
  .navbar-item-dark > .search img, .navbar-item-light > .search img {
    padding: .4rem 0.75rem;
    height: 1.8rem;
  }
  .search input {
    padding: 0;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .navbar-item-light .ellipse {
    height: .4rem;
    width: 1.4rem;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
  }

  .navbar-item-dark .ellipse {
    height: .4rem;
    width:1.4rem;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

</style>
<script>
import Logo from '../components/Logo';
export default {
  components: {
    Logo,
  },
  data() {
    return {
      shoMenu: false,
      menus: {
        products: {
          list: [{
            label: '新品',
          }, {
            label: '设计家具',
          },{
            label: '家具',
          },{
            label: '灯具',
          },{
            label: '生活家居',
          },{
            label: '艺术及及印刷品'
          }],
          isShow: false,
        },
        brands: {
          list: [],
          isShow: false,
        },
      }
    };
  },
  props: ['logoColor', 'fontColor', 'current'],
  fetchOnServer: false,
  async fetch() {
    let res = await this.$store.dispatch('api/brands/index', {page: 1, size: 30});
    this.menus.brands.list = res.data.docs || [];
  },
  methods: {
    search(text) {
      window.location.href = `/products?name=${text}`;
    }
  }
};
</script>

