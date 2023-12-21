<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <img class="product-image2" src="../assets/sum.png" />
  </template>
  

  
  <style scoped>
  .product-image2 {
    width: 100%;
    height: 100px;
    object-fit: scale-down;
    align-items: center;
    margin-bottom: 42px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    animation: spin 10s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  </style>
  