// emojis I considered:
// ⭐️★☆✩😕😀🙂😡🤢🌿
// TODO: replace these with fontawesome icons

const Rating = ({reviews}) => {
  // console.log(reviews.length, reviews);
  if (!reviews.length) {
    return(<>
    😀🤢😕😡🙂🌿 Be the first to leave a review!)
    </>)
  }

  const sum = reviews.reduce((sum, rev) => sum + rev.rating, 0)
  const avg = sum/reviews.length || 0;
  const stars = Math.round(avg)
  const starString = "★".repeat(stars).padEnd(5,"☆")

  return (
    <>
    {starString} ({avg.toFixed(2)}) from {reviews.length} review{reviews.length>1?"s":""}
    </>
  )
};

export default Rating;