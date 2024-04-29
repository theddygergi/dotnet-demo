import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import "./AddMovies.css";
const AddMovies = () => {
  const [movie, setMovie] = useState({
    mediaType: "movie",
    title: "",
    creator: "",
    description: "",
    cover: "",
    durationMinutes: "",
    year: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(mediaBaseUrl + "CreateMovie", movie);
      Swal.fire({
        icon: "success",
        title: "Movie added successfully",
      });
      navigate("/inventory");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <h1>Add New Movie</h1>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="creator"
          onChange={handleChange}
          name="creator"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="number"
          placeholder="Duration of the movie"
          onChange={handleChange}
          name="durationMinutes"
        />
        <input
          type="number"
          placeholder="year of release"
          onChange={handleChange}
          name="year"
        />
        <input
          type="text"
          placeholder="Trailer URL"
          onChange={handleChange}
          name="url"
        />
        <button className="formButton" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddMovies;
