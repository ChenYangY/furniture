<template>
  <div class='row navbar'>
    <Logo :color= "logoColor" />
    <div class='navbar-item'>
      <a href='#' >首页</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >新品</a>
    </div>
    <div class='navbar-item' @mouseover="showSubMenu=true" @mouseleave="showSubMenu=false">
      <a href='#' >家具</a>
      <div class='sub-menu' v-show="showSubMenu">
        <div class='sub-menu-title'>家具</div>
        <ul class='sub-menu-list'>
          <li><a>椅子</a></li>
          <li><a>椅子</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>沙发</a></li>
          <li><a>沙发</a></li>
          <li><a>沙发</a></li>
          <li><a>沙发</a></li>
          <li><a>沙发</a></li>
          <li><a>沙发</a></li>
          <li><a>床头柜</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>桌</a></li>
          <li><a>沙发</a></li>
          <li><a>床头柜</a></li>
          <li><a>床头柜</a></li>
          <li><a>床头柜</a></li>
          <li><a>床头柜</a></li>
          <li><a>床头柜</a></li>
          <li><a>床头柜</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
          <li><a>休闲椅</a></li>
        </ul>
      </div>
    </div>
    <div class='navbar-item'>
      <a href='#' >灯</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >生活家居</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >艺术及印刷品</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >品牌</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >公众号</a>
    </div>
    <div class='navbar-item'>
      <a href='#' >关于我们</a>
    </div>
    <div class='navbar-item'>
      <b-img src='/images/ellipse_light.png' width="22px" height="22px"/>
    </div>
    <div class='navbar-item'>
      <b-img src='/images/menu_item_light.png' width="28px" height="12px"/>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    padding: 32px 147px 0px 147px;
    position: fixed;
    width: 100%;
    background: #c6c6c6;
    z-index: 1000;
  }
  .row {
    margin: 0;
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

  .sub-menu {
    position: absolute;
    left:0;
    top: 105px;
    margin: 0px 6%;
    width: 88%;
    min-height: 200px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 5px;
    padding: 45px 70px;
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
    padding: 0;
  }

  .sub-menu-list > li {
    display: inline-block;
    width: 100px;
    margin-top: 15px;
    margin-right: 80px;
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
      showSubMenu: false,
    };
  },
  props: ['logoColor']
};
</script>

