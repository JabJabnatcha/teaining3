<script setup lang="ts">
import TopBar from "../components/Topbar.vue";
import { useProductDetail } from "../composables/useProductDetail";

const {
  product,
  quantity,
  getImageUrl,
  handleImageError,
  increaseQuantity,
  decreaseQuantity,
  canIncrease,
  canDecrease,
} = useProductDetail();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopBar />

    <div v-if="product" class="container mx-auto px-4 py-8">
      <!-- Product Details Layout -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <!-- Product Image Section -->
          <div class="md:w-1/2">
            <div
              class="aspect-square bg-gray-100 flex items-center justify-center p-8"
            >
              <img
                :src="getImageUrl(product.image)"
                alt="product image"
                class="max-w-full max-h-full object-contain"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Product Details Section -->
          <div class="md:w-1/2 p-8">
            <div class="space-y-6">
              <!-- Product Title -->
              <div>
                <h1 class="text-3xl font-bold text-gray-900 text-left mb-1">
                  {{ product.productName }}
                </h1>
                <h3 class="text-gray-600 text-sm text-left">
                  {{ product.categories }}
                </h3>
              </div>

              <!-- Price -->
              <div class="flex items-baseline space-x-4">
                <span class="text-4xl font-semibold text-black"
                  >${{ product.productPrice }}</span
                >
              </div>
              <!-- Quantity Selector -->
              <div class="space-y-3 text-left">
                <label class="block text-sm font-bold text-gray-700"
                  >Quantity</label
                >

                <div
                  class="inline-flex items-center justify-start border border-gray-400 rounded-md overflow-hidden"
                >
                  <!-- Decrease Button -->
                  <button
                    data-testid="decrease-btn"
                    @click="decreaseQuantity"
                    :disabled="!canDecrease"
                    :class="[
                      'w-10 h-10 flex items-center justify-center transition-colors',
                      canDecrease
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed',
                    ]"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>

                  <!-- Quantity Display -->
                  <span
                    data-testid="quantity"
                    class="w-12 h-10 flex items-center justify-center bg-gray-200 text-xl font-semibold border-l border-r border-gray-400"
                  >
                    {{ quantity }}
                  </span>

                  <!-- Increase Button -->
                  <button
                    data-testid="increase-btn"
                    @click="increaseQuantity"
                    :disabled="!canIncrease"
                    :class="[
                      'w-10 h-10 flex items-center justify-center transition-colors',
                      canIncrease
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed',
                    ]"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <!-- Stock Information -->
              <div class="flex items-center">
                <span class="text-sm text-gray-600"
                  >Stock {{ product.stock }} items</span
                >
              </div>
              <!-- Action Buttons -->
              <div class="space-y-3">
                <button
                  :disabled="quantity === 0"
                  :class="[
                    'w-full py-3 px-6 rounded-lg font-semibold transition-colors',
                    quantity > 0
                      ? 'bg-indigo-700 hover:bg-indigo-800 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                  ]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Loading product details...</p>
      </div>
    </div>
  </div>
</template>
