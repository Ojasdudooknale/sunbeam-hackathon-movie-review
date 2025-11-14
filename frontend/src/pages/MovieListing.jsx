import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'


function MovieListing() {
    // store all the movies
    const [movies, setMovies] = useState([])



    const getMoviesList = async () => {
        const response = await getMovies()
        console.log(response)
        if (response['status'] == 'success') {
            // set the properties and re-render the component UI
            setMovies(response['data'])
        }
    }

    useEffect(() => {
        // load the properties automatically when this component is launched
        getMoviesList()
    }, [])



    return (
        <div className="container mt-4">
            <h2>All Movies</h2>
            <div className="row gap-4">
                {/* Use the map function to iterate over the movies array */}
                {movies.map((movie) => (
                    // Assign a unique key for React list rendering optimization
                    <div key={movie.id} className="col-md-4">
                        <div className="card" style={{ width: '18rem' }}>
                            {/* You could add an image tag here if your data has image URLs */}
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.description}</p>
                                <p className="card-text">Rating: {movie.rating}/5</p>
                                {/* Example of how to link to a review page using movie ID */}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => toast.info(`Navigating to review page for ${movie.title}`)}
                                >
                                    Review this movie
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieListing
