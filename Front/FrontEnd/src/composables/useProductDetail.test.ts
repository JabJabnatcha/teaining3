import { describe, it, expect, vi, beforeEach } from 'vitest'

// 🔥 mock vue lifecycle
vi.mock('vue', async () => {
  const actual = await vi.importActual<any>('vue')

  return {
    ...actual,
    onMounted: (fn: any) => fn(),
  }
})

// mock API
vi.mock('../services/Productservice', () => ({
  getProductById: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' },
  }),
}))

import { useProductDetail } from './useProductDetail'
import { getProductById } from '../services/Productservice'

const mockProduct = {
  id: '1',
  productName: 'Test Product',
  productPrice: 100,
  categories: 'Toy',
  stock: 3,
  image: '/images/test.jpg',
  isDelete: false,
}

describe('useProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getProductById as any).mockResolvedValue(mockProduct)
  })

  it('should increase quantity correctly', async () => {
    const state = useProductDetail()

    await new Promise(r => setTimeout(r, 0))

    expect(state.quantity.value).toBe(1)

    state.increaseQuantity()
    expect(state.quantity.value).toBe(2)

    state.increaseQuantity()
    expect(state.quantity.value).toBe(3)

    state.increaseQuantity()
    expect(state.quantity.value).toBe(3)
  })

  it('should not go below 0', () => {
    const state = useProductDetail()

    state.decreaseQuantity()
    expect(state.quantity.value).toBe(0)
  })
})