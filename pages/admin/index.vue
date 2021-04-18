<template>
  <b-container fluid>
    <b-form @submit="onSubmit" style='margin-top: 260px;'>
      <b-input-group class="mb-3">
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="用户名" v-model="username"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3 md-4">
        <b-input-group-prepend is-text>
          <b-icon icon="key-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="password" placeholder="密码" v-model="password"></b-form-input>
        <!-- <b-input-group-append is-text>
          <b-icon icon="eye-fill"></b-icon>
        </b-input-group-append> -->
      </b-input-group>
      <b-button block variant="primary" type='submit'>登录</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(this.username, this.password);
    }
  }
};
</script>


