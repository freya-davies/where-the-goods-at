import React from 'react'
import { shallow } from 'enzyme'

import {App} from '../../../client/components/App'

// test('Title renders on App', () => {
//   // Arrange
//   const expected = 'Where the goods at'

//   // Act
//   const wrapper = shallow(<App items={{items: [1,2]}} modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}}/>)
//   const actual = wrapper.find('body')

//   // Debug output
//   console.log(wrapper.debug())

//   // Assert
//   expect(actual).toEqual(expected)
// })

 test('App has some routes when not logged in', () => {
   // Arrange
   const expected = 5

   // Act
   const wrapper = shallow(<App items ={{items: []}}modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />)
   const actual = wrapper.find('Route').length

   // Assert
   expect(actual).toEqual(expected)
 })

//  test('App has one less route when logged in', () => {
//    // Arrange
//    const expected = 4

//    // Act
//    const wrapper = shallow(<App auth={{isAuthenticated: true}}/>)
//    const actual = wrapper.find('Route').length

//    // Assert
//    expect(actual).toEqual(expected)
//  })
