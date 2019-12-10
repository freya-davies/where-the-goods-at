import React from 'react'
import { shallow } from 'enzyme'
import PlacesAutocomplete from 'react-places-autocomplete'; 

import {App} from '../../../client/components/App'
import { Autocomplete } from '@react-google-maps/api'

// test('Back button renders without errors', () => {
//   const component = shallow(<Instructions/>);
//   // console.log(component.debug());
//   const button = component.find('.home-btns__btn')
//   expect(button.length).toBe(1)
  
// })

test('Map renders on page', () => {
  const expected = 1
  const wrapper = shallow(<App items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('.FilterMap').length
  expect(actual).toEqual(expected)
})


 test('App has 4 routes when not logged in', () => {
   // Arrange
   const expected = 4

   // Act
   const wrapper = shallow(<App items ={{items: []}}modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />)
   //console.log(wrapper.debug())
   const actual = wrapper.find('Route').length

   // Assert
   expect(actual).toEqual(expected)
 })

 test('App has 5 routes when logged in', () => {
   
   const expected = 6
   const wrapper = shallow(<App items ={{items: []}}modals={{currentModal: true}} auth={{isAuthenticated: true}} fetchPublicItems={()=> {}} /> )
  //0 console.log(wrapper.debug())
   const actual = wrapper.find('Route').length
    expect(actual).toEqual(expected)
 })
