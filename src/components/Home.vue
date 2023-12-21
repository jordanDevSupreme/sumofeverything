<template>
  <div class="home-container">
    <layout/>
    <Hero />
    <div v-for="entry in entries" :key="entry.sys.id" class="post-container">
      <!-- Use router-link to create a link for each entry title -->
      <router-link :to="{ name: 'entryDetail', params: { id: entry.sys.id } }">
        <h3>{{ entry.fields.title }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Hero from '@/components/Hero.vue';

export default {
  components: {
    Layout,
    Hero,
  },
  name: 'HomePage',
  data() {
    return {
      entries: [],
    };
  },
  mounted() {
    this.fetchEntries();
  },
  methods: {
    async fetchEntries() {
      try {
        const response = await this.$axios.get(
          'https://cdn.contentful.com/spaces/x3dxoa17fvp4/entries?access_token=MBxLi24ULAn3KWPzMiSsS_Ez-RdxBgI6IkMbRt_O3Gs'
        );
        this.entries = response.data.items;
        console.log(this.entries);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-container {
  background-color: #ffffff;
  margin-top: 15px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333333;
}

h3 {
  color: #007bff;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
}

/* Additional styling can be added as needed */
</style>
