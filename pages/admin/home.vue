<template>
  <div>
    <b-container fluid="xs">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">管理后台</b-navbar-brand>
      </b-navbar>
      <div class="col-4">
        <b-nav v-for="(menu, mIdx) in menus" :key="mIdx">
            <b-nav-item :href='menu.path'>{{menu.name}}</b-nav-item>
        </b-nav>
      </div>
      <div class='col-8'>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      menus: [{
        name: '产品管理',
        path: './products'
      },{
        name: '轮播图管理',
        path: './carousels'
      }]
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
