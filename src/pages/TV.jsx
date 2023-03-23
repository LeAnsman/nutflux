import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";
import requests from "../utils/Requests";

export default function TV() {
  const [movies, setMovies] = useState([]);

  const [selectedFetch, setSelectedFetch] = useState(requests.fetchTopRated);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(selectedFetch);
      setMovies(res.data.results);
      return res;
    };

    fetchData();
  }, [selectedFetch]);

  console.log(movies);

  return (
    <>
      <Navbar />
      <main className="mt-36">
        <select
          className="mx-10"
          onChange={(e) => setSelectedFetch(e.target.value)}
        >
          <option default value={requests.fetchTopRatedTV}>
            Top Rated
          </option>
          <option value={requests.fetchPopularTV}>Popular</option>
        </select>
        <div className="mx-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-5">
          {movies?.map((movie) => (
            <div key={movie.id} className="relative">
              <img
                src={
                  movie.backdrop_path
                    ? `${base_url}${movie.backdrop_path}`
                    : `${base_url}${movie.poster_path}`
                }
                alt=""
              />
              <Link className="absolute bottom-2 left-2 font-[600] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {movie.name || movie.title}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
