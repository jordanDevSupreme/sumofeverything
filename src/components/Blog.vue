<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="blog-container">
    <layout/>
    <h2 class="section-title">Blog</h2>
    <div v-for="post in posts" :key="post.sys.id" class="post-container">
      <h3 class="post-title">{{ post.fields.title }}</h3>
      <div v-if="post.fields.content" class="post-content">
        <div v-for="paragraph in post.fields.content" :key="paragraph.nodeType">
          <p v-if="paragraph.nodeType === 'paragraph'" v-html="renderParagraph(paragraph)"></p>
        </div>
      </div>
      <p class="post-info">Date: {{ post.fields.date }}</p>
      <p class="post-info">Author: {{ post.fields.author }}</p>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Layout from '@/components/Layout.vue';

export default {
  components: {
    Layout
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchBlogPosts();
  },
  methods: {
    async fetchBlogPosts() {
      try {
        const response = await this.$axios.get(
          `https://cdn.contentful.com/spaces/x3dxoa17fvp4/entries?access_token=MBxLi24ULAn3KWPzMiSsS_Ez-RdxBgI6IkMbRt_O3Gs&content_type=blogPost`
        );
        this.posts = response.data.items;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    },
    renderParagraph(paragraph) {
      // Use documentToHtmlString to convert the paragraph content to HTML
      return documentToHtmlString(paragraph);
    },
  },
};
</script>

<style scoped>
.blog-container {
  margin: 20px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
}

.post-container {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  color: #007bff;
}

.post-content {
  margin-top: 10px;
}

.post-info {
  color: #666666;
}
</style>
