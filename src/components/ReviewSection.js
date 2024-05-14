import React from 'react';

const ReviewSection = ({ reviews, loading }) => {
  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="review-section">
      <h2>Reviews</h2>
      <div className="review-list">
        {/* {reviews.map((review, index) => (
          <div key={index} className="review">
            <h3>{review.title}</h3>
            <p>{review.content}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ReviewSection;
