import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import "./Books.css";

//import {Edit, Delete} from '@mui/icons-material'

const Books = () => {
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
            axios.delete(mediaBaseUrl + "DeleteBook/" + id);
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
            <button
              className="delete"
              onClick={() => handleDelete(book.mediaId)}
            >
              Delete
            </button>
            <button
              className="update"
              onClick={() => navigate(`updatebook/${book.mediaId}`)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
      <button className="Button" onClick={() => navigate("/addbooks")}>
        Add new Book
      </button>
    </div>
  );
};

export default Books;
