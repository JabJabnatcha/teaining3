import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Detail from './Detail.vue'
import { nextTick } from 'vue'

// mock router
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' },
  }),
}))

// mock API
vi.mock('../services/Productservice', () => ({
  getProductById: vi.fn(),
}))

// force onMounted
vi.mock('vue', async () => {
  const actual = await vi.importActual<any>('vue')
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
  }
})

import { getProductById } from '../services/Productservice'

const mockProduct = {
  id: '1',
  productName: 'Test Toy',
  productPrice: 100,
  categories: 'Toy',
  stock: 3,
  image: '/images/test.jpg',
  isDelete: false,
}

describe('Detail.vue', () => {

  it('should increase and decrease quantity correctly', async () => {
    ;(getProductById as any).mockResolvedValue(mockProduct)

    const wrapper = mount(Detail, {
      global: {
        stubs: ['router-link'],
      },
    })

    await new Promise(r => setTimeout(r, 0))
    await nextTick()

    const increaseBtn = wrapper.get('[data-testid="increase-btn"]')
    const decreaseBtn = wrapper.get('[data-testid="decrease-btn"]')
    const quantity = wrapper.get('[data-testid="quantity"]')

    expect(quantity.text()).toBe('1')

    await increaseBtn.trigger('click')
    await nextTick()
    expect(quantity.text()).toBe('2')

    await increaseBtn.trigger('click')
    await nextTick()
    expect(quantity.text()).toBe('3')

    // ไม่เกิน stock
    await increaseBtn.trigger('click')
    await nextTick()
    expect(quantity.text()).toBe('3')

    await decreaseBtn.trigger('click')
    await nextTick()
    expect(quantity.text()).toBe('2')
  })

  it('should disable increase button when reach stock', async () => {
    ;(getProductById as any).mockResolvedValue(mockProduct)

    const wrapper = mount(Detail)

    await new Promise(r => setTimeout(r, 0))
    await nextTick()

    const increaseBtn = wrapper.get('[data-testid="increase-btn"]')

    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await nextTick()

    expect(increaseBtn.attributes('disabled')).toBeDefined()
  })

  it('should disable decrease button when quantity is 0', async () => {
    ;(getProductById as any).mockResolvedValue(mockProduct)

    const wrapper = mount(Detail)

    await new Promise(r => setTimeout(r, 0))
    await nextTick()

    const decreaseBtn = wrapper.get('[data-testid="decrease-btn"]')

    await decreaseBtn.trigger('click')
    await nextTick()

    expect(decreaseBtn.attributes('disabled')).toBeDefined()
  })
})