<template>
  <b-container fluid style='padding: 0px;'>
    <b-navbar toggleable="lg" type="light" variant="Secondary">
      <b-navbar-brand href="#">Logo</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" disabled>首页</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav
          v-on:mouseenter="showProductMenu"
          v-on:mouseleave="hideProductMenu"
        >
          <b-nav-item href="#">产品</b-nav-item>
          <b-nav class='sub-nav-block'
            v-show='isShowProductMenu'
          >
            <b-nav-item>新品</b-nav-item>
            <b-nav-item>设计家居</b-nav-item>
            <b-nav-item>家居</b-nav-item>
            <b-nav-item>灯具</b-nav-item>
            <b-nav-item>生活家居</b-nav-item>
            <b-nav-item>艺术及印刷制品</b-nav-item>
          </b-nav>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item href="#">品牌</b-nav-item>
          <b-nav-item href="#">公众号</b-nav-item>
          <b-nav-item href="#">关于我们</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="搜索产品"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class=''>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">Collapse contents Here</p>
          <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
          <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card>Hello!</b-card>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
          <h1>Hello world!</h1>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://picsum.photos/1024/480/?image=55"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div class='mt-1' style='text-align:center; '>
      <p style='font-weight: 500;
    display: inline-block;
    border-bottom: 2px solid black;
    margin: 30px auto;
    width: 75px;'>产品展示</p>
     <b-card-group deck>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
          <b-link href="https://www.baidu.com">
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            style="max-width: 20rem;"
            class="mb-2"
            align="center"
            >
              <b-card-text>hello</b-card-text>
            </b-card>
          </b-link>
      </b-card-group>
    </div>
    <div class='mt-2' style='text-align:center;'>
      <b-button center variant="light">加载更多</b-button>
    </div>

    <footer>
        <p style='text-align: center;'>all rights reserved</p>
    </footer>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      isShowProductMenu: false
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    showProductMenu(e) {
      console.log(e);
      this.isShowProductMenu = true;
    },
    hideProductMenu() {
      this.isShowProductMenu = false;

    }
  }
};
</script>


<style>
  .sub-nav-block {
    position:absolute;
    left: 0;
    right: 0;
    top: 100%;
    background-color:#f8f9fa;
    height: 60px;
    z-index: 1;
    opacity: 0.9;
  }
</style>
