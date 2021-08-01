<template>
  <b-container fluid style='padding: 0px;overflow-x:hidden;'>
    <div style="background-color:#c6c6c6">
      <NavBar logoColor="white" current="首页" fontColor="white" style='color: black;' />
    </div>
    <div class='carousel-box clearfix' ref='carousel_box'>
      <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="10000"
      indicators
      background="#ababab"
      img-width="1024"
      img-height="788"
      style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide v-for="(image, index) in carousel.images" :key="index"
          :img-src="image.url"
        />
      </b-carousel>
    </div>
    <div class='home-body clearfix'>
      <div class='introduction-area'>
        <div class='introduction-brand'>关于风物宜</div>
        <div class='introduction-body'>
            <div class='introduction-title'>SIGMA 取自希腊字母“∑”，意为包涵、包容。旨在以纯粹自然之心面对生活，尊重工艺与品质，探讨产品与使用者之间永恒持续的关系。</div>
            <div class='introduction-body-content'>
              <div class='introduction-subtitle'>有别于延续传统工艺探索的设计，FF系列在设计语言上更为简洁直接， 以多元材质和工艺结合赋予家具更多可能。</div>
              <div class='introduction-content'>品牌中最早的一条线，关注寻常生活中真实所需的家居设计，简单质朴，在葆有中国的设计语言的基础上，将大自然中的树木变为与家相融的家具，在四季更迭中长久陪伴，慢慢变成我们的家人。</div>
            </div>
        </div>
        <div style='text-align:center; max-width: 100%; max-height: 600px; overflow: hidden;'>
          <b-img  style='width: 100%;' src='/images/introduction_img.png' />
        </div>
        <div class='introduction-breif'>
          <div style='padding-right: .75rem;'>脊线系列的灵感来源于大自然以及儿时记忆，扎根中国传统文化，将更具东方空灵艺术性的元素融合深沉肃穆的设计语言。以螳螂椅为首款产品，历时3年，从设计、结构到工艺，不断推敲升级产品线</div>
          <div style='padding-right: .75rem;'>采用大曲线，多细节的实木加工，配合国际品牌的面料，突出现代中国家具的雕塑感，艺术感以及为生活带来仪式感。</div>
        </div>
      </div>

      <div class='product-area'>
        <div class='product-area-title'>产品</div>
        <div class='product-area-spec-header'>
          <div class='product-area-spec-body'>
            <div class='product-area-spec-body-header'>好物艺术集合室内植物无限遐想</div>
            <div class='product-area-spec-body-content'>脊线系列的灵感来源于大自然以及儿时记忆，扎根中国传统文化，将更具东方空灵艺术性的元素融合深沉肃穆的设计语言。以螳螂椅为首款产品，历时3年，从设计、结构到工艺，不断推敲升级产品线</div>
          </div>
          <div class='product-area-spec-detail'>
            <div class='product-spec-detail-item'>
              <label>Project</label>
              <span>Portland UI Kit</span>
            </div>
            <div class='product-spec-detail-item'>
              <label>Client</label>
              <span>Craftwork</span>
            </div>
            <div class='product-spec-detail-item'>
              <label>Deliverable</label>
              <span>Website</span>
            </div>
            <div class='product-spec-detail-item'>
              <label>Field</label>
              <span>Branding</span>
            </div>
          </div>
        </div>
        <div class='product-area-spec-img'>
          <b-img style='width: 50%;padding-right: .75rem;' src='/images/first_production.png' />
          <b-img style='width: 50%;padding-left: .75rem;' src='/images/first_production_1.png' />
        </div>
        <div style='margin-top: 1.5rem; font-size: 0.9rem; line-height: 1.6rem; opacity: 0.5;'>
          <p>艺术画廊包含艺术展览、艺术橱窗以及快闪等多个艺术相关活动。拓展传统艺术的界限，挖掘艺术的无限可能性，让观众感知以不同载体呈现的艺术，并带领他们进入无限遐想的艺术世界。为了深入探索家具主人的生活态度，观察家具与人、人与人之间的亲密连结，自制栏目“在家”、“串门”，从不同维度出发，讲述家具，设计与人的故事。</p>
        </div>
      </div>
      <div class='product-area-list'>
        <ProductListHome />
      </div>
      <footer class='page-footer clearfix'>
        <p style='text-align: center;'>2021 © SIGMALIVING 风物宜</p>
      </footer>
    </div>

  </b-container>
</template>

<script>
import NavBar from '../components/NavBar';
import ProductListHome from '../components/ProductListHome';

