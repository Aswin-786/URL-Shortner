import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../shared/config";
import { userState } from "../store/atom/user";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const [email, setEmail] = useState("okokoi@d.com");
  const [password, setPassword] = useState("Aswin@1999");
  const [emailError, setEmailError] = useState("");
  const [inputBorderColorEmail, setInputBorderColorEmail] =
    useState("border-blue-400");

  const [inputBorderColorPsswrd, setInputBorderColorPsswrd] =
    useState("border-blue-400");
  const [passwordErr, setPasswordErr] = useState("");

  const [error, setError] = useState(null);

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const hasWhiteSpace = /\s/;

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // Check for lowercase characters
  const hasLowercase = (password) => {
    const re = /[a-z]/;
    return re.test(password);
  };

  // Check for uppercase characters
  const hasUppercase = (password) => {
    const re = /[A-Z]/;
    return re.test(password);
  };

  // Check for numbers
  const hasNumber = (password) => {
    const re = /[0-9]/;
    return re.test(password);
  };

  // Check for special characters
  const hasSpecialChar = (password) => {
    const re = /[!@#$%^&*]/;
    return re.test(password);
  };

  // Check password length
  const hasValidLength = (password) => {
    let minLength = 8;
    return password.length >= minLength;
  };
  const handleEmail = (value) => {
    const email = value.trim();
    setEmail(email);
    let valid = false;
    if (hasWhiteSpace.test(email)) {
      setEmailError("email cannot have whitespace.");
      setInputBorderColorEmail("border-red-400");
    } else if (!isRequired(email)) {
      setEmailError("email cannot be blank.");
      setInputBorderColorEmail("border-red-400");
    } else if (!isEmailValid(email)) {
      setEmailError("email format not valid.");
      setInputBorderColorEmail("border-red-400");
    } else {
      setEmailError("");
      setInputBorderColorEmail("border-green-400");
      valid = true;
    }
    return valid;
  };
  const handlePassword = (value) => {
    const password = value.trim();
    let valid = false;
    setPassword(password);
    if (hasWhiteSpace.test(password)) {
      setPasswordErr("password cant have whitespace");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!isRequired(password)) {
      setPasswordErr("password cannot be blank");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!hasLowercase(password)) {
      setPasswordErr("password should contain lowecase letter");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!hasUppercase(password)) {
      setPasswordErr("password should contain uppercase letter");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!hasSpecialChar(password)) {
      setPasswordErr("password should contain symbols (!@#$%^&*)");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!hasNumber(password)) {
      setPasswordErr("password should contain num,bers (0 - 9)");
      setInputBorderColorPsswrd("border-red-400");
    } else if (!hasValidLength(password)) {
      setPasswordErr("password should have length 8");
      setInputBorderColorPsswrd("border-red-400");
    } else {
      setPasswordErr("");
      setInputBorderColorPsswrd("border-green-400");
      valid = true;
    }
    return valid;
  };
  const login = async (e) => {
    e.preventDefault();
    let checkPassword = handlePassword(password),
      checkEmail = handleEmail(email);

    let status = checkPassword && checkEmail;
    if (status) {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 201) {
          setUser({
            isLoading: false,
            userName: response.data.user.name,
            userId: response.data.user._id,
          });
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert("Wrong credentials");
        }
      } catch (error) {
        alert("wrong credentials");
        setError("error occurs");
      }
    }
  };
  return (
    <>
      <form className="flex flex-col items-center justify-center">
        <h1 className="text-center font-semibold  md:text-4xl text-3xl py-5">
          Login
        </h1>
        <div className="border border-gray-400 p-8 w-[280px] sm:w-[320px] md:w-[400px] ">
          <div className="flex flex-col my-3">
            <label className="text-sm" htmlFor="username">
              email:
            </label>
            <input
              type="email"
              name="username"
              className={` border-2 mt-2 outline-none p-1  ${inputBorderColorEmail}`}
              value={email}
              required
              onChange={(e) => handleEmail(e.target.value)}
              autoComplete="off"
            />{" "}
            <small className="my-2 text-xs  w-full text-red-500">
              {emailError}
            </small>
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              required
              className={` border-2 mt-2 outline-none p-1  ${inputBorderColorPsswrd}`}
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              name="password"
              id="password"
              autoComplete="off"
            />
            <small className="my-2 text-xs  w-full text-red-500">
              {passwordErr}
            </small>
          </div>

          <button
            className=" my-2 text-center border-2 w-full bg-black px-3 py-2 rounded-sm text-white hover:bg-white hover:text-black transition-all hover:border-2 hover:border-black"
            onClick={login}
          >
            Login
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <p className=" text-base">New user?</p>
          <Link
            to={"/register"}
            className="text-stone-800  text-lg hover:opacity-80 transition-all"
          >
            register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
