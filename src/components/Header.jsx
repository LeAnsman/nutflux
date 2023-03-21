import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-center md:justify-start pt-6 md:pl-12 text-[#40ac6d]">
      <Link to={"/"} className="text-6xl font-primary font-bold">
        NUTFLUX
      </Link>
    </div>
  );
}
