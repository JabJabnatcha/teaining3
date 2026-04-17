export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Product {
  id: string;
  productName: string;
  productPrice: number;
  categories: string;
  stock: number;
  image: string;
  isDelete: boolean;
}

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

const API_URL = `${API_BASE_URL}/api/Product`;

export const getAllProducts = async (): Promise<Product[]> => {
  return fetchJson<Product[]>(API_URL);
};

export const getProductById = async (id: string): Promise<Product> => {
  return fetchJson<Product>(`${API_URL}/${id}`);
};