<script setup lang="ts">
import TopBar from '../components/Topbar.vue';
import SearchBar from '../components/Searchbar.vue';
import ProductCard from '../components/Productcard.vue';
import { useProducts } from '../composables/userProducts';

const {
  filteredProducts,
  loading,
  error,
  handleSearch,
  fetchProducts
} = useProducts();
</script>

<template>
  <div class="min-h-screen">
    <TopBar />

    <main class="container mx-auto px-4 py-8">


      <SearchBar @search="handleSearch" />

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 text-lg">{{ error }}</p>
        <button @click="fetchProducts" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Try Again
        </button>
      </div>

      <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">No products found.</p>
      </div>
    </main>
  </div>
</template>