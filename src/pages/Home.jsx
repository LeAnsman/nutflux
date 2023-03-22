import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import requests from "../utils/Requests";
import { Navbar, Banner, Row } from "../components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (authUser) => {
      if (!authUser) navigate("/login");
    });
  }, []);

  return (
    <>
      <header>
        <Navbar isScrolled={isScrolled} />
      </header>
      <main className="animate-fadeIn">
        <Banner />
        <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
        <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
        <Row
          title={"Netflix Originals"}
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
        <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} />
        <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} />
      </main>
    </>
  );
}
