import React, {useState} from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function onSubmit(event){
        event.preventDefault();
        async function fetchSignup () {
            const response = await fetch(`${api}users/register`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:{
                        username: username,
                        password: password
                    },
                }),
            }); 
            const data = await response.json();
            if(data.success) {
                navigate('/login');   
            }   else {
                alert('Profile not created, please try again.')
            }
            /* .then(response => response.json())
            .then(result => {
                console.log(result);
            }) 
            .catch(console.error); */
        }
        fetchSignup();
    };    
        
        
    return(
        <Form className='signup'>
           <h1 class='display-3 text-center'>Sign-in</h1>
            <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type='username'
                placeholder='username here'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='password here'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </Form.Group>
            <Button variant='outline-secondary' onClick={onSubmit}>Sign-up</Button>
        </Form>
        
    );
    
}

export default Signup