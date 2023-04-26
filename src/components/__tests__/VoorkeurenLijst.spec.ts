import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VoorkeurenLijst from '../VoorkeurenLijst.vue'

describe('Voorkeuren', () => {
  it('renders properly', () => {
    const wrapper = mount(VoorkeurenLijst, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
