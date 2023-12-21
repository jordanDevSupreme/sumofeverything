<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  components: {
    Header  
},
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
