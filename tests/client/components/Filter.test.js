import React from 'react'
import { shallow } from 'enzyme'

import {Filter} from '../../../client/components/Filter'


test('Sort container renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Filter items ={{items: []}} modals={{currentModal: true}}  fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#sort').length
  expect(actual).toEqual(expected)
})

test('Listed Items render on page', () => {
  const expected = 1
  const wrapper = shallow(<Filter items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#listedItems').length
  expect(actual).toEqual(expected)
})