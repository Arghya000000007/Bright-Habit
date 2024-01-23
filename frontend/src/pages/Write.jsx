import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import moment from "moment";

function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [title, setTitle] = useState(state?.title || "");
  const navigate = useNavigate();

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post("/posts", {
            title,
            desc: value,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("yyyy-MM-dd HH:mm:ss"),
          });
          navigate("/");
    } catch (error) {}
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          name=""
          id=""
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upoad File
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleChange}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "tech"}
              name="cat"
              value="tech"
              id="tech"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
