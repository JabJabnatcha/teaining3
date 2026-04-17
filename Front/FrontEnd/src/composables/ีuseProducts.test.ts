import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

// 🔥 FORCE onMounted run
vi.mock('vue', async () => {
  const actual = await vi.importActual<any>('vue')

  return {
    ...actual,
    onMounted: (fn: any) => fn(),
  }
})

// mock API
vi.mock('../services/Productservice', () => ({
  getAllProducts: vi.fn(),
}))

import { useProducts } from './userProducts'
import { getAllProducts } from '../services/Productservice'

const mockProducts = [
  {
    id: 1,
    productName: 'Red Ball',
    productPrice: 100,
    categories: 'Ball',
    stock: 10,
    image: '/images/a.jpg',
    isDelete: false,
  },
  {
    id: 2,
    productName: 'Blue Car',
    productPrice: 200,
    categories: 'Toy',
    stock: 5,
    image: '/images/b.jpg',
    isDelete: false,
  },
]

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch products successfully', async () => {
    ;(getAllProducts as any).mockResolvedValue(mockProducts)

    const state = useProducts()

    await nextTick()

    expect(state.products.value.length).toBe(2)
    expect(state.loading.value).toBe(false)
  })

  it('should filter by name', async () => {
    ;(getAllProducts as any).mockResolvedValue(mockProducts)

    const state = useProducts()

    await nextTick()

    state.searchKeyword.value = 'red'

    expect(state.filteredProducts.value.length).toBe(1)
  })

  it('should filter by category', async () => {
    ;(getAllProducts as any).mockResolvedValue(mockProducts)

    const state = useProducts()

    await nextTick()

    state.searchKeyword.value = 'toy'

    expect(state.filteredProducts.value.length).toBe(1)
  })

  it('should return all products when search empty', async () => {
    ;(getAllProducts as any).mockResolvedValue(mockProducts)

    const state = useProducts()

    await nextTick()

    state.searchKeyword.value = ''

    expect(state.filteredProducts.value.length).toBe(2)
  })

  it('should handle API error', async () => {
    ;(getAllProducts as any).mockRejectedValue(new Error('API failed'))

    const state = useProducts()

    await nextTick()

    expect(state.error.value).toBe('API failed')
  })
})