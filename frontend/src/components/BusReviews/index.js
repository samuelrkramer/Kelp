import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBizReviews, deleteReview } from "../../store/reviews";

const BusReviews = ({ business }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [showForm, setShowForm] = useState(false);

  const reviews = useSelector(state => {
    if (!business.reviews) return null;
    return business.reviews.map(revId => state.reviews[revId])
  });
  console.log("reviews in BusReviews:", reviews);

  useEffect(() => {
    dispatch(getBizReviews(business.id));
  }, [dispatch, business.id])

  return (
    <div className="reviewContainer">
      <h2>Reviews go here</h2>
      {business.reviews && reviews.map(rev => (
        <div className="reviewBox" id={`rev${rev.id}`} key={rev.id}>
          {/* {rev.id} */}
          {rev.imgUrl && (<img src={rev.imgUrl} alt="review image" />)}
          <div className="rating">{rev.rating}/5 from {rev.User.username}</div>
          <p className="answer">
            {rev.answer}<br />
          </p>
        </div>
      ))}
    </div>
  );
};

export default BusReviews;