import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { Footer, Header } from "../components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Password must match");
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) navigate("/");
    });
  }, []);

  return (
    <div className="bg-[url('https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1.jpg')]">
      <div className="bg-black/60">
        <Header />
        <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-8 mt-12 mx-6 md:mt-24 animate-fadeIn">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Unlimited movies, TV shows, and more.
          </h2>
          <h3 className="text-lg lg:text-2xl">
            Watch anywhere. Cancel anytime.
          </h3>
          <h4 className="text-lg lg:text-2xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h4>
          <div className="flex flex-col md:flex-row gap-4">
            <form
              action=""
              className="flex flex-col my-4 relative w-full lg:w-[450px]"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="mb-8 py-2 px-2 bg-black/50 border text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative flex flex-col">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-8 py-2 px-2 relative border bg-black/50 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute z-10 right-2 top-[7px] text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={28} color={"#40ac6d"} />
                  ) : (
                    <AiFillEye size={28} color={"#40ac6d"} />
                  )}
                </button>
              </div>
              <div className="relative flex flex-col">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Password Confirm"
                  className="mb-8 py-2 px-2 relative border bg-black/50 text-white"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute z-10 right-2 top-[7px] text-black"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <AiFillEyeInvisible size={28} color={"#40ac6d"} />
                  ) : (
                    <AiFillEye size={28} color={"#40ac6d"} />
                  )}
                </button>
              </div>
              <button className="bg-[#40ac6d] px-2 py-3 rounded-md">
                Register
              </button>
            </form>
          </div>
          <p className="text-gray-500 mb-12 md:mb-24">
            Alreay have an account?{" "}
            <Link to={"/login"} className="text-white hover:underline ml-2">
              Login
            </Link>
          </p>
        </div>
        <hr className="border-4 border-[#232323]" />
        <Footer />
      </div>
    </div>
  );
}
