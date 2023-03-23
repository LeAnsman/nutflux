import axios from "axios";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, List, Login, Movies, Profile, Register, TV } from "./pages";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { firebaseAuth } from "./utils/firebase-config";
import Details from "./pages/Details";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export default function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/list" element={<List />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/*" element={<Home />} />
        </>
      )}
    </Routes>
  );
}
