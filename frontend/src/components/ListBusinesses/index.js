// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getBusinesses } from "../../store/business";
import Rating from "../Rating";

import "./ListBusinesses.css";

const noimg = require("../../static/noimg.jpeg");

const ListBusinesses = ({businesses, bizIds}) => {
  const dispatch = useDispatch();
  // console.log(typeof(businesses), businesses);
  // const bizIds = Object.keys(businesses);

  return (
    <div className="busCardList">
      { bizIds.map(el => {
        const revs = businesses[el].Reviews || [];
        // console.log(revs.length, revs);
        // const avgRate = revs.reduce((sum, rev) => sum + rev.rating, 0)/revs.length || 0;
        return (
        <div className="busCard" key={el}>
          <div className="busCardImageBox">
            <img src={businesses[el].imgUrl || noimg} alt="Image"
            className="busCardImg" style={{
              maxHeight: "150px",
              maxWidth: "150px"
            }}/>
          </div>
          <div className="busCardInfoBox">
            <h2><Link to={`/business/${businesses[el].id}`}>{businesses[el].title}</Link></h2>
            <h3><Rating reviews={revs} /></h3>
            <span className="busLocation">
              ({businesses[el].city}, {businesses[el].state})
            </span>
            {/* <h3>Rating: {avgRate} from {revs.length} reviews</h3> */}
            {/* <h3>⭐️★☆✩😕😀🙂😡🤢🌿</h3> */}
          </div>
        </div>
      )}
      ) }
    </div>
  );
};

export default ListBusinesses;