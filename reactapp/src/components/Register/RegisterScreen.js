import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, setUser } from 'react';
import { Link, Navigate,Route, Routes } from 'react-router-dom';

import "./Register.css";

function AnimatedForms() {
  const [activeForm, setActiveForm] = useState("login");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber]= useState('')
  const [hospitalName, sethospitalname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginUsername, setLoginusername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);



  
  
  window.onload = function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container-r');
      
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active-r");
    });
      
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active-r");
    });
  };

  
  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    const phoneNumberRegex = /^01\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error('Please enter a valid 11-digit phone number starting with 01.');
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[@$!%*?&]/.test(password) || !/\d/.test(password)) {
      toast.error('Password must be at least 8 characters long and include one uppercase letter, one special character, and one number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      // Address: address, 
      email: email,
      PhoneNumber: phoneNumber,
      hospital_name: hospitalName,
      password: password
    };
    if (navigator.connection && navigator.connection.type !== 'none'){
      try {
        const response = await axios.post('http://localhost:8000/Authentication/register/', userData);
        console.log(response.data);
        toast.success('Registration Successful! Login now!');
      } catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          if (error.response.data.username) {
            toast.error('A User with that Username Already Exists');
          }
          if (error.response.data.email) {
            toast.error('A User With That Email Already Exists');
          }
        }
        toast.error(error.response.data.message);
      }
    } else {
      toast.error('Please check your internet connection');
    }
    };
    
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const userDataLogin={
      username: loginUsername,
      password: loginPassword
    }
    try {
      const responseLogin = await axios.post('http://localhost:8000/Authentication/login/', userDataLogin);
      console.log(responseLogin.data);
      // console.log(responseLogin.data.profile);
      console.log(responseLogin.data.token);
      // const users = responseLogin.data.user
      // localStorage.setItem('user', JSON.stringify(responseLogin.data.profile))

      // let user_id = jwt_decode(responseLogin.data.access).user_id;
         
      
      // console.log(responseLogin.PhoneNumber);
      localStorage.setItem('token', responseLogin.data.token);
      // console.log(userDetails.first_name);  
      toast.success('login successful!');
      if (responseLogin.status === 200) {
        setLoggedIn(true);
        let userDetails = JSON.parse(localStorage.getItem('user'));
         console.log('Successfully logged in')
      }
    } catch (error) {
      if(error.response.status === 404){
        toast.error("Invalid credentials.")
      }
      else{
       console.error(error); 
       toast.error(error.response.data.detail); 
    }

    }   
  };
  const handleSwitchForm = (form) => {
    setActiveForm(form);
  };


  useEffect(() => {
    const switchers = [...document.querySelectorAll(".switcher")];

    switchers.forEach((item) => {
      item.addEventListener("click", function () {
        switchers.forEach((item) =>
          item.parentElement.classList.remove("is-active")
        );
        this.parentElement.classList.add("is-active");
      });
    });
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // handle form submit logic here
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Bone Age</h1>
      <div className="forms">
        <div
          className={`form-wrapper ${activeForm === "login" && "is-active"}`}
        >
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => handleSwitchForm("login")}
          >
            Login
            <span className="underline"></span>
          </button>
          <form
            className="form form-login"
            onSubmit={handleFormSubmit}
          >
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">Username</label>
                <input id="login-email" type="text" required value={loginUsername}  onChange={(e) => setLoginusername(e.target.value)}  />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}  />
                
              </div>
            </fieldset>
            <button type="submit" className="btn-login"onClick={handleSubmitLogin}>Sign In</button>
      {loggedIn && <Navigate to="/home" />}
           
        <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>
          </form>
        </div>
        <div
          className={`form-wrapper ${activeForm === "signup" && "is-active"}`}
        >
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => handleSwitchForm("signup")}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form
            className="form form-signup"
            onSubmit={handleFormSubmit}
          >
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation
                for sign up.
              </legend>
              <div className="input-block">
                <label htmlFor="signup-email">Username</label>
                <input id="signup-email" type="text" required  value={userName}  onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">First Name</label>
                <input id="signup-email" type="text" required  value={firstName}   onChange={(e) =>setFirstName(e.target.value)}  />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">Last Name</label>
                <input id="signup-email" type="text" required  value={lastName}     onChange={(e) => setLastName(e.target.value)}  />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" required value={email}    onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" required  value={password}   onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">
                  Confirm password
                </label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  required
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                />

              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Phone Number</label>
                <input id="signup-password" type="number" required  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Hospital Name</label>
                <input id="signup-password" type="text" required value={hospitalName} onChange={(e) => sethospitalname(e.target.value)} />
              </div>
             
              
            </fieldset>
            <button type="submit"  onClick={handleSubmitRegister} className="btn-signup">
           SignUp
            </button>
            
          </form>
        </div>
      </div>
    </section>
  );
}

export default AnimatedForms;