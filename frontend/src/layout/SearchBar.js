import React, { useState } from "react";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import "./SearchBar.css";
import { mediaBaseUrl } from "../constants/url.constant";
import { light } from "@mui/material/styles/createPalette";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const nav = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(mediaBaseUrl + `Search/?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book or movie..."
        />
        <Button className="Button" onClick={handleSubmit}>
          <Search />
        </Button>
      </form>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.mediaId}>
                <td>
                  <img
                    src={result.cover}
                    onClick={() =>
                      result.mediaType === "Book"
                        ? nav(`/viewbook/${result.mediaId}`)
                        : nav(`/viewmovie/${result.mediaId}`)
                    }
                  />
                </td>
                <td>{result.title}</td>
                <td>{result.creator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchBar;
