<template>
  <b-container fluid style='padding: 0px;overflow-x:hidden;'>
    <div style='background-color:#c6c6c6;'>
      <NavBar logoColor="white" current="首页"/>
      <div class='carousel-box'>
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
          <b-carousel-slide v-for="(image, index) in carousel.images" :key="index"
            :img-src="image.url"
          />
        </b-carousel>
      </div>
    </div>
    <div class='home-body clearfix'>
      <div class='introduction-area left'>
        <div class='introduction-brand'>关于风物宜</div>
        <div class='introduction-title' style='margin-right:1.5rem;'>品牌全新实验性的产品线。现代简约而不失温度感。</div>
        <div class='introduction-breif'>sigma取自希腊字母“∑”，意为包涵、包容。旨在以纯粹自然之心面对生活，尊重工艺与品质，探讨产品与使用者之间永恒持续的关系。</div>
        <div class='introduction-content'>我们专注于经典北欧设计与新北欧设计的家具、灯具品牌，更有家居生活小物，以及价格平易近人的艺术品。基于欧洲零售价的定价，让顾客更轻松地接近美好生活。</div>
        <b-img class='introduction-img' style='float:left;margin-top: 0.75rem;margin-bottom:1.5rem; width: 55.5rem;' src='/images/introduction_img.png' />
        <div>
          <div class='introduction-content' style='margin-right:1.5rem;'>脊线系列的灵感来源于大自然以及儿时记忆，扎根中国传统文化，将更具东方空灵艺术性的元素融合深沉肃穆的设计语言。以螳螂椅为首款产品，历时3年，从设计、结构到工艺，不断推敲升级产品线</div>
          <div class='introduction-content'>采用大曲线，多细节的实木加工，配合国际品牌的面料，突出现代中国家具的雕塑感，艺术感以及为生活带来仪式感。</div>
        </div>
      </div>
      <div class='product-area left'>
        <div class='product-area-title'>产品</div>
        <div class='product-spec-area clearfix'>
          <div class='product-spec left'>
            <div class='product-spec-desc left'>
              <div class='product-spec-title'>好物艺术集合室内植物无限遐想</div>
              <div class='product-spec-content'>脊线系列的灵感来源于大自然以及儿时记忆，扎根中国传统文化，将更具东方空灵艺术性的元素融合深沉肃穆的设计语言。以螳螂椅为首款产品，历时3年，从设计、结构到工艺，不断推敲升级产品线</div>
            </div>
            <div class='prodcut-spec-detail left'>
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
            <div style='width: 100%; margin-bottom:0.5rem;'>
              <b-img src='/images/first_production.png' style='width: 27rem;'/>
              <b-img src='/images/first_production_1.png' style='width: 27rem;'/>
            </div>
            <div class='product-spec-content'>艺术画廊包含艺术展览、艺术橱窗以及快闪等多个艺术相关活动。拓展传统艺术的界限，挖掘艺术的无限可能性，让观众感知以不同载体呈现的艺术，并带领他们进入无限遐想的艺术世界。为了深入探索家具主人的生活态度，观察家具与人、人与人之间的亲密连结，自制栏目“在家”、“串门”，从不同维度出发，讲述家具，设计与人的故事。</div>
          </div>
        </div>
      </div>

      <ProductList />
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
    ProductList
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      isShowProductMenu: false,
      carousel: {images: []},
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
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
  .carousel-box {
    padding: 2.5rem 7.25rem 7rem 7.25rem;
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
    background-color: #E5E5E5;
  }

  .introduction-area {
    padding: 3rem 3.5rem;
    border-radius: 5px;
    margin-top: -7rem;
    background:white;
  }
  .introduction-brand {
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  .introduction-title {
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 3.5rem;
    width: 27rem;
    float: left;
  }

  .introduction-breif {
    width: 27rem;
    float: left;
    font-weight: bold;
    margin-bottom: .75rem;
  }

  .introduction-content {
    width: 27rem;
    float: left;
    font-size:0.92rem;
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .product-area {
    padding: 4rem 3.5rem 3rem 3.5rem;
  }

  .product-area-title {
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  .product-spec-desc {
    width: 31.75rem;
    margin-right: 6rem;
  }



  .product-spec-title {
    width: 27rem;
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 3.5rem;
    width: 27rem;
    float: left;
  }

  .product-spec-content {
    margin-top: 1rem;
    font-size: 0.9rem;
    float: left;
    opacity: .5;
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

  .product-list-area {
    background: white;
    width: 100%;
    padding: 3.5rem 2.75rem;
    border-radius: 5px;
  }
  .product-list-area-item {
    width: 17.5rem;
    margin-bottom: 2rem;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }
  .product-list-area-item-info {
    margin: 1rem 0px;
  }

  .product-list-area-item-info-title {
    margin-right: 1.25rem;
  }

  .product-list-area-item-info-link {
    width: 1.5rem;
    height: 0.6rem;
  }

  .product-list-area-item img {
    height: 25rem;
  }

  .product-list-area-item-more {
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 0.75rem;
  }

  .product-list-area-item-more > a {
    color: black;
    width: 100%;
    display: block;
    text-align: center;
  }
</style>
