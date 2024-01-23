import axios from "axios";
import React, { useEffect, useState } from "react";

function Menu({cat}) {
  const [post,setPost] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await axios.get(`/posts?cat=${cat}`);
        setPost(res.data);
      }catch(err) {
        console.log(err);
      }
    }
    fetchData(); 
  },[cat]);
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {post.map(post => {
        return (
            <div className="post" key={post.id}>
                <img src={`../upload/${post.image}`} alt="post_image" />
                <h2>{post.title}</h2>
                <button>Read more...</button>
            </div>
        )
      })}
    </div>
  );
}

export default Menu;
