import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../store/business";
import ListBusinesses from "../ListBusinesses";

// import "./AllBusinesses.css";

// const noimg = require("../../static/noimg.jpeg");

const AllBusinesses = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const businesses = useSelector(state => state.business)
  // console.log(typeof(businesses), businesses);
  const bizIds = Object.keys(businesses);

  useEffect(() => {
    // console.log("useEffect on AllBusinesses fired")
    dispatch(getBusinesses());
    // console.log("... after dispatch, AllBusinesses component")
    setLoaded(true);
  }, [dispatch])
  // console.log("allbussinesses:", bizIds, businesses)

  return (
    <div className="contentBox">
      <div className="businessList">
        <h1>All Businesses</h1>
        {/* {!loaded && (<h4>Loading...</h4>)} */}
        {loaded && (
          <ListBusinesses businesses={businesses} bizIds={bizIds} />
        ) || (<h4>Loading...</h4>)}
      </div>
    </div>
  );
};

export default AllBusinesses;