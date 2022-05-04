import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneBusiness } from "../../store/business";

const BusinessView = () => {
  const dispatch = useDispatch();
  // const { businessIdStr } = useParams();
  let { businessId } = useParams();
  businessId = parseInt(businessId);
  console.log("businessId", businessId, typeof(businessId))
  const business = useSelector(state => state.business[businessId]) //|| {
    //   title: "Not found business",
    //   description: "No description",
    //   address: "no address",
    //   city: "no city",
    //   state: "NA",
    //   zipCode: "xxxxx"
    // };

  useEffect(() => {
    console.log("useEffect on BusinessView fired")
    dispatch(fetchOneBusiness(businessId));
    console.log("... after dispatch, BusinessView component")
  }, [businessId, dispatch])

  if (!business) {
    console.log("no business, returning null from BusinessView component")
    return null;
  }

  return (
    <div className="businessDiv">
      {business.imgUrl && (<img src={business.imgUrl} />)}
      <h1>{business.title}</h1>
      <p>
        {business.address}
        {business.city}, {business.state} {business.zipCode}
      </p>
    </div>
  );
};

export default BusinessView;
