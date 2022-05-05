import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../store/business";

const ListBusinesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business)
  console.log(typeof(businesses), businesses);

  useEffect(() => {
    console.log("useEffect on ListBusinesses fired")
    dispatch(getBusinesses());
    console.log("... after dispatch, ListBusinesses component")
  }, [dispatch])

  return (
    <div className="businessList">
      <h1>List of Businesses</h1>
    </div>
  );
};

export default ListBusinesses;