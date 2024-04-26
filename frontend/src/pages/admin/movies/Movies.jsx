import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import "./Movies.css";

const Movies = () => {
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

  const handleDelete = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(mediaBaseUrl + "DeleteMovie/" + id);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1000,
            });
            window.location.reload();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
            });
          }
        });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
            <button
              className="delete"
              onClick={() => handleDelete(movie.mediaId)}
            >
              Delete
            </button>
            <button
              className="update"
              onClick={() => navigate("updatemovie/" + movie.mediaId)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
      <button className="Button" onClick={() => navigate("/addmovies")}>
        Add new Movie
      </button>
    </div>
  );
};

export default Movies;
