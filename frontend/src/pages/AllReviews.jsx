import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../services/review';
import { toast } from 'react-toastify';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await getAllReviews();
            if (response && response.status === 'success' && Array.isArray(response.data)) {
                setReviews(response.data);
            } else {
                toast.error(response.error || 'Failed to fetch reviews.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching reviews.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) {
        return <div className="container mt-4">Loading reviews...</div>;
    }

    if (reviews.length === 0) {
        return <div className="container mt-4">No reviews found.</div>;
    }

    return (
        <div className="container mt-4">
            <h1>All Movie Reviews</h1>
            {reviews.map((review) => {
                
                const displayRating = isNaN(Number(review.rating)) ? 'N/A' : `${review.rating}/10`;

                return (
                    <div className="card mb-3" key={review.reviewId || review.id || Math.random()}>
                        <div className="card-header">
                            Review for: **{review.movieTitle || 'Movie Title Not Found'}**
                        </div>
                        <div className="card-body">
                           
                            <h5 className="card-title">Rating: {displayRating}</h5>
                            <p className="card-text">{review.comment}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AllReviews;
