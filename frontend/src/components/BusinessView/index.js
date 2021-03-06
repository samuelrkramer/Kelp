import { useEffect } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBusiness } from "../../store/business";
import BusReviews from "../BusReviews";
import Rating from "../Rating";

import "./BusinessView.css"

const BusinessView = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // const { businessIdStr } = useParams();
  let { businessId } = useParams();
  businessId = parseInt(businessId);
  // console.log("businessId", businessId, typeof(businessId))
  const business = useSelector(state => state.business[businessId]) //|| {
    //   title: "Not found business",
    //   description: "No description",
    //   address: "no address",
    //   city: "no city",
    //   state: "NA",
    //   zipCode: "xxxxx"
    // };

  useEffect(() => {
    // console.log("useEffect on BusinessView fired")
    if (!business) dispatch(fetchOneBusiness(businessId));
    // dispatch(getBizReviews(businessId));
    // console.log("... after dispatch, BusinessView component")
  }, [businessId, dispatch])

  if (!business) {
    // console.log("no business, returning null from BusinessView component")
    return (<Redirect to="/" />);
  }

  return (
    <div className="contentBox">
      <div className="businessDiv">
        {!(!business.imgUrl) && (<img src={business.imgUrl} alt={business.title} />)}
        <h1>{business.title}</h1>
        <h2><Rating reviews={business.Reviews} /></h2> 
        {sessionUser && business.ownerId === sessionUser.id && (
          <Link to={`/editBusiness/${businessId}`}>Edit Business</Link>
        )}
        <div className="pBox">
          <p>
            {business.address}<br />
            {business.city}, {business.state} {business.zipCode}
          </p>
          <p>
            {business.description}
          </p>
        </div>
        <BusReviews business={ business } />
      </div>
    </div>
  );
};

export default BusinessView;
