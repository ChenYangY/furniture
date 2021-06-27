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
    <AlertHint :msg="alertMsg" v-show="alertMsg"/>
  </b-container>
</template>

<script>
import AlertHint from '../../components/AlertHint.vue';
export default {
  components: {AlertHint},
  data() {
    return {
      username: '',
      password: '',
      alertMsg: '',
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let res = await this.$store.dispatch('login', { username: this.username, password: this.password});
      if(!res.code) {
        window.location.href = '/admin/brands';
      }
      else {
        this.alertMsg = res.msg;
      }
    }
  }
};
</script>


