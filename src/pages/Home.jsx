import { useState } from "react";
import { Navbar } from "../components";
import backgroundImage from "../assets/img/home.jpg";
import MovieLogo from "../assets/img/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className="animate-fadeIn">
      <Navbar isScrolled={isScrolled} />
      <div className="">
        <img
          src={backgroundImage}
          alt="background-image"
          className="brightness-50 h-screen lg:w-screen relative"
        />
        <div>
          <div className="absolute bottom-10 left-10">
            <img src={MovieLogo} alt="Movie banner" />
            <div className="flex m-20 gap-8 text-xl font-[500]">
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
      </div>
    </div>
  );
}
