import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data.data.post);
        return;
      } catch (error) {
        setError(error.response);
        return;
      }
    }
    fetchData();
  },[]);

  const getText = (data) => {
    const doc = new DOMParser().parseFromString(data,"text/html");
    return doc.body.textContent;
  }
  return (
    <div className="home mt-5 mx-auto">
      {error && <h1>Something went wrong!</h1>}

      {posts.map((post) => {
        return (
            <div className="slider flex flex-col-reverse md:flex-row bg-slate-100 mb-2 ">
              <div className="left flex flex-col justify-center items-center md:items-baseline">
                <p className="w-3/4 mx-5 text-center md:text-left">
                  {getText(post.description)}
                </p>
                <Link to={`/post/${post._id}`}>
                  <button className="text-white bg-black px-4 py-2 my-6 font-bold rounded-sm">
                    Read more...
                  </button>
                </Link>
              </div>
              <div className="right">
                <img
                  className="w-[64rem] "
                  src="assets/car.jpg"
                  alt=""
                />
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default Home;
