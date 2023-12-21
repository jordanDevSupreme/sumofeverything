<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <Logo />
      <router-view />
    </div>
  </template>
  
  <script>
  import Logo from '@/components/Logo.vue';
  
  export default {
    components: {
      Logo,
    },
  };
  </script>
  