import React from 'react'
import { shallow } from 'enzyme'

import {ItemList} from '../../../client/components/ItemList'

test('Listed Items render on page', () => {
  const expected = 1
  const wrapper = shallow(<ItemList items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#listedItems').length
  expect(actual).toEqual(expected)
})