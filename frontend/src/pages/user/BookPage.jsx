import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { mediaBaseUrl, userCartBaseUrl } from "../../constants/url.constant";
import "./BookPage.css";
import Layout from "../../layout/layout";
import Swal from "sweetalert2";
import UserContext from "./UserContext";
import BookRankingPage from "../../layout/BookRankingPage";

const BookPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { userId } = useContext(UserContext);
  const bookId = location.pathname.split("/")[2];
  const [book, setBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showPDF, setShowPDF] = useState(false); // State to track whether to show the PDF
  const [ranking, setRanking] = useState(0);

  const userCartObj = {
    mediaId: bookId,
    userId: userId,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${mediaBaseUrl}GetBookById/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    const getRanking = async() => {
      try {
        const response = await axios.get(`${userCartBaseUrl}GetAverageRanking/${bookId}`)
        setRanking(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBook();
    getRanking();
  }, [bookId]);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(userCartBaseUrl + "AddToCart", userCartObj);
      console.log(res.status, res.statusText);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Book added successfully to cart",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setAddedToCart(true);
  };

  const handleReadPDF = () => {
    setShowPDF(true); // Show the PDF
  };

  if (!book) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  // If showPDF is true, render only the PDF viewer
  if (showPDF) {
    return (
      <Layout>
        <div style={{ height: "800px" }}>
          <object data={book.url} type="application/pdf" width="95%" height="100%">
            <p>PDF could not be displayed. Please <a href={book.url}>download it here</a>.</p>
          </object>
        </div>
      </Layout>
    );
  }

  // Render book details and buttons
  return (
    <Layout>
      <div className="book-container" key={book.mediaId}>
        <div className="book">
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <BookRankingPage maxStars={5} stars={ranking} isSelectable={false}/>
            <p>{book.description}</p>
            <p>Year of Release: {book.year}</p>
            <p>Number of Pages: {book.nbPages}</p>
          </div>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button className="add-to-cart-btn" onClick={handleReadPDF}>
          Read PDF
        </button>
      </div>
    </Layout>
  );
};

export default BookPage;
