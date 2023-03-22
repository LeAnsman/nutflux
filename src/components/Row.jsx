import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
      return res;
    };

    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div>
      <h3>{title}</h3>
      {movies.map((movie) => (
        <img
          className={` ${isLargeRow && ""}`}
          src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.name}
          key={movie.id}
        />
      ))}
    </div>
  );
}
