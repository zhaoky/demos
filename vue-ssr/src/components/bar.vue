<template>
  <div id="bar">
    bar page
    <ul>
      <li v-for="item in list" :key="item[1]">{{ item[0] }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  asyncData({ store }) {
    return store.dispatch("fetchList");
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  }
};
</script>
