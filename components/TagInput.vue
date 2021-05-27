<template>
  <div>
    <div>
      <div v-for="(tag, index) in tags" :key="index" class='t-tag-element'>
        <label>{{tag}}</label>
        <b-icon icon="x" @click="delTag(index)"></b-icon>
      </div>
      <input type='text' placeholder="点击添加" style='border:0;' @keyup="adding($event)"/>
    </div>
  </div>
</template>

<style>
  .t-tag-element {
    background: #c6c6c6;
    display: inline-block;
    padding: 2px 4px;
    border-radius: 2px;
    margin: 5px 2px;
  }
  .t-tag-element > label{
    margin: 0;
  }

</style>

<script>
export default {
  data() {
    return {
      val: '',
    };
  },
  props: {
    tags: Array,
  },
  methods: {
    delTag(index) {
      this.$emit('delete', this.tags[index]);
    },
    showInput() {

    },
    adding(event) {
      if(event.key === 'Enter' && event.target.value) {
        this.$emit('add', event.target.value);
        event.target.value = '';
      }
      return;
    }
  }
};
</script>
