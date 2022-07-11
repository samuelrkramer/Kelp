import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../store/business";
import ListBusinesses from "../ListBusinesses";

// import "./AllBusinesses.css";

// const noimg = require("../../static/noimg.jpeg");

const AllBusinesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business)
  // console.log(typeof(businesses), businesses);
  const bizIds = Object.keys(businesses);

  useEffect(() => {
    // console.log("useEffect on AllBusinesses fired")
    dispatch(getBusinesses());
    // console.log("... after dispatch, AllBusinesses component")
  }, [dispatch])
  // console.log("allbussinesses:", bizIds, businesses)

  return (
    <div className="contentBox">
      <div className="businessList">
        <h1>All Businesses</h1>
        <ListBusinesses businesses={businesses} bizIds={bizIds} />
      </div>
    </div>
  );
};

export default AllBusinesses;