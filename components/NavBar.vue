<template>
  <div>
    <div class='row navbar navbar-pc'>
      <a href='/'>
        <Logo height="120" width="120" />
      </a>
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
              <a
                :href="'/products?tags='+ item.label"
                @mouseover="childMenu=item.children;childMenuTitle=item.label;"
              >{{item.label}}</a>
            </li>
          </ul>
          <div v-show="childMenu.length > 0"
            class='navbar-child-menu'
          >
            <!-- <label>{{childMenuTitle}}:</label> -->
            <ul>
              <li v-for="(child, childIdx) in childMenu" :key="childIdx">
                <a :href="'/products?tags='+ child.label">{{child.label}}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'" @mouseover="menus.brands.isShow=true" @mouseleave="menus.brands.isShow=false; childMenu=[];">
        <a href='#'>品牌</a>
        <div class='sub-menu' v-show="menus.brands.isShow">
          <ul class="sub-menu-list">
            <li v-for="(item, index) in menus.brands.list" :key='index'>
              <a :href="'/products?brand='+item._id">{{item.name}}</a>
            </li>
          </ul>
        </div>
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
    <div class='row navbar navbar-m'>
      <a href='/'>
        <Logo height="50" width="50" />
      </a>
      <div :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'"
        @click="showMobileMenu=true"
      >
        <div class='ellipse'></div>
      </div>
    </div>
    <div class='m-menu' v-show="showMobileMenu">
      <div class='m-menu-header clearfix'>
        <div class='left m-menu-header-label'>全部产品</div>
        <b-img src='/images/x-img.png' class='right' @click="showMobileMenu=false"/>
      </div>
      <div class='m-navbar-menu-body'>
        <ul class='m-navbar-menu-list'>
          <li v-for="(item, index) in menus.products.list" :key='index' class='m-navbar-menu-list-1'>
            <a
              :href="'/products?tags='+ item.label"
            >{{item.label}}</a>
            <ul class='m-navbar-menu-list'>
              <li v-for="(child, childIdx) in item.children" :key="childIdx">
                <a :href="'/products?tags='+ child.label">{{child.label}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media only screen and (max-width: 800px) {
    .navbar-pc {
      display: none;
    }
    .navbar-m {
      display: flex;
    }
    .ellipse {
      display: block;
    }
  }
  @media only screen and (min-width: 800px) {
    .navbar-pc {
      display: flex;
    }
    .navbar-m {
      display: none;
    }
    .ellipse {
      display: none;
    }
  }
  .navbar {
    padding: 35px 10% 0 10%;
    font-size: 1.5rem;
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
    text-decoration-line: none;
    padding-bottom: 6px;
    border-bottom: 2px solid black;
  }
  .wechat-official-account-qr-img {
    position: absolute;
    top: 105px;
    width: 150px;
    height: 150px;
    z-index: 1000;
  }
  .sub-menu {
    position: absolute;
    left:0;
    top: 130px;
    /* margin: 0px 6%; */
    width: 100%;
    min-height: 100px;
    z-index: 1000;
    background: rgba(255, 255, 255);
    border-radius: 5px;
    padding: 2rem;
    font-size: 1.2rem;
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
    /* width: 7rem; */
    padding: 0.5rem 1.5rem;
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
  .navbar-child-menu {
    width: 80%;
    margin-top: 1rem;
    margin: 0 10%;
  }
  .navbar-child-menu > label{
    font-weight: 500;
    padding-left: 1.5rem;
  }
  .navbar-child-menu > ul {
    list-style: none;

  }
  .navbar-child-menu > ul > li {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
  .navbar-child-menu > ul > li > a {
    color: black;
  }

  .m-menu {
    position: absolute;
    background: white;
    width: 100%;
    top: 0;
    padding: 2rem 1.5rem;
    z-index: 1200;
  }

  .m-menu-header-label {
    font-size: 1.2rem;
    font-weight: 500;
    /* display:inline-block; */
    float: left;
  }

  .m-navbar-menu-list {
    list-style: none;
  }

  .m-navbar-menu-list {
    margin: 0;
    padding: 0 1rem;

  }
  .m-navbar-menu-list > .m-navbar-menu-list-1 {
    width: 50%;
    display: inline-block;
    vertical-align: top;
    margin-top: 0.5rem;
  }

  .m-navbar-menu-list-1 > a {
    font-weight: 500;
    display: block;
    height: 2.5rem;
  }
  .m-navbar-menu-list> li > a {
    color: black;
  }

  .m-navbar-menu-list-1 > ul > li {
    margin: 10px 0;
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
      showMobileMenu: false,
      menus: {
        products: {
          list: [{
            label: '新品 New',
            children: [],
          }, {
            label: 'Art Design 设计家具 ',
            children: [],
          },{
            label: 'Furniture 家具',
            isShow: false,
            children: [{
              label: 'Chair 椅'
            },{
              label: 'Lounge 休闲椅'
            },{
              label: 'Sofa 沙发'
            }, {
              label: 'Table 桌'
            }, {
              label: 'Coffee Table 茶几'
            },{
              label: 'Desk 书桌'
            },{
              label: 'Storage 柜'
            }, {
              label: 'Shelf 架'
            },{
              label: 'Bed 床'
            },{
              label: 'Night Table 床头柜'
            }]
          },{
            label: 'Lighting 灯',
            isShow: false,
            children: [{
              label: 'Table Lamp 台灯'
            },{
              label: 'Wall Lamp 壁灯'
            },{
              label: 'Ceiling Lamp 顶灯'
            }, {
              label: 'Standing Lamp 落地灯'
            }]
          },{
            label: 'Lifestyle 生活家居',
            isShow: false,
            children: [{
              label: 'Candle 蜡烛香氛'
            },{
              label: 'Rug 毯'
            },{
              label: 'Accessories 其他家居'
            },]
          },{
            label: 'Arts&Prints 艺术及及印刷品',
            isShow: false,
            children: [{
              label: 'Arts 艺术品'
            },{
              label: 'Prints 印刷画'
            },{
              label: 'Frame 画框'
            }]
          }],
          isShow: false,
        },
        brands: {
          list: [],
          isShow: false,
        },
        wechatOfficialAccountQrImg: {
          isShow: false,
        }
      },
      childMenu: [],
      childMenuTitle: '',
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

