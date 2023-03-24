import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, selectLike } from "../features/likeSlice";
import { IoHeart } from "react-icons/io5";

export default function RowCard({ movie }) {
  const likesId = useSelector(selectLike);

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  function handleLike(movie) {
    setIsLiked(true);
    dispatch(addLike(movie.id));
  }

  function handleDislike(movie) {
    setIsLiked(false);
    dispatch(removeLike(movie.id));
  }

  const base_url = "https://image.tmdb.org/t/p/original";

  return (
    <div className="min-w-[340px] mx-2 relative transition duration-500 hover:scale-105">
      <Link
        to={`/details/${movie.id}`}
        className="cursor-grab active:cursor-grabbing"
      >
        <img
          className="max-h-48 object-contain w-full"
          src={
            movie.backdrop_path
              ? `${base_url}${movie.backdrop_path}`
              : `${base_url}${movie.poster_path}`
          }
          alt={movie.name || movie.title}
        />
        <p className="absolute bottom-2 left-2 font-[600] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer">
          {movie.name || movie.title}
        </p>
      </Link>

      {isLiked ? (
        <button
          type="button"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => handleDislike(movie)}
        >
          <IoHeart
            size={24}
            className="top-1 right-1 stroke-[20px] stroke-transparent fill-red-700"
          />
        </button>
      ) : (
        <button
          type="button"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => handleLike(movie)}
        >
          <IoHeart
            size={24}
            className="top-1 right-1 stroke-[20px] stroke-black fill-white"
          />
        </button>
      )}
    </div>
  );
}
