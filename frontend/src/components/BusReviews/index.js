import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getBizReviews, deleteReview, createReview } from "../../store/reviews";

const BusReviews = ({ business }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [rating, setRating] = useState(5);
  const [answer, setAnswer] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

  const reviews = useSelector(state => {
    if (!business.reviews) return null;
    return business.reviews.map(revId => state.reviews[revId])
  });
  // console.log("reviews in BusReviews:", reviews);

  const handleSubmit = async e => {
    e.preventDefault();

    const newReview = {
      userId: sessionUser.id,
      businessId: business.id,
      rating, answer, imgUrl
    };

    const result = await dispatch(createReview(newReview, business.id, sessionUser));
    if (result) {
      setShowForm(false);
      setRating(5);
      setAnswer("");
      setImgUrl("");
    }
  }

  const handleDelete = async (id) => {
    const result = dispatch(deleteReview(id, business.id));
    if (!result) alert("Delete failed");
  }

  useEffect(() => {
    dispatch(getBizReviews(business.id));
  }, [dispatch, business.id])

  return (
    <>
      {showForm && (
        <div className="revFormBox">
        <form onSubmit={handleSubmit}>
          <label>Rating
            <input
              name="rating"
              type="number"
              value={rating}
              onChange={e => setRating(e.target.value)}
              />
          </label>
          <label>Review
            <textarea
              name="answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              />
          </label>
          <label>Image URL
            <input
              name="imgUrl"
              type="text"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      )}
      <button onClick={() => setShowForm(!showForm)}>{showForm?"Cancel":"Leave a"} review</button>
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
            {rev.User.id === sessionUser.id && (
              <button onClick={() => handleDelete(rev.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BusReviews;