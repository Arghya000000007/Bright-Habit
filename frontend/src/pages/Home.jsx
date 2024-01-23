import axios from 'axios';
import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [posts,setPosts] = useState([]);
  const [error,setError] = useState(null);
  const cat = useLocation().search;
  
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      }catch(err) {
        setError(err.response.data);
      }
    }
    fetchData();
  },[cat]);
  
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,'text/html');
    return doc.textContent;
  }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.image}`} alt="postimage" />
              </div>
              <div className="content">
                <Link className="link" to={`posts/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button>read more...</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
