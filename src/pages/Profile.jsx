import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="animate-fadeIn flex flex-col items-center pt-36">
        <h2>Edit Profil</h2>
        <button onClick={() => signOut(firebaseAuth)}>Logout</button>
      </div>
    </>
  );
}
