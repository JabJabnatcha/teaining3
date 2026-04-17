<script setup lang="ts">
import type { Product } from '../services/Productservice';
import imageNotFound from '../assets/image-not-found.jpg';

defineProps<{ product: Product }>();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||'';

const getImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath || imagePath.trim() === '' || imagePath === 'test.png') {
    return imageNotFound;
  }

  const cleanPath = imagePath
  .replace(/\/{2,}/g, '/')
  .replace('/images/images/', '/images/');
  return `${API_BASE_URL}${cleanPath}`;

};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;

  if (img.src !== imageNotFound) {
    img.src = imageNotFound;
  }
};
</script>

<template>
  <div class="bg-white hover:shadow-lg transition-shadow">
    <router-link :to="`/item/${product.id}`" class="block">
      <img
        :src="getImageUrl(product.image)"
        class="w-full h-52 object-cover"
        alt="Product image"
        @error="handleImageError"
      />
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-600">{{ product.productName }}</h3>
          <h3 class="text-lg font-semibold text-black text-right">${{ product.productPrice }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>