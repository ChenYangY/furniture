<template>
  <div>
    <NavBar logoColor='black' style='color: black;' current="关于我们" fontColor="black"/>
    <div class='about-us-box'>
      <div class='clearfix'>
        <div style='margin-bottom: 1.5rem;font-weight: 400;'>关于我们</div>
        <div class='left' style='max-width: 30rem;margin-right: 4rem;margin-bottom: 1.5rem;'>
          <h2 style='font-size: 3rem;margin-bottom:1rem;'>SIGMALIVING 风物宜</h2>
          <p style='color:#777777;'>关于风物宜：SIGMA取自希腊字母“∑”，意为包涵、包容。旨在以纯粹自然之心面对生活，尊重工艺与品质，探讨产品与使用者之间永恒持续的关系。</p>
          <p style='color:#777777;'>我们专注于经典北欧设计与新北欧设计的家具、灯具品牌，更有家居生活小物，以及价格平易近人的艺术品。基于欧洲零售价的定价，让顾客更轻松地接近美好生活。</p>
        </div>
        <div class='left' style='max-width: 21rem;margin-left: 1rem;'>
          <div class='left' style="width:10.5rem;margin-right: 1rem;"><label style='display:block;margin-bottom: 1rem;font-weight: 700;'>地址</label><p>上海市徐汇区五原路71号2号楼一楼
SIGMALIVING 风物宜</p></div>
          <div class='left' style='width: 9rem;'><label style='display:block;margin-bottom: 1rem;font-weight: 700;'>店铺微信</label><span style='font-size: 0.9rem; margin-bottom: 0.5rem; display:block;'>SIGMALIVING</span></div>
        </div>
      </div>
      <b-carousel>
          <b-carousel-slide
            v-for="(image, index) in carousel.images" :key="index"
            :img-src="image.url"
          />
      </b-carousel>
      <p style='color: #777777; margin-top: 2rem;'></p>
      <footer class='page-footer clearfix'>
        <p style='text-align: center;'>2021 © SIGMALIVING 风物宜</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .about-us-box {
    margin: 100px 10% 0px 10%;
  }
</style>

<script>
import NavBar from '../components/NavBar';
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      carousel: { images: []}
    };
  },
  fetchOnServer: false,
  async fetch() {
    let res = await this.$store.dispatch('api/carousels/index');
    let data = res.data;
    let carousel = data.docs[0];
    if(carousel && carousel.images && carousel.images[0]) {
      this.carousel = carousel;
    }
  }
};
</script>
