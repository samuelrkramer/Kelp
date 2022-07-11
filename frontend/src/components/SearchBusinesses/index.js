import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchBusinesses } from "../../store/business";
import ListBusinesses from "../ListBusinesses";

// import "./AllBusinesses.css";

// const noimg = require("../../static/noimg.jpeg");

const SearchBusinesses = () => {
  const { query } = useParams();

  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business)
  // console.log(typeof(businesses), businesses);
  // const bizIds = Object.keys(businesses);

  useEffect(() => {
    // console.log("useEffect on AllBusinesses fired")
    dispatch(searchBusinesses(query));
    // console.log("... after dispatch, AllBusinesses component")
  }, [dispatch]);

  return (
    <div className="contentBox">
      <div className="businessList">
        <h1>Search Results:</h1>
        <h2>For query: {query}</h2> 
        <ListBusinesses businesses={businesses} />
      </div>
    </div>
  );
};

export default SearchBusinesses;