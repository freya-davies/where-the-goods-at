import React from 'react'

const FilterBox = ({handleCategory, handleSeason, handleRecent}) => {
    return (
        <>
        {/* Category dropdown */}
        <article className="card-group-item">
          <header className="card-header filter-options">
          <h6 className="title">Category </h6>
          </header>
          <div className="filter-content">
          <div className="list-group list-group-flush">
              <select name='category' id='category-select' onChange={handleCategory}>
              <option value='0' className="dropdown-item">All</option>
              <option value='1' className="dropdown-item">Fruit</option>
              <option value='2' className="dropdown-item">Vegetables</option>
              <option value='3' className="dropdown-item">Herbs</option>
              <option value='4' className="dropdown-item">Flowers</option>
              <option value='5' className="dropdown-item">Other</option>
              </select>
          </div>
          </div>
        </article>

        {/* Seasons dropdown */}
        <article className="card-group-item">
            <header className="card-header filter-options">
            <h6 className="title">Season </h6>
            </header>
            <div className="filter-content">
            <div className="list-group list-group-flush">
                <select name='category' id='category-select' onChange={handleSeason}>
                <option value='0'>All</option>
                <option value='1'>Summer</option>
                <option value='2'>Autumn</option>
                <option value='3'>Winter</option>
                <option value='4'>Spring</option>
                </select>
            </div>
            </div>
        </article>

        {/* Recently dropdown */}
        <article className="card-group-item">
            <header className="card-header filter-options">
            <h6 className="title">Recently Added </h6>
            </header>
            <div className="filter-content">
            <div className="list-group list-group-flush">
                <select name='category' id='' onChange={handleRecent}>
                <option value='default'>A-Z</option>
                <option value='new'>Newest</option>
                <option value='old'>Oldest </option>
                </select>
            </div>
            </div>
        </article>
      </>
    )
}

export default FilterBox
