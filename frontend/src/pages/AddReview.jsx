import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Import your service functions
import { getMovieDetails, addMovieReview } from '../services/movies';


const AddReview = () => {
    // Get the movieId from the URL parameters (must match the :movieId from App.js route)
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [movieDetails, setMovieDetails] = useState(null); // State to store all movie details




    const fetchMovieDetails = async () => {

        try {

            const response = await getMovieDetails(movieId);

            if (response && response.status === 'success' && response.data) {
                setMovieDetails(response.data);
            } else {
                toast.error(response.error || 'Failed to load movie details.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching movie details.');
        }
    };

    // Effect hook to load movie details when the component mounts or movieId changes
    useEffect(() => {
        fetchMovieDetails();
    }, [movieId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation for rating range (1-10) and text presence
        if (rating < 1 || rating > 10 || reviewText.trim() === '') {
            toast.error('Please provide a valid rating between 1 and 10, and a review comment.');
            return;
        }

        const reviewData = {
            // Send the required data payload to the backend
            // You might need to adjust these key names based on your backend API specs
            movieId: movieId,
            comment: reviewText,
            rating: rating,
            // Backend usually handles adding the userId via the auth token
        };

        try {
            // Call your backend service to add the review
            const response = await addMovieReview(reviewData);

            if (response.status === 'success') {
                toast.success(response.message || 'Review submitted successfully!');
                // Navigate back to the movie listings page after success
                navigate('/home/movies');
            } else {
                toast.error(response.error || 'Failed to submit review.');
            }
        } catch (error) {
            toast.error('An error occurred during submission.');
        }
    };




    return (
        <div className="container mt-4">
            {/* Display the actual title fetched from the backend */}
            <h1>Create Review for: {movieDetails.title}</h1>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating (1-10):</label>
                    <input
                        type="number"
                        id="rating"
                        className="form-control"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        style={{ width: '120px' }} // Adjusted width to fit the input nicely
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="reviewText" className="form-label">Your Review:</label>
                    <textarea
                        id="reviewText"
                        className="form-control"
                        rows="4"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>

                {/* Cancel button that navigates back one page */}
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddReview;
