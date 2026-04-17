import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductCard from './Productcard.vue'

const mockProduct = {
  id: '1',
  productName: 'Test Toy',
  productPrice: 999,
  categories: 'Toy',
  stock: 10,
  image: '/images/test.jpg',
  isDelete: false,
}

describe('ProductCard', () => {
  it('should render product info', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    expect(wrapper.text()).toContain('Test Toy')
    expect(wrapper.text()).toContain('999')
  })

  it('should generate correct image url', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    const img = wrapper.find('img')

    expect(img.attributes('src')).toContain('/images/test.jpg')
  })

  it('should fallback image on error', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    })

    const img = wrapper.find('img')

    await img.trigger('error')

    expect(img.attributes('src')).toContain('image-not-found')
  })
})