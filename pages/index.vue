<template>
  <b-container fluid style='padding: 0px;overflow-x:hidden;'>
    <div>
      <NavBar logoColor="black" current="首页" fontColor="black" style='color: black;'/>
      <div class='carousel-box'>
        <div v-swiper:mySwiper="swiperOption" class="swiperWrap" ref='mySwiper'>
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(image,index) in carousel.images" :key="index">
              <img :src="image.url">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='home-body clearfix'>
      <div class='introduction-area left'>
        <div class='introduction-brand'>关于风物宜</div>
        <div class='introduction-title' style='margin-right:1.5rem;'>sigma取自希腊字母“∑”，意为包涵、包容。旨在以纯粹自然之心面对生活，尊重工艺与品质，探讨产品与使用者之间永恒持续的关系。</div>
        <div class='introduction-breif'></div>
        <!-- <div class='introduction-content'>我们专注于经典北欧设计与新北欧设计的家具、灯具品牌，更有家居生活小物，以及价格平易近人的艺术品。基于欧洲零售价的定价，让顾客更轻松地接近美好生活。</div> -->
      </div>
      <div class='product-area'>
        <div class='product-area-title'>产品</div>
        <ProductList />
      </div>
      <footer class='page-footer clearfix'>
        <p style='text-align: center;'>2021 © SIGMALIVING 风物宜</p>
      </footer>
    </div>

  </b-container>
</template>

<script>
import NavBar from '../components/NavBar';
import ProductList from '../components/ProductList';

export default {
  components: {
    NavBar,
    ProductList,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      isShowProductMenu: false,
      carousel: {images: []},
      swiperOption: {
        loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 10,
        autoplay: true,
      }
    };
  },
  mounted() {
    this.$refs.mySwiper.swiper.slideTo(1);
  },
  methods: {
    showProductMenu() {
      this.isShowProductMenu = true;
    },
    hideProductMenu() {
      this.isShowProductMenu = false;

    }
  },
  fetchOnServer: false,
  async fetch() {
    let res = await this.$store.dispatch('api/carousels/index', {page: 1, size: 20});
    let carousel = res.data.docs[0];
    if(carousel && carousel.images.length > 0) {
      this.carousel = carousel;
    }
  }
};
</script>


<style>

  @media only screen and (max-width: 800px) {
    .home-body {
      padding: 1rem !important;
    }
    .introduction-area {
      padding: 0 !important;
    }

    .introduction-area {
      padding: 0 !important;
    }
    .product-area {
      padding: 0 !important;
    }

    .swiper-slide > img {
      height: 30rem;
    }

  }
  .swiper-slide {
    overflow: hidden;
    /* vertical-align: middle; */
  }

  .swiper-slide > img {
    height: 25rem;
  }
  .swiper-slide-active {
    width: 60% !important;
  }
  /* .swiper-slide-next {
    padding-left: 1rem;
  } */


  .swiper-slide-next, .swiper-slide-prev {
    padding: 1rem 0;
    width: 20% !important;
  }
  /* .swiper-slide-next, .swiper-slide-pre {
    margin: 1rem 0;
  } */
  .carousel-box {
    padding: 2.5rem 14% 7rem 14%;
  }
  .carousel-indicators {
    margin-bottom: 2.5rem;
  }
  .carousel-indicators .active {
    border: 4px solid white;
    border-radius: 4px;;
  }
  .carousel-indicators li {
    width: 0;
    height: 0;
    border: 3px solid #c6c6c6;
    border-radius: 3px;
    margin: 0px 10px;
    opacity: 1;
  }
  .home-body {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
    /* background-color: #E5E5E5; */
  }

  .introduction-area {
    padding: 3rem 3.5rem;
    width: 100%;
    border-radius: 5px 5px 0 0;
    margin-top: -7rem;
    background:white;
  }

  .introduction-area  .introduction-img {
    max-width: 55.5rem;
    width: 100%;
    float:left;
    margin-top: 0.75rem;
    margin-bottom:1.5rem;
  }

  .introduction-brand {
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  .introduction-title {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 2rem;
    margin-bottom: 1.5rem;
  }

  .introduction-breif {
    max-width: 27rem;
    float: left;
    font-weight: bold;
    margin-bottom: .75rem;
  }

  .introduction-content {
    /* max-width: 27rem; */
    float: left;
    /* font-size:0.92rem; */
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .product-area {
    padding: 4rem 3.5rem 3rem 3.5rem;
    background-color: white;
    border-radius: 0 0 5px 5px;
  }

  .product-area-title {
    opacity: 0.3;
    margin-bottom: 1rem;
  }
</style>
