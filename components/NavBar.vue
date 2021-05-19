<template>
  <div class='row navbar'>
    <Logo :color= "logoColor" />
    <div class='navbar-item'>
      <a href='#' :class="current === '首页'? 'active': ''">首页</a>
    </div>
    <div class='navbar-item' @mouseover="menus.products.isShow=true" @mouseleave="menus.products.isShow=false">
      <a href='#' :class="current === '产品'? 'active': ''" >产品</a>
      <div class='sub-menu' v-show="menus.products.isShow">
        <ul class="sub-menu-list">
          <li v-for="(item, index) in menus.products.list" :key='index'>
            <a href='#'>{{item.label}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class='navbar-item' @mouseover="menus.brands.isShow=true" @mouseleave="menus.brands.isShow=false">
      <a href='#'>品牌</a>
      <div class='sub-menu' v-show="menus.brands.isShow">
        <ul class="sub-menu-list">
          <li v-for="(item, index) in menus.brands.list" :key='index'>
            <a href='#'>{{item.label}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class='navbar-item'>
      <a href='#' >公众号</a>
    </div>
    <div class='navbar-item'>
      <a href='#' :class="current === '关于我们'? 'active': ''">关于我们</a>
    </div>
    <div class='navbar-item'>
      <b-input-group class='search'>
        <b-input-group-prepend>
          <b-img src='/images/grey_search.png' />
        </b-input-group-prepend>
        <b-form-input :change='search' style='border: 0;'/>
      </b-input-group>

    </div>
    <div class='navbar-item'>
      <b-img src='/images/menu_item_light.png' width="28px" height="12px"/>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    padding: 32px 10% 0px 10%;
  }
  .navbar-item {
    padding: 25px 0px;
    text-decoration-line: none;
  }
  .navbar-item > a {
    color:#FFF;
  }
  .navbar-item > a:hover {
    text-decoration-line: none;
    color: #FFF;
    padding-bottom: 6px;
    border-bottom: 2px solid #fff;
  }

  .navbar-item .active {
    text-decoration-line: none;
    color: #FFF;
    padding-bottom: 6px;
    border-bottom: 2px solid #fff;
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
    padding: 1rem;
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

  .navbar-item > .search {
    width: 11.8rem;
    height: 1.8rem;
    background: white;
    overflow: hidden  ;
    border-radius: 2px;
  }
  .navbar-item > .search img {
    padding: .4rem 0.75rem;
    height: 1.8rem;
  }
  .search input {
    padding: 0;
    height: 1.8rem;
    line-height: 1.8rem;
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
  props: ['logoColor', 'current'],
  fetchOnServer: false,
  async fetch() {
    // TODO: add request
    this.menus.brands.list = [{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    },{
      label: '宜家'
    }];
  },
  methods: {
    search(text) {
      console.log(text);
    }
  }
};
</script>

