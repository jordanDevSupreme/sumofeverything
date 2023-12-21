<template>
    <div class="entry-detail" v-if="entry">
      <p>{{ entry.fields.title }}</p>
      <div v-if="entry.fields.description" v-html="renderRichText(entry.fields.description.content)"></div>
      <div v-if="entry.fields.content" v-html="renderRichText(entry.fields.content)"></div>
      <!-- Add more content based on your entry structure -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'entryDetail',
    data() {
      return {
        entry: null,
      };
    },
    async mounted() {
      // Fetch entry details based on the route parameter (entry ID)
      const entryId = this.$route.params.id;
      await this.fetchEntryDetails(entryId);
    },
    methods: {
      async fetchEntryDetails(entryId) {
        try {
          // Make an API request to fetch the entry details using entryId
          // Adjust the API endpoint and request logic based on your setup
          const response = await this.$axios.get(
            `https://cdn.contentful.com/spaces/x3dxoa17fvp4/entries/${entryId}?access_token=MBxLi24ULAn3KWPzMiSsS_Ez-RdxBgI6IkMbRt_O3Gs`
          );
          this.entry = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching entry details:', error);
        }
      },
      renderRichText(content) {
        if (content && Array.isArray(content)) {
          return content.map((item) => item.value).join('');
        } else {
          return '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  