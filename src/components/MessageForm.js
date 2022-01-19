import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddMessage = ({user, posts}) => {
    const [post, setPost] = useState(null);
    const [messageValue, setMessageValue] = useState('');
    const postId = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const searchedPost = posts.find((post) => post._id === postId);
        setPost(searchedPost);
    }, [posts, user]);

    const onSubmitSendMessageHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(`${api}/posts/${post._id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,  
            },
            body: JSON.stringify({
                message: {
                    content: messageValue,
                },
            }),
        });
        const result = await response.json();
        if (result.success) {
            navigate('/');
        }   else{
            alert('Message did not send')
        }
    };

    return (
        <div>
            <h1>Send Message</h1>
            {post ? (
                <div>
                    <h3>Title: {post.title}</h3>
                    <p>User: {post.author.username}</p>
                </div>
            ): null}
            <form onSubmit={onSubmitSendMessageHandler}>
                <textarea
                    name='message'
                    id='message'
                    cols='40'
                    rows='10'
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}>
                </textarea>
                <button type='submit'>Send Message</button>
            </form>
        </div>
    );
}

export default AddMessage;