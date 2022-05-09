import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../store/business";

import "./ListBusinesses.css";

const noimg = require("../../static/noimg.jpeg");

const ListBusinesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business)
  // console.log(typeof(businesses), businesses);
  const bizIds = Object.keys(businesses);

  useEffect(() => {
    // console.log("useEffect on ListBusinesses fired")
    dispatch(getBusinesses());
    // console.log("... after dispatch, ListBusinesses component")
  }, [dispatch])

  return (
    <div className="contentBox">
      <div className="businessList">
        <h1>All Businesses</h1>
        <div className="busCardList">
          { bizIds.map(el => (
            <div className="busCard" key={el}>
              <img src={businesses[el].imgUrl || noimg} alt="Image"
              className="busCardImg" style={{
                maxHeight: "150px",
                maxWidth: "150px"
              }}/><br />
              <Link to={`/business/${businesses[el].id}`}>{businesses[el].title}</Link><br />
              <span className="busLocation">
                ({businesses[el].city}, {businesses[el].state})
              </span>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};

export default ListBusinesses;