import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const scrollRef = useRef();
  const { events } = useDraggable(scrollRef);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
      return res;
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="ml-5">
      <h3 className="font-[500] text-2xl">{title}</h3>
      <div
        ref={scrollRef}
        {...events}
        className="row_posters flex overflow-y-hidden overflow-x-scroll p-5"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[340px] mr-4 relative transition duration-500 hover:scale-105"
          >
            <img
              className="max-h-48 object-contain w-full"
              src={`${base_url}${movie.backdrop_path}`}
              alt={movie.name || movie.title}
            />
            <Link className="absolute bottom-2 left-2 font-[600] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {movie.name || movie.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
