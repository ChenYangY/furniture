<template>
  <div v-show="isShow" class='loading'>
    <div style='text-align: center;'>
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <p v-show="isShow && progress == 100" style='text-align:center;'>正在处理请求</p>
      <p v-show="isShow && progress < 100" style='text-align:center;'>正在上传文件</p>
    </div>
    <b-progress :value="progress" :max="100" show-progress animated></b-progress>
  </div>
</template>

<style scoped>
  .loading {
    position: fixed;
    width: 80%;
    padding: 10%;
    top: 0;
    margin: 10%;
    background-color: white;
    border:1px solid #c5c5c5;
    border-radius: 5px;
    box-shadow: 0px 5px 5px #c5c5c5;
    z-index: 100000;
  }
</style>

<script>
export default {
  props: {
    isShow: Boolean,
    progress: Number,
  }
};
</script>

