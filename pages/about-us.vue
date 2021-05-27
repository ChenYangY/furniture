<template>
  <div>
    <NavBar logoColor='black' style='color: black;' current="关于我们" fontColor="black"/>
    <div class='about-us-box'>
      <div class='clearfix'>
        <div style='margin-bottom: 1.5rem;'>联系我们</div>
        <div class='left' style='width: 27rem;margin-right: 4rem;'>
          <h2 style='font-size: 3rem;margin-bottom:1rem;'>让我们一起工作吧</h2>
          <p style='color:#777777;'>设计不应只是线条与元素的堆砌，设计灵感源于对中国文化与传统生活的感知，将东方韵味与哲思凝练于设计中。</p>
        </div>
        <div class='left' style='width: 21rem;margin-left: 4rem;'>
          <div class='left' style="width:10.5rem;margin-right: 1rem;"><label style='display:block;margin-bottom: 1rem;'>地址</label><p>上海市宝山区牡丹江西路1599号北翼商业街1层8区
9002室风物宜家居</p></div>
          <div class='left' style='width: 9rem;'><label style='display:block;margin-bottom: 1rem;'>电话</label><span style='font-size: 0.9rem; margin-bottom: 0.5rem; display:block;'>+86 186 7878 0909 </span><span style='font-size: 0.9rem; display: block;width: 100%;'>+86 186 7878 0909 </span></div>
        </div>
      </div>
      <div style='width: 100%; height: 32.5rem;'></div>
      <p style='color: #777777'>品牌中最早的一条线，关注寻常生活中真实所需的家居设计，简单质朴，在葆有中国的设计语言的基础上，将大自然中的树木变为与家相融的家具，在四季更迭中长久陪伴，慢慢变成我们的家人。</p>
      <footer class='page-footer clearfix'>
        <p style='text-align: center;'>2021 © Sigma Design</p>
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
    return {};
  }
};
</script>
