import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchBar from './Searchbar.vue'

describe('SearchBar', () => {
  it('should emit search when pressing enter', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.find('input')

    await input.setValue('toy')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['toy'])
  })

  it('should emit search when clicking button', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('ball')
    await button.trigger('click')

    expect(wrapper.emitted('search')![0]).toEqual(['ball'])
  })
})