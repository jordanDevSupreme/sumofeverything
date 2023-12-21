<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div v-for="hero in data?.heroCollection?.items" :key="hero?.sys.id" class="hero-section">
        <div v-if="hero.imagesCollection && hero.imagesCollection.items && hero.imagesCollection.items.length">
          <!-- Check if there are multiple images, then render the carousel -->
          <template v-if="hero.imagesCollection.items.length > 1">
            <carousel>
              <slide v-for="image in hero.imagesCollection.items" :key="image.url">
                <img :src="image.url" :alt="image.title" />
                <div class="hero-content">
                    <h1>{{ heroData.heading }}</h1>
                    <p>{{ heroData.subheading }}</p>
                  </div>
              </slide>
            </carousel>
          </template>
          <!-- If there's only one image, render it without the carousel -->
          <template v-else>
            <img class="hero-image" :src="hero.imagesCollection.items[0].url" :alt="hero.imagesCollection.items[0].title" />
          </template>
        </div>
    </div>
  </template>
  
  <script>
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  import { ref, onMounted } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  
  const GET_HERO_DATA = gql`
    query {
      heroCollection {
        items {
          sys {
            id
          }
          title: heading
          subheading
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
        Carousel,
        Slide
    },
    setup() {
      const { result, loading, error } = useQuery(GET_HERO_DATA);
      const data = ref(null);
  
      onMounted(() => {
        // Check if result.data is truthy before updating the ref
        if (result && result.value) {
          data.value = result.value;
        }
      });
  
      console.log('Data:', data.value);
      console.log('Loading:', loading);
      console.log('Error:', error);
  
      const getHeroImageUrl = (hero) => {
      if (hero.image && hero.image.url) {
        return hero.image.url;
      }

      // Provide a default image URL or handle cases where images are not available
      return require('@/assets/logo.png');
    };
  
      return {
        data,
        loading,
        error,
        getHeroImageUrl,
      };
    },
  };
  </script>
  
  <!-- Add your styles here -->
  <style scoped>
    .hero-section {
      background-size: cover;
      background-position: center;
      /* Add other styles as needed */
    }
  
    .hero-content {
      text-align: center;
      padding: 50px;
      /* Add other styles as needed */
    }
  
    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
  
    p {
      font-size: 18px;
      margin-bottom: 30px;
    }
    .hero-image {
        width:fit-content;
        height: fit-content;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
  </style>
  