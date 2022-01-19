import React, {useState, useEffect} from "react";
import api from "../api";
import { ListGroup } from 'react-bootstrap';
import './style.css';

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ4ZGYzNDc5MTExMDAwMTdjYmQ5YzYiLCJ1c2VybmFtZSI6ImFwcGxlMTIzIiwiaWF0IjoxNjQxOTE5MzQyfQ.ovUDFIeFe9yWnGqpCXGOy4f-2EavbrDWICFp7tzvjrM
const UserProfile = ({user}) => {
    const [retrivedUser, setRetrivedUser] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`${api}users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const result = await response.json();
            if(result.success) {
                setRetrivedUser(result.data);
            } else {
                console.log(result.error);
            }
        }
        if (user) {
            fetchUserData();
        }
    }, [user]);
    
    let content;
    if (retrivedUser) {
        content = (
            <ListGroup className='profile'>
                <h1 class='display-3 text-center'>{retrivedUser.username}</h1>
                <h2>Received Messages</h2>
                <ListGroup.Item className='list-group'>
                    {retrivedUser.messages
                        .filter((message) => message.fromUser._id !== retrivedUser._id)
                        .map((message) => {
                            return <ListGroup.Item key={message._id}>
                                Message: {message.content}</ListGroup.Item>;
                        })
                    }
                </ListGroup.Item>
                <h2>Sent Messages</h2>
                <ListGroup.Item className='list-group'>
                    {retrivedUser.messages
                        .filter((message) => message.fromUser._id === retrivedUser._id)
                        .map((message) => {
                            return <ListGroup.Item key={message._id}>
                                User: {retrivedUser.username}
                                Message: {message.content}</ListGroup.Item>;
                        })
                    }
                </ListGroup.Item>
              
            </ListGroup>
        );
    }   else {
        content = <h3>Processing</h3>;
    }   return <div>{content}</div>;
}

export default UserProfile;