import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Button, Card, CardGroup } from 'react-bootstrap';
import './style.css';

const PostView = (props) => {
    const navigate = useNavigate();

    const postDelete = async () => {
        const response = await fetch(`${api}posts/${props.data._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${props.user.token}`,
            }
        }); 
        const result = await response.json();
        if (result.success) {
            const updatedPosts = props.posts.filter((post) => {
                return post._id !== props.data._id;
            });
            props.setPosts(updatedPosts);
        }   else {
            console.log(result.error);
        }
    };
    const onClickMessageHandler = (event) => {
        navigate(`/post/${props.data._id}/createmessage`);
    };
   // issue is with isAuthor - not recognizing token! console.log(props.data.isAuthor)
   console.log(props.data.isAuthor === props.data.author)
    return(
        <CardGroup className='card'>
            <Card border='dark' style={{width:'18rem'}}>
                <Card.Header>{props.data.title}</Card.Header> 
                <Card.Body>
                    <Card.Title>{new Date(props.data.updatedAt).toLocaleDateString('en-US')}</Card.Title>
                    <Card.Text>Author: {props.data.author.username}</Card.Text>
                    <Card.Text>Description: {props.data.description}</Card.Text>
                    <Card.Text>Price: {props.data.price}</Card.Text>
                    <Card.Text>Loction: {props.data.location}</Card.Text>
                    
                    {props.user && !props.data.isAuthor ? (
                        <Button variant='outline-secondary' onClick={onClickMessageHandler}>Send Message</Button>
                        ) : null}
                    {props.data.isAuthor && <Button variant='outline-danger' onClick={postDelete}>Delete Post</Button>}
                </Card.Body>
            </Card>
        </CardGroup>
    );
    }
    
export default PostView;