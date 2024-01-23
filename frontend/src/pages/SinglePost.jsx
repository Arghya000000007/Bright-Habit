import React, { useContext, useEffect, useState } from "react";
import edit from "./../img/edit.png";
import del from "./../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { Authcontext } from "./../context/Authcontext";

function SinglePost() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const postId = useLocation().pathname.split("/")[2];

  const { currUser } = useContext(Authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`); //-> // 'api/v1/posts/:id'
        setPost(res.data);
      } catch (error) {
        setError(error.response.data);
      }
    };
    fetchData();
  }, [postId]);
 
  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    }catch(err) {
      console.log(err);
    }
  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,'text/html');
    return doc.textContent;
  }
  return (
    <div className="single">
      {post.map((post) => {
        return (
          <div className="content">
            <img src={`../upload/${post.image}`} alt="" />
            <div className="user">
              {post.userImg && <img src="" alt="" />}
              <div className="info">
                <span>{post.name}</span>
                <p>Posted {moment(post.data).fromNow()}</p>
              </div>
              {post.name === currUser.name && (
                <div className="edit">
                  <Link to={`/write?edit=2`} state = {post}>
                    <img src={edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={del} alt="" />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            {getText(post.desc)}
          </div>
        );
      })}
      <Menu cat={post.cat}/>
    </div>
  );
}

export default SinglePost;
