import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import "./Movies.css";
import { Delete, Edit } from "@mui/icons-material";

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
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(mediaBaseUrl + "DeleteMovie/" + id);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1000,
            });
            // Refresh movies after deletion
            const res = await axios.get(mediaBaseUrl + "GetAllMovies");
            setMovies(res.data);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Creator</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.mediaId}>
              <td>
                {movie.cover && (
                  <img
                    src={movie.cover}
                    alt=""
                    onClick={() => navigate(`/viewmovie/${movie.mediaId}`)}
                  />
                )}
              </td>
              <td>
                {movie.creator}
              </td>
              <td>
                {movie.durationMinutes}
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(movie.mediaId)}
                >
                  <Delete/>
                </button>
                <button
                  className="update"
                  onClick={() => navigate("updatemovie/" + movie.mediaId)}
                >
                  <Edit/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="Button" onClick={() => navigate("/addmovies")}>
        Add new Movie
      </button>
    </div>
  );
};

export default Movies;
