import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div>
      <LoginSignup/>
    </div>
  )
  // return (
  //   <div>
  //       <Routes>
  //         <Route path="/login" element={<LoginSignup/>}></Route>
  //       </Routes>
  //   </div>
  // );
}

export default App;
