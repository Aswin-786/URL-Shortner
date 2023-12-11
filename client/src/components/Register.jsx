import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/config";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("aswin");
  const [userNameError, setUserNameError] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("border-blue-400");

  const [email, setEmail] = useState("okok@d.com");
  const [emailError, setEmailError] = useState("");
  const [inputBorderColorEmail, setInputBorderColorEmail] =
    useState("border-blue-400");

  const [password, setPassword] = useState("Aswin@1999");
  const [passwordErr, setPasswordErr] = useState("");
  const [inputBorderColorPsswrd, setInputBorderColorPsswrd] =
    useState("border-blue-400");
  const [confirmPassword, setConfirmPassword] = useState("Aswin@1999");
  const [inputBorderColorPsswrdConfirm, setInputBorderColorPsswrdConfirm] =
    useState("border-blue-400");
  const [confirmPsswrdErr, setConfirmPsswrdErr] = useState("");

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const hasWhiteSpace = /\s/;

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // const isPasswordSecure = (password) => {
  //   const re = new RegExp(
  //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  //   );
  //   return re.test(password);
  // };
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

  const handleUserName = (value) => {
    let valid = false;
    const min = 3,
      max = 25;
    const username = value.trim();
    setUserName(username);
    console.log(value.trim());

    if (hasWhiteSpace.test(userName)) {
      setUserNameError("Username cannot have whitespace.");
      setInputBorderColor("border-red-400");
    } else if (!isRequired(username)) {
      setUserNameError("Username cannot be blank.");
      setInputBorderColor("border-red-400");
    } else if (!isBetween(username.length, min, max)) {
      setUserNameError(
        `Username must be between ${min} and ${max} characters.`
      );
      setInputBorderColor("border-red-400");
    } else {
      setUserNameError("");
      setInputBorderColor("border-green-400");
      valid = true;
    }
    return valid;
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

  const handleConfirmPsswrd = (value) => {
    const passwordConfirm = value.trim();
    setConfirmPassword(passwordConfirm);
    let valid = false;
    if (password === passwordConfirm) {
      valid = true;
      setConfirmPsswrdErr("");
      setInputBorderColorPsswrdConfirm("border-green-400");
    } else {
      setConfirmPsswrdErr("not equal pasword");
      setInputBorderColorPsswrdConfirm("border-red-400");
    }
    return valid;
  };

  const register = async (e) => {
    e.preventDefault();

    let checkUserName = handleUserName(userName),
      checkPassword = handlePassword(password),
      checkEmail = handleEmail(email),
      checkConfirm = handleConfirmPsswrd(confirmPassword);

    let status = checkUserName && checkPassword && checkEmail && checkConfirm;
    if (status) {
      try {
        const data = await axios.post(
          `${BASE_URL}/auth/signup`,
          { name: userName, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigate("/login");
      } catch (error) {
        alert("already registerd email");
      }

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setInputBorderColor("border-blue-400");
      setInputBorderColorEmail("border-blue-400");
      setInputBorderColorPsswrd("border-blue-400");
      setInputBorderColorPsswrdConfirm("border-blue-400");
    }
  };

  return (
    <>
      <form className="flex flex-col items-center justify-center">
        <h1 className="text-center font-semibold  md:text-4xl text-3xl py-5">
          Register
        </h1>
        <div className="border border-gray-400 p-8 w-[280px] sm:w-[320px] md:w-[400px] ">
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className={` border-2 mt-2 outline-none p-1  ${inputBorderColor}`}
              value={userName}
              onChange={(e) => handleUserName(e.target.value)}
              autoComplete="off"
            />
            <small className="my-2 text-xs  w-full text-red-500">
              {userNameError}
            </small>
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              name="email"
              className={` border-2 mt-2 outline-none p-1  ${inputBorderColorEmail}`}
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              autoComplete="off"
            />
            <small className="my-2 text-xs  w-full text-red-500">
              {emailError}
            </small>
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
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

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="confirm-password">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm-password"
              className={` border-2 mt-2 outline-none p-1  ${inputBorderColorPsswrdConfirm}`}
              value={confirmPassword}
              onChange={(e) => handleConfirmPsswrd(e.target.value)}
              autoComplete="off"
            />
            <small className="my-2 text-xs  w-full text-red-500">
              {confirmPsswrdErr}
            </small>
          </div>

          <button
            className=" my-2 text-center border-2 w-full bg-black px-3 py-2 rounded-sm text-white hover:bg-white hover:text-black transition-all hover:border-2 hover:border-black"
            onClick={register}
          >
            Register
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <p className=" text-base">Allready registered?</p>
          <Link
            to={"/login"}
            className="text-stone-800  text-lg hover:opacity-80 transition-all"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
