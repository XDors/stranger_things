import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import api from '../api';
import { Form, Button } from 'react-bootstrap';
import './style.css';

const PostPage = ({user, posts, setPosts}) => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [locationValue, setLocationValue] = useState('');

    const navigate = useNavigate();

    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(`${api}posts`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    post: {
                        title: titleValue,
                        description: descriptionValue,
                        price: priceValue,
                        location: locationValue,
                    },
                }),
            }),
            result = await response.json();
            console.log(result);
            if (result.success) {
                setPosts([...posts, result.data.post]);
                navigate('/');
            } else {
                throw new Error(result.error.message);
            }
        }   catch (error) {
            alert(error.message);
        } 
    };

    return (
        <Form className='postPage'>
            <h2 class='display-3 text-center'>Create Post</h2>
            <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    name='title'
                    value={titleValue}
                    placeholder='title here'
                    onChange={(event) => {
                        setTitleValue(event.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                   type='text'
                   name='description'
                   value={descriptionValue}
                   placeholder='description here'
                   onChange={(event) => {
                       setDescriptionValue(event.target.value);
                   }}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPrice'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    min='0'
                    step='.01'
                    type='number'
                    name='price'
                    value={priceValue}
                    placeholder='price here'
                    onChange={(event) => {
                        setPriceValue(event.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formLocation'>
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type='text'
                    name='location'
                    value={locationValue}
                    placeholder='location here'
                    onChange={(event) =>{
                        setLocationValue(event.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='outline-secondary' onClick={onSubmitFormHandler}>Create Post</Button> 
        </Form>
        
    );
}

export default PostPage;