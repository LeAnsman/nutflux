import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../components";
import requests from "../utils/Requests";

export default function Movies() {
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
          <option default value={requests.fetchTopRated}>
            Top Rated
          </option>
          <option value={requests.fetchPopularMovies}>Popular</option>
        </select>
        <div>
          {movies?.map((movie) => (
            <div key={movie.id}>movie</div>
          ))}
        </div>
      </main>
    </>
  );
}
