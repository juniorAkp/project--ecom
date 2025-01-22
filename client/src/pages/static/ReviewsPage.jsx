import React, { useState, useEffect } from "react";

const sampleComments = [
  "Amazing service! Highly recommend.",
  "Great experience, but there's room for improvement.",
  "It was okay. Could have been better.",
  "Absolutely loved it! Will come back for sure.",
  "Not satisfied with the service, needs a lot of improvement.",
  "The staff was friendly, and the process was seamless.",
  "A bit expensive, but worth it for the quality.",
  "Very disappointing. I expected better.",
  "Exceeded my expectations! Fantastic job.",
  "The product quality was top-notch.",
  "Delivery was delayed, but the product was good.",
  "Affordable and reliable service.",
  "Fantastic customer support!",
  "Good experience overall, but can improve in some areas.",
  "Quick and efficient service, very impressed.",
];

const reviews = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  avatar: `https://i.pravatar.cc/100?u=user${i + 1}`,
  rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  comment: sampleComments[Math.floor(Math.random() * sampleComments.length)], // Random comment
}));

const ReviewCard = ({ avatar, name, rating, comment }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex gap-4 items-start">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-14 h-14 rounded-full"
      />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-yellow-500">
          {"⭐".repeat(rating)}{" "}
          <span className="text-gray-400">({rating}/5)</span>
        </p>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

const ReviewsPage = () => {
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreReviews = () => {
    if (visibleReviews < reviews.length) {
      setVisibleReviews((prev) => prev + 5); // Load 5 more reviews
    } else {
      setHasMore(false); // No more reviews to load
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 10 && hasMore) {
      loadMoreReviews();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center mb-8">Customer Reviews</h1>
        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
        {hasMore && (
          <p className="text-center text-gray-500 mt-6">Loading more reviews...</p>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 mt-6">You have reached the end!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
