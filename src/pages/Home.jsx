import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import requests from "../utils/Requests";
import { Navbar, Banner, Row } from "../components";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="animate-fadeIn">
        <Banner />
        <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
        <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
        <Row
          title={"Netflix Originals"}
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} />
      </main>
    </>
  );
}
