import React from 'react'
import { shallow } from 'enzyme'

import {Nav} from '../../../client/components/Nav'

test('Heading renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#navi').length
  expect(actual).toEqual(expected)
})

test('Login renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#Log').length
  expect(actual).toEqual(expected)
})

test('Register renders on page', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: false}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#Reg').length
  expect(actual).toEqual(expected)
})

test('Logout renders on page once authed', () => {
  const expected = 1
  const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true, user: {user_name : 'jef'}}} fetchPublicItems={()=> {}} />) 
  //console.log(wrapper.debug());
  const actual = wrapper.find('#Logout').length
  expect(actual).toEqual(expected)
})


 test('Hamburger renders', () => {

    
   const expected = 1
   const wrapper = shallow(<Nav items ={{items: []}} modals={{currentModal: true}} auth={{isAuthenticated: true, user: {user_name : 'jef'}}} fetchPublicItems={()=> {}} />) 
   //console.log(wrapper.debug());
   const actual = wrapper.find('#navbar-toggler').length
   expect(actual).toEqual(expected)
 })

 



