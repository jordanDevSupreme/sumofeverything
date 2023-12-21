<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="navigation-bar">
      <router-link to="/">Home</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/download">Download</router-link>
    </nav>
  </template>
  
  <script>
 
  </script>
  
  <style scoped>
  .navigation-bar {
    background-color: rgb(209, 197, 197);
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  router-link {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    padding: 10px;
    border-radius: 8px;
  }
  
  router-link:hover {
    background-color: #7b1fa2; /* Darker Purple Color on Hover */
  }
  </style>
  