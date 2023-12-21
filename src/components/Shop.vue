<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="shop-container">
    <layout />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="product-grid">
        <div v-for="product in products" :key="product.sys.id" class="product-card">
          <div class="product-image-container">
            <img class="product-image" :src="getProductImageUrl(product)" :alt="product.title" />
          </div>
          <div class="product-details">
            <h3 class="product-title">{{ product.title }}</h3>
            <div class="product-description-container">
              <div class="product-description" v-if="product.description" v-html="renderRichText(product.description.json)"></div>
              <span v-if="!product.showMore" @click="toggleShowMore(product)" class="see-more">See more...</span>
              <span v-if="product.showMore" @click="toggleShowMore(product)" class="see-more">See less</span>
            </div>
            <div v-if="product.showMore">
              <p class="product-price">Price: ${{ product.price }}</p>
              <p class="product-category">Category: {{ product.category }}</p>
              <p class="product-tags">Tags: {{ product.tags ? product.tags.join(', ') : 'N/A' }}</p>
              <p class="product-availability">
                Availability: {{ product.availability ? 'In Stock' : 'Out of Stock' }}
              </p>
              <div class="product-specifications" v-if="product.specifications">
                <h4>Specifications:</h4>
                <div v-html="renderRichText(product.specifications.json)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Layout from '@/components/Layout.vue';

const GET_PRODUCTS = gql`
  query {
    productCollection {
      items {
        sys {
          id
        }
        title
        description {
          json
        }
        price
        category
        tags
        availability
        specifications {
          json
        }
        imagesCollection {
          items {
            title
            description
            url
          }
        }
      }
    }
  }
`;

export default {
  components: {
    Layout
  },
  setup() {
    const { result, loading, error } = useQuery(GET_PRODUCTS);
    const products = ref([]);

    onMounted(() => {
      if (result && result.value) {
        products.value = result.value.productCollection.items.map((product) => ({
          ...product,
          showMore: false,
        }));
      }
    });

    const getProductImageUrl = (product) => {
      if (product.imagesCollection && product.imagesCollection.items && product.imagesCollection.items.length > 0) {
        return product.imagesCollection.items[0].url;
      } else {
        // Provide a default image URL or handle the case where there is no image
        return 'assets/sum.png';
      }
    };

    const toggleShowMore = (product) => {
      product.showMore = !product.showMore;
    };

    const renderRichText = (richTextField) => {
      if (richTextField) {
        return documentToHtmlString(richTextField);
      }
      return '';
    };

    return { products, loading, error, toggleShowMore, renderRichText, getProductImageUrl };
  },
};
</script>

<style scoped>
.shop-container {
  margin: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: rgb(209, 197, 197);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  position: relative;
  margin-bottom: 20px; /* Add margin for spacing between cards */
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image-container {
  height: 150px;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 15px;
}

.product-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #007bff;
}

.product-description-container {
  position: relative;
}

.product-description {
  font-size: 14px;
  margin-bottom: 10px;
  color: #666666;
  max-height: 60px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.see-more {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}
</style>