export default {
  components: {
    NavBar,
    ProductListHome,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      isShowProductMenu: false,
      carousel: {images: []},
    };
  },
  beforeMount() {
    // let width = document.body.clientWidth;
    // console.log(width);
    // if(width < 1400 && width > 960) {
    //   this.swiperOption.slidesPerView = 1.18;
    // }
    // else if(width < 960 && width > 480) {
    //   this.swiperOption.slidesPerView = 1.30;
    //   this.swiperOption.spaceBetween = 20;
    // }
    // else if(width <= 480) {
    //   this.swiperOption.slidesPerView = 1.30;
    //   this.swiperOption.spaceBetween = 10;
    // }
  },
  mounted() {
    // let height = document.documentElement.clientHeight;
    // let width = document.documentElement.clientWidth;
    // if(width < 800) {
    //   this.$refs.carousel_box.setAttribute('style', `height: ${height - 130}px`);
    // }
    // else {
    //   this.$refs.carousel_box.setAttribute('style', `height: ${height -200}px`);
    // }

    // this.$refs.mySwiper.swiper.slideTo(1);
  },
  methods: {
    showProductMenu() {
      this.isShowProductMenu = true;
    },
    hideProductMenu() {
      this.isShowProductMenu = false;
    },
    prevCarousel() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    nextCarousel() {
      this.$refs.mySwiper.swiper.slideNext();
    }
  },
  fetchOnServer: false,
  async fetch() {
    let res = await this.$store.dispatch('api/carousels/index', {page: 1, size: 20});
    let carousel = res.data.docs[0];
    if(carousel && carousel.images.length > 0) {
      const width = document.documentElement.clientWidth;
      let field = 'pc_url';
      if(width < 720) {
        field = 'm_url';
      }
      carousel.images.forEach(image => {
        image.url = image[field];
      });
    }
    this.carousel = carousel;
  }
};
</script>


<style>

  @media only screen and (max-width: 800px) {
    .carousel-box {
      display: none;
    }
    .introduction-area {
      display: none;
    }
    .product-area-title {
      display: none;
    }
    .product-area-list {
      padding: 0 !important;
    }
    .product-area {
      padding-top: 0 !important;
    }
    .product-area {
      display: none;
    }
    .home-body {
      padding: 1rem !important;
      background-color: white !important;
    }
    .introduction-area {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .introduction-area {
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-top: 0 !important;
    }
    .product-area {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }


  @media only screen and (max-width: 720px) {
    .swiper-button-prev, .swiper-button-next {
      display: none;
    }
  }

  .tab-item {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }


  .tab-item > img {
    width: 100%;
    height: 100%;
  }

  .carousel-box {
    /* padding-top: 1.5rem; */
    max-height: 788px;
    z-index: 1000;
    overflow: hidden;
  }
  .carousel-indicators {
    top: 600px;
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
    background-color: #E5E5E5;
    position: absolute;
    width: 100%;
  }

  .introduction-area {
    padding: 3rem 3.5rem;
    width: 100%;
    border-radius: 5px ;
    background:white;
    margin-top: -7rem;
    z-index: 1000;

  }

  .introduction-area  .introduction-img {
    max-width: 55.5rem;
    width: 100%;
    float:left;
    margin-top: 0.75rem;
    margin-bottom:1.5rem;
  }

  .introduction-body {
    display: flex;;
  }

  .introduction-brand {
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  .introduction-title {
    font-size: 2rem;
    font-weight: bold;
    line-height: 3rem;
    margin-bottom: 1.5rem;
    width:50%;
    padding-right: .75rem;
  }
  .introduction-body-content {
    width: 50%;
    padding-left: .75rem;
  }
  .introduction-subtitle {
    font-weight: bold;
    line-height: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .introduction-breif {
    display: flex;
    flex-wrap: wrap;
    padding-top: 1.5rem;
  }

  .introduction-breif > div{
    width: 50%;
    opacity: 0.5;
  }

  .introduction-content {
    /* max-width: 27rem; */
    float: left;
    /* font-size:0.92rem; */
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .product-area {
    /* margin-top: 4rem; */
    padding: 4rem 3.5rem 3rem 3.5rem;
    background-color: #e5e5e5;
    /* border-radius: 0 0 5px 5px; */
  }
  .product-area-title {
    width: 100%;
  }

  .product-area-spec-header {
    width: 100%;
    display: flex;
    padding-right: .75rem;
  }

  .product-area-spec-body {
    width: 60%;
    padding-right: 5rem;
    margin-bottom: 3rem;
    font-size: .9rem;
  }

  .product-area-spec-body-header {
    font-weight: bold;
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: .9rem;
  }
  .product-area-spec-body-content {
    opacity: .5;
  }
  .product-area-spec-detail {
    width: 40%;
    padding-left: 1.25rem;
  }

  .product-spec-detail-item {
    margin-bottom: 1.8rem;
  }

  .product-spec-detail-item > label {
    font-weight: bold;
    width: 5rem;
    margin-right: 3rem;
    margin-bottom: 0;
  }

  .product-spec-detail-item > span {
    color: #777;
  }

  .product-area-spec-img {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .product-area-list {
    padding: 4rem 3.5rem 3rem 3.5rem;
    background-color: white;
    border-radius: 5px;
  }

  .product-area-title {
    opacity: 0.3;
    margin-bottom: 1rem;
  }
</style>
