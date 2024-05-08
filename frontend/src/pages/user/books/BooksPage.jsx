import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import "./BooksPage.css";
//import {Edit, Delete} from '@mui/icons-material'

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(mediaBaseUrl + "GetAllBooks");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Books</h1>
        <div className="books">
          {books.map((book) => (
            <div className="book" key={book.mediaId}>
              {book.cover && (
                <img
                  src={book.cover}
                  alt=""
                  onClick={() => navigate(`/viewbook/${book.mediaId}`)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BooksPage;
