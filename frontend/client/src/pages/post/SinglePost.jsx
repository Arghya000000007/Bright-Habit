import { React, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.scss";
import "./singlepost.css";
import { Authcontext } from "../../context/AuthContext";
import axios from "axios";

const SinglePost = () => {
  const { user } = useContext(Authcontext);
  const [postData, setPostData] = useState(null);

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${path}`);
        setPostData(res.data.post);
      } catch (error) {}
    };
    fetchData();
  }, [path]);

  const getText = (data) => {
    const doc = new DOMParser().parseFromString(data,"text/html");
    return doc.body.textContent;
  }
  
  return (
    <div className="single">
      <div className="content mx-2">
        <img
          className="items-center justify-center mt-2"
          src="https://wallpapercave.com/wp/bvJq0ra.jpg"
          alt=""
        />
        <div className="user mt-6 ">
          <Link to={"/user"}>
            <img
              src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
              alt=""
              className="user min-h-full w-[100%]"
            />
          </Link>
          <span>{postData?.userId.name}</span>
          {postData?.userId?._id === user?._id ? (
            <span>Edit</span>
          ) : (
            <span>Like</span>
          )}
        </div>
        <h1 className=" items-center justify-center text-center font-bold ">
          {postData?.title}
        </h1>
        <div className="text-xl items-center justify-center">
          <p>{getText(postData?.description)}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
