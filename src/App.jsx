import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./Components/MovieCard";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faHouse } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchMovies = async (searchTerm = "") => {
    const type = searchTerm ? "search/movie" : "discover/movie";
    try {
      const {
        data: { results },
      } = await axios.get(`https://api.themoviedb.org/3/${type}`, {
        params: {
          api_key: "5c97d94c472290e8df97deb85bdcd014",
          query: searchTerm,
        },
      });
      setMovies(results);
      console.log("Fetched data:", results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  const handleHomeClick = () => {
    setSearch("");
    fetchMovies();
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <div className="app">
      <header className="header">
        <div className="icon-container">
          <span className="home-icon" onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHouse} />
          </span>
          <h1>VMoviez</h1>
        </div>
        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search for a movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <div className="container">{renderMovies()}</div>

      {showScrollTop && (
        <div className="scroll-top-icon" onClick={handleScrollTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      )}
    </div>
  );
}

export default App;
