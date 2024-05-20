import './App.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Homepage from './components/Pages/Homepage';
import Navbar from './components/Navbar/Navbar';
import UserRoleForm from './components/Pages/UserRoleForm';
import Students from './components/Pages/Students';
import Freelancers from './components/Pages/Freelancers';
import StudentDetail from './components/Pages/StudentDetail';
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
          console.log(data.data)
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
    
    const updateStudent = async (student, id) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot update Student.");
          return;
      }
      try {
          const response = await fetch(`${URL}students/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              },
              body: JSON.stringify(student),
          });
    
          if (response.ok) {
              console.log("Student updated successfully.");
              await getStudent(); 
          } else {
              throw new Error(`Failed to update student with status: ${response.status}`);
          }
      } catch (err) {
          console.error("Error updating student:", err.message);
      }
    };
    
    const deleteStudent = async (id) => {
        if (!isLoggedIn) {
            console.log("User is not logged in. Cannot delete student.");
            return;
        }
        await fetch(`${URL}students/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
        }).then((response) => {
            if (response.ok) {
                console.log("Student deleted successfully.");
            } else {
                console.log("Failed to delete student.");
            }
        });
        getStudent();
    }
    // Below is the code handles freelancer state--------------------------------------------------------------------------
    const [freelancers, setFreelancers] = useState(null);
    const getFreelancer = async () => {
      try {
        if (!isLoggedIn) {
          console.log("User is not logged in. Cannot fetch freelancers.");
          return;
        }
        const response = await fetch(`${URL}freelancers`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setFreelancers(data.data);
          console.log("Freelancers fetched successfully.");
          console.log(data.data)
        } else {
          console.log("Failed to fetch freelancers.");
        }
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      }
    };

    const createFreelancer = async (freelancer) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot create freelancer.");
          return;
      }
      await fetch(`${URL}freelancers`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
          body: JSON.stringify(freelancer),
      }).then((response) => {
          if (response.ok) {
              console.log("Freelancer created successfully.");
              getFreelancer()
              navigate(`/freelancers`)
              
          } else {
              console.log("Failed to create freelancer.");
          }
      });
    }
    const updateFreelancer = async (freelancer, id) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot update Freelancer.");
          return;
      }
      try {
          const response = await fetch(`${URL}freelancer/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              },
              body: JSON.stringify(freelancer),
          });
    
          if (response.ok) {
              console.log("Freelancer updated successfully.");
              await getFreelancer(); 
          } else {
              throw new Error(`Failed to update freelancer with status: ${response.status}`);
          }
      } catch (err) {
          console.error("Error updating freelancer:", err.message);
      }
    };
    
    const deleteFreelancer = async (id) => {
        if (!isLoggedIn) {
            console.log("User is not logged in. Cannot delete freelancer.");
            return;
        }
        await fetch(`${URL}freelancers/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
        }).then((response) => {
            if (response.ok) {
                console.log("Freelancer deleted successfully.");
            } else {
                console.log("Failed to delete freelancer.");
            }
        });
        getFreelancer();
    }

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        getStudent();
        getFreelancer();
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    


  return (

    <AppContext.Provider value={{ getStudent, students, freelancers, isLoggedIn, handleLogin, handleSignUp, handleLogout, fetchUser }}>
      <div className='bg-gray-100 w-full h-screen'>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes >
          <Route path="/" element={<Homepage />} />
          {/* Controls Login / Signup */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />

          {/* Controls User-Role-Form page */}
          <Route path="/user-role-form" element={<UserRoleForm createStudent={(student) => createStudent(student)} createFreelancer={(freelancer) => createFreelancer(freelancer)}/>} />
          
          {/* Controls Student */}
          <Route path="/students" element={<Students />} />

          {/* Controls Freelancer */}
          <Route path="/freelancers" element={<Freelancers />} />
        </Routes>
    </div>
  </AppContext.Provider>

  );
}

export default App;
