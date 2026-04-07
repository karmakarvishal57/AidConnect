import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendURL, token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (token && token !== "") navigate("/");
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          toast.success("User created");
        } else {
          toast.error(data.message);
        }
      } else if (state === "Sign In") {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <div className="flex justify-center mt-20 max-w-[350px] shadow-2xl min-h-[45vh] mx-auto rounded-2xl  text-zinc-500 font-medium">
      <form
        className="flex flex-col items-base my-6 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-2xl font-medium">
              {state === "Sign Up" ? "Create Account" : "Log In"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "log in"} to book
              appointment
            </p>
          </div>
          {state === "Sign Up" ? (
            <>
              <p id="name">Full Name</p>
              <input
                type="text"
                id="NAME"
                className="border-1 border-zinc-300 rounded-lg focus-visible:outline-1 outline-zinc-400"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          ) : null}
          <label htmlFor="EMAIL" id="name">
            Email
          </label>
          <input
            type="email"
            id="EMAIL"
            className="border-1 border-zinc-300  rounded-lg focus-visible:outline-1 outline-zinc-400"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="PASSWORD" id="name">
            Password
          </label>
          <input
            type="password"
            id="PASSWORD"
            className="border-1 border-zinc-300  rounded-lg focus-visible:outline-1 outline-zinc-400"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="  mt-2 w-40 text-center py-1 rounded-lg bg-blue-400 cursor-pointer text-white"
          >
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </button>
          {state === "Sign Up" ? (
            <p className="text-sm">
              Already have an account ?
              <span
                className="cursor-pointer hover:opacity-50 "
                onClick={() => setState("Sign In")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Create a new account ?{" "}
              <span
                className="cursor-pointer hover:opacity-50 "
                onClick={() => setState("Sign Up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
