import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../store/business";

const ListBusinesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business)
  console.log(typeof(businesses), businesses);
  const bizIds = Object.keys(businesses);

  useEffect(() => {
    console.log("useEffect on ListBusinesses fired")
    dispatch(getBusinesses());
    console.log("... after dispatch, ListBusinesses component")
  }, [dispatch])

  return (
    <div className="businessList">
      <h1>List of Businesses</h1>
      { bizIds.map(el => (
        <div key={el}>
          <Link to={`/business/${businesses[el].id}`}>{businesses[el].title}</Link>
          ({businesses[el].city}, {businesses[el].state})
        </div>
      )) }
    </div>
  );
};

export default ListBusinesses;