import { React, useState } from "react";
import axios from "axios";
import { AiOutlineDownload } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const fetchTrailer = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          params: {
            api_key: "5c97d94c472290e8df97deb85bdcd014",
          },
        }
      );

      const trailer = data.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsOverlayVisible(true);
      } else {
        alert("Trailer not available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleDownload = () => {
    alert(
      "This is a simulated download link. Implement actual download logic with proper licensing."
    );
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setTrailerKey(null);
  };

  const handleCardClick = () => {
    setIsOverlayVisible(true);
    fetchTrailer();
  };

  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <img
          className="movie-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <h5 className="movie-title">{movie.original_title}</h5>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div
            className="overlay-content"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
          >
            <span className="close-button" onClick={closeOverlay}>
              <FontAwesomeIcon icon={faClose} />
            </span>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <div className="movie-actions">
              <button onClick={fetchTrailer}>Watch Trailer</button>
              <AiOutlineDownload
                onClick={handleDownload}
                className="download-icon"
              />
            </div>
            {trailerKey && (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
