import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <nav
      className={` flex justify-between items-center sticky top-0 z-40 transition duration-300  pt-6 px-6 md:px-12 ${
        isScrolled ? "bg-black" : ""
      }`}
    >
      <div className="flex items-center text-[#40ac6d] gap-12">
        <h1 className="text-6xl font-primary font-bold">NUTFLUX</h1>
        <ul className="flex gap-12 text-white">
          {links.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-12">
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
                ? "w-full bg-transparent text-white px-4 py-3 translate-x-0"
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
        <button onClick={() => signOut(firebaseAuth)}>
          <FaPowerOff />
        </button>
      </div>
    </nav>
  );
}
