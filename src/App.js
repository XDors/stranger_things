import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import PostForm from './components/PostForm';
import api from './api';
import AddMessage from './components/MessageForm';
import { useNavigate } from 'react-router-dom';
import PostPage from './components/PostPage';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';


const App = () => {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const retrivedUser = localStorage.getItem('user');
        if (retrivedUser){
            const userObj = JSON.parse(retrivedUser);
            setUser(userObj);
        }
    }, []);

    useEffect(() => {
        async function fetchPosts(){
            const response = await fetch(`${api}Posts`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user ? user.token : ''}`,
                },
            });
            const data = await response.json();
            setPosts(data.data.posts);
        }
        fetchPosts();
    }, [user])

    function setLocalStorageUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }
    console.log()
    function logUserOut() {
        console.log('you have logged out');
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
   
  return(
    <div>
        <Navigation logUserOut={logUserOut} user={user}/>
        <Routes>
            <Route 
                path='/' element={<PostForm posts={posts} setPosts={setPosts} user={user} />} 
            />
            <Route
                path='/login'
                element={<Login setUser={setLocalStorageUser} />}
            />
            <Route
                path='/signup'
                element={<Signup />}
            />
            <Route
                path='/post'
                element={<PostPage user={user} posts={posts} setPosts={setPosts} />}
            />
            <Route
                path='/post/:id/createmessage'
                element={<AddMessage posts={posts} user={user} />}
            />
            <Route
                path='/profile'
                element={<UserProfile user={user} />}
            />
        </Routes>
    </div>
  )
}

export default App; 