import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";
import RowCard from "./RowCard";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const scrollRef = useRef();
  const { events } = useDraggable(scrollRef);

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
          <RowCard movie={movie} />
        ))}
      </div>
    </div>
  );
}
