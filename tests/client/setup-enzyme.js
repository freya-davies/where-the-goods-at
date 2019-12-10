import enzyme from 'enzyme'

const Adapter = require('enzyme-adapter-react-16');
const { configure } = require('enzyme');
enzyme.configure({
  adapter: new Adapter()
})


