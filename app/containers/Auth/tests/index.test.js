import React from 'react'
import { shallow } from 'enzyme'

import { Auth } from '../index'

const _props = { clearSession: jest.fn(), sessionData: {}, location: {}, match: {} }

const renderComponent = props => shallow(<Auth {..._props} {...props} />)

describe('<Auth />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = renderComponent()
  })

  it('Should render the dumb component', () => {
    expect(wrapper.length).toEqual(1)
  })
})
