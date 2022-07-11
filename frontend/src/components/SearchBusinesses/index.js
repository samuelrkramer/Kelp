import { useEffect, useState } from "react";
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
  const [bizIds, setBizIds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // console.log(typeof(businesses), businesses);
  // const bizIds = Object.keys(businesses);

  useEffect(async () => {
    // console.log("useEffect on AllBusinesses fired")
    const results = await dispatch(searchBusinesses(query));
    setBizIds(results);
    // console.log("... after dispatch, AllBusinesses component")
    setLoaded(true);
  }, [dispatch]);
  // console.log("searchbizIds: ", bizIds, businesses)

  return (
    <div className="contentBox">
      <div className="businessList">
        <h1>Search Results</h1>
        <h2>For query: {query}</h2>
        {/* {!loaded && (<h4>Loading...</h4>)} */}
        {loaded && (
          <>
            <h4>{bizIds.length || "No"} result{bizIds.length !== 1?"s":""}</h4>
            <ListBusinesses businesses={businesses} bizIds={bizIds} />
          </>
        ) || (<h4>Loading...</h4>)}
      </div>
    </div>
  );
};

export default SearchBusinesses;