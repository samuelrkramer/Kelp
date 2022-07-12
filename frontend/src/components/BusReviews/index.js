import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getBizReviews, deleteReview, createReview } from "../../store/reviews";

const BusReviews = ({ business }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user) || {id: null};

  const [rating, setRating] = useState(5);
  const [answer, setAnswer] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState([]);

  const reviews = useSelector(state => {
    if (!business.reviews) return null;
    return business.reviews.map(revId => state.reviews[revId])
  });
  // console.log("reviews in BusReviews:", reviews);

  const buttonComponent = (<button onClick={() => setShowForm(!showForm)}>{showForm?"Cancel":"Leave a"} review</button>)

  const handleSubmit = async e => {
    e.preventDefault();

    const newReview = {
      userId: sessionUser.id,
      businessId: business.id,
      rating, answer, imgUrl
    };

    try {
      const result = await dispatch(createReview(newReview, business.id, sessionUser));
      if (result) {
        setShowForm(false);
        setRating(5);
        setAnswer("");
        setImgUrl("");
      }
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) setErrors(data.errors);
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
          {errors.length > 0 && (
            <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
              ))}
            </ul>
          )}
          <label>Rating
            <input
              name="rating"
              type="number"
              value={rating}
              onChange={e => {
                if (e.target.value < 6 && e.target.value > 0) setRating(e.target.value)
              }}
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
          <div className="underForm">
            <button type="submit">Submit</button>
            {buttonComponent}
          </div>
        </form>
      </div>
      )}
      {/* <button onClick={() => setShowForm(!showForm)}>{showForm?"Cancel":"Leave a"} review</button> */}
      {!showForm && buttonComponent}
      <div className="reviewContainer">
        <h2>Reviews</h2>
        {business.reviews && reviews.map(rev => (
          <div className="reviewBox" id={`rev${rev.id}`} key={rev.id}>
            {/* {rev.id} */}
            {!(!rev.imgUrl) && (<img src={rev.imgUrl} alt="review image" />)}
            <div className="revNotImg">
              <div className="rating">{rev.rating}/5 from {rev.User.username}</div>
              <p className="answer">
                {rev.answer}<br />
              </p>
              {rev.User.id === sessionUser.id && (
                <button onClick={() => handleDelete(rev.id)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BusReviews;