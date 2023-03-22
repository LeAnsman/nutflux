import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import requests from "../utils/Requests";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
      return res;
    }
    fetchData();
  }, []);

  console.log(movie);
  return (
    <div
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="h-screen"
    >
      <div className="flex flex-col absolute bottom-60 left-10 gap-5">
        <h3 className="text-4xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h3>
        <p className="w-3/4 xl:w-1/2"> {movie?.overview}</p>
        <div className="flex gap-8 text-xl font-[500]">
          <button className="flex items-center gap-3 bg-white text-black py-2 px-6 rounded-md">
            <FaPlay size={20} />
            Play
          </button>
          <button className="flex items-center gap-3 bg-gray-500/75 py-2 px-4 rounded-md">
            <AiOutlineInfoCircle size={24} />
            More Infos
          </button>
        </div>
      </div>
    </div>
  );
}
