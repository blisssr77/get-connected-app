import './App.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Homepage from './components/Pages/Homepage';
import Navbar from './components/Navbar/Navbar';
import UserRoleForm from './components/Pages/UserRoleForm';
import Students from './components/Pages/Students';
import Freelancers from './components/Pages/Freelancers';
import {  Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';

export const AppContext = createContext(null);


function App() {

    // Below code handles login and signup state--------------------------------------------------------------------
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
      console.log("User logged in");
      console.log(data);
  
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

    // Below is the code handles student state--------------------------------------------------------------------------
    const [students, setStudents] = useState(null);
    const getStudent = async () => {
      try {
        if (!isLoggedIn) {
          console.log("User is not logged in. Cannot fetch students.");
          return;
        }
        const response = await fetch(`${URL}students`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStudents(data.data);
          console.log("Students fetched successfully.");
        } else {
          console.log("Failed to fetch students.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const createStudent = async (student) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot create student.");
          return;
      }
      await fetch(`${URL}students`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
          body: JSON.stringify(student),
      }).then((response) => {
          if (response.ok) {
              console.log("Student created successfully.");
              getStudent()
              navigate(`/students`)
              
          } else {
              console.log("Failed to create student.");
          }
      });
  }

  // Below is the code handles freelancer state--------------------------------------------------------------------------




  return (

    <AppContext.Provider value={{ students, isLoggedIn, handleLogin, handleSignUp, handleLogout, fetchUser }}>
      <div className='bg-gray-100 w-full h-screen'>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes >
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
          <Route path="/user-role-form" element={<UserRoleForm createStudent={(student) => createStudent(student)}/>} />
          <Route path="/students" element={<Students/>} />
          <Route path="/freelancers" element={<Freelancers/>} />
        </Routes>
    </div>
  </AppContext.Provider>

  );
}

export default App;
