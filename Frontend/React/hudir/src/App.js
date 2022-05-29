import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AuthService from './services/auth.service';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Post from './components/Post';
import Upload from './components/Upload';
import NoRoute from './components/NoRoute';

const parseJwt = (token) => {
  try {
      return JSON.parse(atob(token.split(".")[1]));
  } catch(e) {
      return null;
  }
}

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if(user) {
      const decodedJwt = parseJwt(user.accessToken);
        if(decodedJwt.exp * 1000 < Date.now()) {
          logOut();
          console.log("Token expired!");
        } else {
          console.log("Token valid!");
        }
    }
  }, [location]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <>
      <Navbar currentUser={currentUser} logOut={logOut} ></Navbar>
      <Routes>
        <Route index element={<Home currentUser={currentUser} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/:name' element={<User currentUser={currentUser} />} />
        <Route path='/post/:postId' element={<Post currentUser={currentUser} />} />
        <Route path='/upload' element={<Upload currentUser={currentUser} />} />
        <Route path='/logout' element={ <Navigate to="/" /> } />
        <Route path='*' element={<NoRoute />} />
      </Routes>
    </>    
  );
}

export default App;
