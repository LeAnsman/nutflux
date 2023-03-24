import { Navbar, Row } from "../components";
import requests from "../utils/Requests";

export default function TV() {
  return (
    <>
      <Navbar />
      <main className="mt-36">
        <Row title={"Top Rated TV Show"} fetchUrl={requests.fetchTopRatedTV} />
        <Row title={"Popular TV Show"} fetchUrl={requests.fetchPopularTV} />
      </main>
    </>
  );
}
