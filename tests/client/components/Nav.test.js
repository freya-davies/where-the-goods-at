import React from 'react'
import { shallow } from 'enzyme'

import {Nav} from '../../../client/components/Nav'

test('Heading renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#navi').length
  expect(actual).toEqual(expected)
})

test('Sort container renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#navi').length
  expect(actual).toEqual(expected)
})



