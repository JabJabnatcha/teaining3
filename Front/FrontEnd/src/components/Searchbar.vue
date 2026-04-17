<script setup lang="ts">
import { ref } from "vue";
import SearchIcon from "../assets/icons/SearchIcon.vue";

const keyword = ref("");

const emit = defineEmits<{
  (event: 'search', keyword: string): void;
}>();

const handleSearch = () => {
  emit('search', keyword.value.trim());
};
</script>

<template>
  <div class="flex justify-center gap-2 mt-6">
    <div class="relative w-full ">
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        v-model="keyword"
        type="text"
        placeholder="Search products..."
        class="pl-10 pr-4 py-2 border bg-gray-100 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        @keyup.enter="handleSearch"
      />
    </div>

    <button
      @click="handleSearch"
      class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2 transition-colors"
    >
      <SearchIcon class="w-5 h-5 text-white" />
      Search
    </button>
  </div>
</template>
