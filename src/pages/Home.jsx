import { useEffect, useState } from "react";
import { Navbar, Banner } from "../components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <header>
        <Navbar isScrolled={isScrolled} />
      </header>
      <main className="animate-fadeIn">
        <Banner />
      </main>
    </>
  );
}
