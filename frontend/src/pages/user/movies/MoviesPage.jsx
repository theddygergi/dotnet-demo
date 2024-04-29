import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import Layout from "../../../layout/layout";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get(mediaBaseUrl + "GetAllMovies");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Movies</h1>
        <div className="movies">
          {movies.map((movie) => (
            <div className="movie" key={movie.mediaId}>
              {movie.cover && (
                <img
                  src={movie.cover}
                  alt=""
                  onClick={() => navigate(`/viewmovie/${movie.mediaId}`)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
