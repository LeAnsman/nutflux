import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <nav
      className={` flex justify-between items-center fixed top-0 z-40 transition duration-500  py-6 px-6 lg:px-12 w-full ${
        isScrolled ? "bg-black/90" : ""
      }`}
    >
      <div className="flex items-center text-primary gap-24">
        <h1
          className={`text-5xl font-primary font-bold transition duration-500 ${
            isScrolled ? "scale-90" : ""
          }`}
        >
          <Link to={"/"}>NUTFLUX</Link>
        </h1>
        <ul
          className={`hidden md:flex gap-6 lg:gap-12 text-white transition duration-500 ${
            isScrolled ? "scale-90" : ""
          }`}
        >
          {links.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link
                  to={link}
                  className="transition duration-300 font-[500] lg:text-lg hover:text-primary"
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`flex gap-12 transition duration-500 ${
          isScrolled ? "scale-90" : ""
        }`}
      >
        <div className={`${showSearch ? "border bg-black/60 px-4" : ""} flex`}>
          <button
            className="bg-transparent border-none focus:outline-none"
            onFocus={() => setShowSearch(true)}
            onBlur={() => {
              if (!inputHover) {
                setShowSearch(false);
              }
            }}
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            className={`transition duration-300 bg-transparent ${
              showSearch
                ? "w-full bg-transparent text-white px-4  translate-x-0"
                : "w-0 translate-x-48"
            }`}
            onMouseEnter={() => setInputHover(true)}
            onMouseLeave={() => setInputHover(false)}
            onBlur={() => {
              setShowSearch(false);
              setInputHover(false);
            }}
          />
        </div>
        <button onClick={() => navigate("/profile")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="nutflux_profil_picture"
            className="w-8 h-8 rounded-md"
          />
        </button>
      </div>
    </nav>
  );
}
