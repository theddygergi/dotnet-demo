import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UpdateBook from "./pages/admin/books/UpdateBook";
import AddBookPage from "./pages/admin/books/AddBookPage";
import Books from "./pages/admin/books/Books";
import "./style.css";
import Movies from "./pages/admin/movies/Movies";
import Register from "./pages/user/auth/Register";
import Home from "./pages/user/home/Home";
import Ranking from "./pages/user/usercart/Ranking";
import BookPage from "./pages/user/books/BookPage";
import MoviePage from "./pages/user/movies/MoviePage";
import UserCart from "./pages/user/usercart/UserCart";
import UpdateMovie from "./pages/admin/movies/UpdateMovie";
import LoginUser from "./pages/user/auth/LoginUser";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import RegisterAdmin from "./pages/admin/auth/RegisterAdmin";
import { UserProvider } from "./pages/user/auth/UserContext";
import SearchPage from "./pages/user/home/SearchPage";
import AdminPage from "./pages/admin/AdminPage";
import AddMoviesPage from "./pages/admin/movies/AddMoviePage";
import InventoryPage from "./pages/admin/InventoryPage";

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
          <Route path="/addbooks" element={<AddBookPage />} />
          <Route path="/books/updatebook/:id" element={<UpdateBook />} />
          <Route path="/movies/updatemovie/:id" element={<UpdateMovie />} />
          <Route path="/addmovies" element={<AddMoviesPage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/viewbook/:id" element={<BookPage />} />
          <Route path="/viewmovie/:id" element={<MoviePage />} />
          <Route path="/usercart/:id" element={<UserCart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
