<template>
  <b-container>
    <b-form @submit="onSubmit" style='margin-top: 260px; width: 300px; margin-left: 30%;'>
      <b-input-group class="mb-3 md-3">
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="用户名" v-model="username"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-3">
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
    async onSubmit(event) {
      event.preventDefault();
      let isLogin = await this.$store.dispatch('login', { username: this.username, password: this.password});
      if(isLogin) {
        window.location.href = '/admin/brands';
      }
    }
  }
};
</script>


