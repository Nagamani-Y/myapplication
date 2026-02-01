import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../Redux/Actions/actions';


const FilterProducts = () => {
     const [sortkey, setsortkey] = useState("popular");
  const [categorykey, setcategorykey,] = useState("all");
  const dispatch= useDispatch();

  const handleSort =(e) =>{
    const sortkey = e.target.value;
    setsortkey(sortkey)
   console.log(categorykey,sortkey)
    dispatch(filterProducts({categorykey,sortkey}))
  }
  const handleCatogory =(e) =>{
    const categorykey = e.target.value
    setcategorykey(categorykey)
    console.log(categorykey,sortkey)
    dispatch(filterProducts({categorykey,sortkey}))
  }
    return (
        <>
            <select
                value={sortkey}
                onChange={(e)=>handleSort(e)}
                className="form-select shadow-sm"
                style={{
                    width: "150px",
                    borderRadius: "10px",
                    fontSize: "15px",
                }}
            >
                <option value="popular">Popular</option>
                <option value="htl">High To Low</option>
                <option value="lth">Low To High</option>
            </select>

            {/* Category Dropdown */}
            <select
                value={categorykey} 
                onChange={(e) => handleCatogory(e)}
                className="form-select shadow-sm"
                style={{
                    width: "150px",
                    borderRadius: "10px",
                    fontSize: "15px",
                }}
            >
                <option value="all">All</option>
                <option value="mobiles">Smart Phones</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="games">Games</option>
            </select>
        </>
    )
}

export default FilterProducts;