<template>
  <div>
    <div class='row navbar navbar-pc'>
      <a href='/' style='margin-top:-2rem;'>
        <LogoSVG :color= "logoColor" />
      </a>
      <div
        :class="fontColor === 'black'? 'navbar-item-dark':'navbar-item-light'"
        v-for="(menuItem, index) in menus.products.list" :key="index"
        @mouseover="menuItem.isShow=true"
        @mouseleave="menuItem.isShow=false"
      >
        <a :href="'/products?tags='+menuItem.label">{{menuItem.label}}</a>
         <div class='sub-menu' v-show="menuItem.isShow">
          <a href='#' class='sub-menu-title'>{{menuItem.label}}</a>
          <ul class="sub-menu-list">
            <li v-for="(item, index) in menuItem.children" :key='index'>
              <a
                :href="'/products?tags='+ item.label"
              >{{item.label}}</a>
            </li>
          </ul>
        </div>
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
      <a :href="'/products' + (mTitle === '全部产品'?('?tags='+mTitle):'')" class='m-navbar-title'>
        {{mTitle}}
      </a>
      <a class='m-navbar-ellipse'
        @click="showMobileMenu=true"
      >
        <div class='ellipse'></div>
      </a>
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
    padding: 35px 9% 0 9%;
    font-size: 0.7rem;
  }
  .navbar-item-light, .navbar-item-dark {
    padding: 25px 0px 60px;
    /* width: 8rem; */
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

  .sub-menu {
    position: absolute;
    left:0;
    top: 145px;
    /* margin: 0px 6%; */
    width: 86%;
    margin: 0 7%;
    min-height: 100px;
    z-index: 1000;
    background: rgba(255, 255, 255);
    border-radius: 5px;
    padding: 2rem 5rem;
    font-size: 0.9rem;
    border-bottom: 1px solid #c6c6c5;
  }
  .sub-menu-title {
    line-height: 26px;
    font-weight: bold;
    color: #535353;
    margin-bottom: 10px;
  }
  .sub-menu-title:hover {
    text-decoration: none;
    cursor: text;
  }
  .sub-menu-list {
    list-style: none;
    padding:0;
    /* padding: 0 5% */
  }

  .sub-menu-list > li {
    display: inline-block;
    width: 10rem;
    padding: .7rem 0 .7rem 2rem;
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

  .m-navbar-ellipse .ellipse {
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
  .navbar-m {
    background-color: white;
    padding: 24px 35px;
  }
  .m-navbar-title {
    font-weight: bold;
    font-size: 1.5rem;
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
    font-weight: bold;
    /* display:inline-block; */
    float: left;
  }

  .m-navbar-menu-list {
    list-style: none;
    text-decoration: underline;
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
    font-weight: bold;
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
import LogoSVG from '../components/LogoSVG';
export default {
  components: {
    LogoSVG,
  },
  beforeMount() {
    const tagStr = this.$route.query.tags || '全部产品';
    const tag = tagStr.split(',').pop();
    this.mTitle = tag;
  },
  data() {
    return {
      shoMenu: false,
      showMobileMenu: false,
      mTitle: '',
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
              label: 'Floor Lamp 落地灯'
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

