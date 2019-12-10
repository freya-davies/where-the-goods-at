import React from 'react'
import { shallow } from 'enzyme'

import {LandingPage} from '../../../client/components/LandingPage'


describe('LandingPage component', () => {

  test('That landing page renders', () => {
      const wrapper = shallow(<LandingPage />);
      // console.log(wrapper.debug());
      const landing = wrapper.find('#fantastic')
      expect(landing.length).toBe(1)
      
  })

  // test('Page title should render without errors', () => {
  //     const component = shallow(<Instructions />)
  //     const title = component.find('.home-gameTitle')
  //     expect(title.length).toBe(1)
  // })
})
