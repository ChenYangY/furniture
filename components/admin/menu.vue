<template>
  <aside>
      <b-nav vertical v-for="(menu, mIdx) in menus" :key="mIdx">
          <b-nav-item v-if="menu.name === current" :href='menu.path' disabled>{{menu.name}}</b-nav-item>
          <b-nav-item :href='menu.path' v-else>{{menu.name}}</b-nav-item>
    </b-nav>
  </aside>
</template>

<script>
export default {
  props: {
    menus: null,
    current: String,
  }
};
</script>

