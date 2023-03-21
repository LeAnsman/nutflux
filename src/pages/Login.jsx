import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Footer, Header } from "../components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <div className="h-screen md:bg-[url('login.jpg')]">
      <div className="bg-black/50 h-screen -z-10">
        <Header />
        <div className="flex justify-center items-center h-[500px] bg-black/75 mx-auto w-full md:w-4/6 lg:w-1/2 xl:w-1/3 mt-12 md:mt-32">
          <div className="w-5/6">
            <h2 className="text-3xl font-bold">Login</h2>
            <form
              action=""
              className="flex flex-col my-4 relative"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" className="pb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="mb-8 py-2 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative flex flex-col">
                <label htmlFor="password" className="pb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-8 py-2 px-2 relative"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute z-10 right-2 top-10 text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={28} color={"#40ac6d"} />
                  ) : (
                    <AiFillEye size={28} color={"#40ac6d"} />
                  )}
                </button>
              </div>

              <button className="bg-[#40ac6d] px-2 py-4 rounded-md">
                Login
              </button>
            </form>
            <div className="flex justify-between mb-10">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="hover:cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-500 hover:cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <p className="text-gray-500">Need help?</p>
            </div>
            <p className="text-gray-500">
              New to Netflix ?
              <Link
                to={"/register"}
                className="text-white hover:underline ml-2"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
