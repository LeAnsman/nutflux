import { Navbar, Row } from "../components";
import requests from "../utils/Requests";

export default function Movies() {
  return (
    <>
      <Navbar />
      <main className="mt-36 mb-12">
        <Row title={"Top Rated Movies"} fetchUrl={requests.fetchTopRated} />
        <Row title={"Popular Movies"} fetchUrl={requests.fetchPopularTV} />
        <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
        <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} />
      </main>
    </>
  );
}
