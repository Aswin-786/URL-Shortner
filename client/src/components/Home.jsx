import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selector/userDetails";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let userName = useRecoilValue(userEmailState);
  const navigate = useNavigate();

  const isValidUrl = (inputUrl) => {
    // Regular expression to validate URL format
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/i);
    return urlPattern.test(inputUrl);
  };

  const handleGenerate = async () => {
    setErrorMessage(""); // Reset error message
    if (!userName) {
      return navigate("/login");
    }
    if (!isValidUrl(url)) {
      setErrorMessage("Enter a valid URL");
      return;
    }
    console.log(userName);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/url", {
        originalURL: url,
      });
      setResult(` ${response.data.shortURL}`);
    } catch (error) {
      console.error("Error:", error);
      setResult("");
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8 py-9">
        URL Shortner
      </h1>

      <div className="  flex flex-col items-center   gap-5">
        <div className=" p-8 rounded shadow-md w-[60%] bg-slate-100">
          <h1 className="text-xl font-bold mb-4">URL Shortener</h1>
          <div className="flex">
            <input
              type="text"
              className="w-full border-none outline-none rounded rounded-r-none px-4 py-2 mb-4 h-12"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="rounded rounded-l-none h-12 bg-black text-white hover:bg-stone-600 hover:text-white transition-all p-3"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>

          {loading ? (
            <p className="mt-4">Loading...</p>
          ) : errorMessage ? (
            <p className="mt-4 text-red-500">{errorMessage}</p>
          ) : (
            <div className="flex gap-4 items-center justify-center">
              Generated URL:
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block  text-blue-500 hover:underline"
              >
                {result}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
