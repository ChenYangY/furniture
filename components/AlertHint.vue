<template>
  <div class='alert-hint'>
    <b-alert variant="warning"
    :show="dismissCountDown"
    :max="dismissSecs"
    @dismissed="dismissCountDown=0"
    :value="dismissCountDown"
    dismissible
    >
      {{msg}}
    </b-alert>
  </div>
</template>
<style scoped>
  .alert-hint {
    position: fixed;
    top: 1rem;
    width: 80%;
    margin: 0 10%;
    z-index: 2000;
  }
</style>
<script>
export default {
  watch: {
    msg() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 5
    };
  },
  props: {
    msg: String,
  }
};
</script>
