import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthService from './services/auth.service';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} logOut={logOut}></Navbar>
      <Routes>
        <Route currentUser={currentUser} path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route currentUser={currentUser} path='/user/:name' element={<User />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
