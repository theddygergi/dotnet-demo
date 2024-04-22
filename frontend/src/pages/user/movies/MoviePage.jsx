import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { mediaBaseUrl } from "../../../constants/url.constant";
import "./MoviePage.css";
import Layout from "../../../layout/layout";
import { userCartBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import UserContext from "../auth/UserContext";
import BookRankingPage from "../../../layout/BookRankingPage";

const MoviePage = () => {
  const { userId } = useContext(UserContext);
  const location = useLocation();
  const nav = useNavigate();
  const movieId = location.pathname.split("/")[2];
  const [movie, setMovie] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false); // State to track whether to show the trailer
  const [ranking, setRanking] = useState(0);

  const userCartObj = {
    mediaId: movieId,
    userId: userId,
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${mediaBaseUrl}GetMovieById/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    const getRanking = async () => {
      try {
        const response = await axios.get(
          `${userCartBaseUrl}GetAverageRanking/${movieId}`
        );
        setRanking(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
    getRanking();
  }, [movieId]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(userCartBaseUrl + "AddToCart", userCartObj);
      console.log(res.status, res.statusText);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Movie added successfully to cart",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setAddedToCart(true);
  };

  const handleWatchTrailer = () => {
    setShowTrailer(true); // Show the trailer
  };

  if (!movie) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  // If showTrailer is true, render only the trailer
  if (showTrailer) {
    return (
      <Layout>
        <div className="trailer-container">
          <iframe
            className="trailer-iframe"
            src="https://www.youtube.com/embed/SzINZZ6iqxY?autoplay=0"
            title={`${movie.title} trailer`}
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Layout>
    );
  }

  // Render movie details and buttons
  return (
    <Layout>
      <div className="movie-container" key={movie.mediaId}>
        <div
          className={`movie ${expanded ? "expanded" : ""}`}
          onClick={handleClick}
        >
          <img className="movie-cover" src={movie.cover} alt={movie.title} />
          <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <BookRankingPage
              maxStars={5}
              stars={ranking}
              isSelectable={false}
            />
            <p className="movie-description">{movie.description}</p>
            <p className="movie-duration">
              Duration: {movie.durationMinutes} minutes
            </p>
            <p className="movie-year">Release Year: {movie.year}</p>
          </div>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button className="add-to-cart-btn" onClick={handleWatchTrailer}>
          Watch Trailer
        </button>
      </div>
    </Layout>
  );
};

export default MoviePage;
