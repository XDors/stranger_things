import React, {useState} from 'react';
import api from '.././api';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './style.css';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const onFormSubmitHandler = (event) => {
        event.preventDefault();
        async function fetchLogin() {

            const response = await fetch(`${api}users/login`, {
                method:'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    },
                }),
            });
            const data = await response.json();
            if(data.success) {
                props.setUser(data.data); 
                navigate('/');   
            }   else {
                alert('Incorrect Username/Password')
            }
            
        }
        
        fetchLogin();
    };

    const usernameValue = (event) => {
        setUsername(event.target.value);
    };

    const passwordValue = (event) => {
        setPassword(event.target.value);
    };
    
    return(
        <Form className='loginForm'>
           <h1 class='display-3 text-center'>Login</h1>
            <Form.Group className='mb-3' controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='username'
                    placeholder='username here'
                    value={username}
                    onChange={usernameValue}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='password here'
                value={password}
                onChange={passwordValue}
            />
            </Form.Group>
            <Button variant='outline-secondary' onClick={onFormSubmitHandler}>Login</Button> 
       </Form>
    );
}

export default Login;
