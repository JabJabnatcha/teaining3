import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProductById } from "../services/Productservice";
import type { Product } from "../services/Productservice";
import imageNotFound from '../assets/image-not-found.jpg';

export function useProductDetail() {
  const route = useRoute();
  const product = ref<Product | null>(null);
  const quantity = ref(1);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getImageUrl = (imagePath: string) => {
    if (!imagePath || imagePath.trim() === "" || imagePath === "test.png") {
      return imageNotFound;
    }

    const cleanPath = imagePath.replace("/images//images/", "/images/");
    return `${API_BASE_URL}${cleanPath}`;
  };

  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = imageNotFound;
  };

  const increaseQuantity = () => {
    if (product.value && quantity.value < product.value.stock) {
      quantity.value++;
    }
  };

  const decreaseQuantity = () => {
    if (quantity.value > 0) {
      quantity.value--;
    }
  };

  const canIncrease = computed(() =>
    product.value ? quantity.value < product.value.stock : false,
  );
  const canDecrease = computed(() => quantity.value > 0);

  onMounted(async () => {
    const id = route.params.id as string;
    product.value = await getProductById(id);
  });

  return {
    product,
    quantity,
    getImageUrl,
    handleImageError,
    increaseQuantity,
    decreaseQuantity,
    canIncrease,
    canDecrease,
  };
}
