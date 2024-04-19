import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddBooks from "./pages/admin/AddBooks";
import UpdateBook from "./pages/admin/UpdateBook";
import Books from "./pages/user/Books";
import "./style.css";
import Movies from "./pages/user/Movies";
import AddMovies from "./pages/admin/AddMovies";
import Layout from "./layout/layout";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import Ranking from "./pages/user/Ranking";
import BookPage from "./pages/user/BookPage";
import MoviePage from "./pages/user/MoviePage";
import UserCart from "./pages/user/UserCart";
import UpdateMovie from "./pages/admin/UpdateMovie";
import LoginUser from "./pages/user/LoginUser";
import LoginAdmin from "./pages/admin/LoginAdmin";
import ForgotPasswordPage from "./pages/user/ForgotPassword";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import { UserProvider } from "./pages/user/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/books/updatebook/:id" element={<UpdateBook />} />
          <Route path="/movies/updatemovie/:id" element={<UpdateMovie />} />
          <Route path="/addmovies" element={<AddMovies />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/viewbook/:id" element={<BookPage />} />
          <Route path="/viewmovie/:id" element={<MoviePage />} />
          <Route path="/usercart/:id" element={<UserCart />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
