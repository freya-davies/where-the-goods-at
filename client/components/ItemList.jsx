import React from 'react'
import { connect } from 'react-redux'
import { findSuburb } from '../apis/itemList'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps) {
    this.setState({
      items: newProps
    })
  }

  handleClick = e => {}

  getSuburbs = item => {
    // console.log(this.props.items.items)
    return findSuburb(item.lat, item.long).then(data => {
      console.log(data)
      return data
    })
    // console.log(findSuburb(item.lat, item.long))
  }
  // findSuburb(this.props.items.items.lat, this.props.items.items.long)

  render() {
    // console.log(this)
    const items = this.props.items
    // console.log(this.props.items.items)

    // --------------------------
    // WANT TO ADD IN LOCATION/SUBURB, need to change lat and long into street adderess
    // --------------------------

    return (
        <div className='scrollable'>
          <h2>Listed items: </h2>
               <div className="row">
                 {items.map((item, i) => {
                  return (
                    <div key={i} className="col-sm-4 container bg-dark-main">
                      <div className="rounded">
                        <hr></hr>
                      <img className="rounded" src={item.img_url} alt={item.item_name} height="80" width="80" />
                      <h3>{item.item_name}</h3>
                      <p>{item.description}</p>
                      {/* <p>{findSuburb(item.lat, item.long)}</p> */}
                      {/* FREYA - THE BELOW LINE IS WHAT YOU WANT TO UNCOMMENT */}
                      {/* <p>{this.getSuburbs(item)}</p> */}
                      <hr></hr>
                      </div>
                    </div>

                  )
                }
                )}
              </div>
          
        </div>

      // <div>
      //   <div className="container">
      //     <h2>Listed items: </h2>
      //       <>
      //         <div className="row">
      //           {items.map((item, i) => {
      //             return (
      //               <div key={i} className="col-sm-4 container bg-dark-main">
      //                 <div className="rounded">
      //                   <hr></hr>
      //                 <img className="rounded" src={item.img_url} alt={item.item_name} height="80" width="80" />
      //                 <h3>{item.item_name}</h3>
      //                 <p>{item.description}</p>
      //                 {/* <p>{findSuburb(item.lat, item.long)}</p> */}
      //                 {/* FREYA - THE BELOW LINE IS WHAT YOU WANT TO UNCOMMENT */}
      //                 {/* <p>{this.getSuburbs(item)}</p> */}
      //                 <hr></hr>
      //                 </div>
      //               </div>

      //             )
      //           }
      //           )}
      //         </div>
      //       </>
      //   </div>

      // </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(ItemList)
