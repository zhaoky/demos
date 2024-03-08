<script setup lang="ts">
import { getCurrentInstance, ref,reactive, onMounted, onUpdated, toRefs, toRef } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'
// const g = getCurrentInstance();
// let zky = ref(666);
// const t = ref(null);
const data = reactive({
    name: '沐华',
    age: 18,
})
// let { name, age } = toRefs(data);
// let { age } = data;
// let age1 = toRef(age);

const add = ()=>{
  data.age++;
  // console.log(age1, data);
}
onUpdated(()=>{
  console.log('更新');
});
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <!-- <div ref="t">{{ zky }}</div> -->
    <div @click="add">{{ data.age }}</div>
  </main>
</template>