import React, { useState, useEffect } from 'react';
import { getMyReviews } from '../services/review'; // Import the new function
import { getMovieDetails } from '../services/movies'; // To get movie titles
import { toast } from 'react-toastify';

const MyReview = () => {
    const [reviews, setReviews] = useState([]);

    const [movieTitles, setMovieTitles] = useState({});

    const fetchMyReviewsAndDetails = async () => {
        try {

            const response = await getMyReviews();

            if (response && response.status === 'success' && Array.isArray(response.data)) {
                const fetchedReviews = response.data;
                setReviews(fetchedReviews);

                // Fetch movie details concurrently
                const titlesMap = {};
                const uniqueMovieIds = [...new Set(fetchedReviews.map(r => r.movieId))];

                await Promise.all(uniqueMovieIds.map(async (movieId) => {
                    const detailResponse = await getMovieDetails(movieId);
                    if (detailResponse.status === 'success' && detailResponse.data && detailResponse.data.title) {
                        titlesMap[movieId] = detailResponse.data.title;
                    } else {
                        titlesMap[movieId] = 'Title Not Found';
                    }
                }));

                setMovieTitles(titlesMap);

            } else {
                toast.error(response.error || 'Failed to fetch your reviews.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching your reviews.');
        }
    };

    useEffect(() => {
        fetchMyReviewsAndDetails();
    }, []);



    return (
        <div className="container mt-4">
            <h1>My Movie Reviews</h1>
            {reviews.map((review) => {
                const displayRating = isNaN(Number(review.rating)) ? 'N/A' : `${review.rating}/10`;
                const movieTitle = movieTitles[review.movieId] || 'Loading Title...';
                const lastUpdated = review.modified
                    ? new Date(review.modified).toLocaleDateString()
                    : 'N/A';

                return (
                    <div className="card mb-3" key={review.id}>
                        <div className="card-header">
                            Movie: **{movieTitle}**
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Rating: {displayRating}</h5>
                            <p className="card-text">{review.review || 'No review comment provided.'}</p>
                            <footer className="blockquote-footer mt-2">
                                Last Updated: {lastUpdated}
                            </footer>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyReview;
