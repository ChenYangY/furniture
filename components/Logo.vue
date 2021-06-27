<template>
  <b-img src="/images/logo.jpeg" width="heigth" height="width" />
</template>

<script>
export default  {
  data: () => {
    return {};
  },
  props: ['heigth', 'width']
};
</script>


<style>

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
