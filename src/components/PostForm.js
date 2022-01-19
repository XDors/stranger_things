import React, {useState, useEffect} from "react";
import api from "../api";
import PostList from "./PostList";
import './style.css';

const PostForm = ({user}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`${api}posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchPosts();
    }, []);
    return (
        <div className='postListContainer'>
            {user && <h2 class='display-3 text-center'>Welcome!</h2>} 
            <h1 class='display-3 text-center'>For Sale Posts</h1>
            <PostList posts={posts} user={user} />
        </div>
    );
}

export default PostForm;
