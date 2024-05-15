import './App.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Homepage from './components/Pages/Homepage';
import Navbar from './components/Navbar/Navbar';
import UserRoleForm from './components/Pages/UserRoleForm';
import {  Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';

export const AppContext = createContext(null);


function App() {

    // Handles login and signup
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"))
    const navigate = useNavigate()
    const URL = process.env.REACT_APP_URL
  
    const handleLogin = async (user) => {
      const response = await fetch(URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (response.status !== 200) {
        return data;
      }
      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true);
  
      navigate(`/`);
    };
  
    const handleSignUp = async (user) => {
      const response = await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
      navigate("/login");
    };
  
    const handleLogout = () => {
      console.log(" in logout handle log");
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/");
    };
  
    const [user, setUser] = useState(null);
  
    const fetchUser = async (id) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await fetch(URL + `user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser(data.data);
      } else {
        console.log("no token");
      }
    };
  
    useEffect(() => {
      let token = localStorage.getItem("authToken");
  
      if (!token) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }, []);






  return (

    <AppContext.Provider value={{ }}>
      <div className='bg-gray-100 w-full h-screen'>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes >
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
          <Route path="/user-role-form" element={<UserRoleForm />} />
        </Routes>
    </div>
  </AppContext.Provider>

  );
}

export default App;
