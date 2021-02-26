<template>
  <div id="foo">
    foo page
    <div v-if="show">show me</div>
    <div>
      <button @click="toggle">toggle</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  }
};
</script>