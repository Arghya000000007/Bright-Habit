import React, { useContext, useState,useRef } from "react";
import { Authcontext } from "../../context/AuthContext";
import "./write.css";
import axios from "axios";
import "quill/dist/quill.snow.css";
import JoditEditor from 'jodit-react';

const Write = () => {
  const { user } = useContext(Authcontext);
  const editor = useRef(null);
  
  const [postData, setPostData] = useState({
    title: '',
    category: '',
    description: ''
  });
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      try {
//        await axios.post("/post-image", e.target.file[0]);
      } catch (error) {}
    }
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleContentChange = (data) => {
    setPostData((prev) => ({ ...prev, 'description': data}));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      setError("Please login, to write your blog post!");
      return;
    }
    try {
      await axios.post("/posts", postData);
      setPostData({
        title: '',
        category: '',
        description: ''
      });
      setSuccess("Post created successfully!");
    } catch (error) {
    setPostData({
      title: '',
      category: '',
      description: ''
    });
      setError(error.message);
    }
  };
  return (
    <div className="mt-16">
      <div>
        {success ? <span>{success}</span> : <span>{error}</span>}
        <div>
          <input
            type="text"
            className="mt-4 border-2 rounded ml-[410px] mb-[10px] w-[700px] p-4"
            name="title"
            id="title"
            placeholder="Title...."
            onChange={handleChange}
            required
          />
          <input
            type="text"
            style={{
              width: 700,
              marginBottom: 10,
              padding: 10,
            }}
            className="mt-4 border-2 rounded ml-[410px] mb-[10px] w-[700px] p-4"
            name="category"
            id="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            type="file"
            className="mt-4 rounded ml-[400px] mb-[10px] w-[700px] p-4"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </div>
        <div className="w-96 desc">
          <div className="relative w-full">
            <JoditEditor 
              ref={editor}
              value={postData.description}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <div className="mt-[100px] ml-[720px]">
          <form id="submit-post">
            <button
              className="bg-purple-800 px-12 py-4 rounded-3xl text-white hover:text-purple-800 hover:bg-white hover:border-2 hover:border-purple-900 mx-2 text-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Write;
