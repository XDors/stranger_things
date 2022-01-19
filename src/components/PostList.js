import React from "react";
import PostView from "./PostView";

const PostList = ({posts, setPosts, user}) => {
    
    
    
    return(
        <div>
            <ul>
                {posts.map((post) => {
                    return <PostView data={post} key={post._id} user={user} posts={posts} setPosts={setPosts} />;
                })}
            </ul>
        </div>
    );
       
}

export default PostList;
