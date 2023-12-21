<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="download-container">
      <layout/>
      <h2>Download</h2>
      <div v-for="file in files" :key="file.sys.id" class="file-container">
        <h3>{{ file.fields.title }}</h3>
        <p>{{ file.fields.description }}</p>
        <a :href="file.fields.file.url" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </div>
  </template>
  
  <script>
  import Layout from '@/components/Layout.vue'
  export default {
    components: {
      Layout
    },
    data() {
      return {
        files: [],
      };
    },
    mounted() {
      this.fetchDownloadFiles();
    },
    methods: {
      async fetchDownloadFiles() {
        try {
          const response = await this.$axios.get(
            'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_ACCESS_TOKEN&content_type=downloadableFile'
          );
          this.files = response.data.items;
        } catch (error) {
          console.error('Error fetching downloadable files:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .download-container {
    /* Add styles for the download page container */
  }
  /* Additional styling can be added as needed */
  </style>
  