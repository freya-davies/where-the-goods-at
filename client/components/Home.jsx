// import React from 'react'
// import { HashRouter as Router, Route, Link } from 'react-router-dom'
// import { connect } from 'react-redux'

// import Login from './Login'
// import Register from './Register'
// import Nav from './Nav'
// import Map from './Map'

// class Home extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showPopUp: false
//     }

//   }

//   // -----------------------------------
//   // pop up info to be moved onto home page
//   // -----------------------------------
  
//   componentDidMount() {
//     if (!this.props.auth.isAuthenticated) {
//       setTimeout(this.popUp, 10000);
//     }
//   }

//   popUp = () => {
//     this.setState({ showPopUp: true })
//     // console.log(document.getElementById('myModal').style)
//     // document.getElementById('myModal').style.display = 'block'
//     // console.log('hello')
//   }

//   closeModal = () => {
//     this.setState({
//       showPopUp: false
//     })
//   }

//   render() {
//     return (
//       <Router>
       

//         <div className="container has-text-centered">

//           <div className="hero is-small is-primary">
//             <div className="hero-body has-text-centered">
//               <Link to='/' className="">
//                 <h1 className="title is-1">Where The Goods At</h1>
//               </Link>
//               <Nav />
//               <Map />
//             </div>
//           </div>
//         </div>
//       </Router>
//     )
//   }
// }

// const mapStateToProps = ({ auth }) => {
//   return {
//     auth
//   }
// }

// export default connect(mapStateToProps)(Home)
