<template>
  <div>
    <AdminBar/>
    <b-container fluid='xs'>
      <b-row>
        <b-col class='col-3' type='dark' variant='dark'>
          <AdminMenu :menus="menus" :current="current" />
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import AdminBar from '../../components/admin/bar';
import AdminMenu from '../../components/admin/menu';
export default {
  components: {AdminBar, AdminMenu},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '品牌管理',
    };
  },
  computed: {
    // ...mapState(['menus'])
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(this.username, this.password);
    }
  }
};
</script>

