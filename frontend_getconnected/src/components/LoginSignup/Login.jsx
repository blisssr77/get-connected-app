import { useState } from "react"
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'

const Login = (props) => {
    const [form, setForm] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()
    let submission = await props.handleLogin(form)
    if(submission) {
        setErrorMsg(submission.error)
    }
}
    
const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
}
return (
    <div className="container">
    <div className="header">
      <div className="text">Log In</div>
      <div className="underline"></div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="inputs">
        <div className="input">
            <img src={user_icon} alt="" />
            <label htmlFor="username"/>
            <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        </div>
        <div className="input">
            <img src={password_icon} alt="" className="" />
            <label htmlFor="password"/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        </div>
    </div>
        <div className="submit-container">
            <button type="submit" className="submit" value="Login">Sign In</button>
        </div>
        {errorMsg ? <div className="errorMsg">{errorMsg}</div> : ""}
    </form>
        
    </div>
  )
}

export default Login