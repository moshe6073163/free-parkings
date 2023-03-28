import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import { FcGoogle } from "react-icons/fc";

import {app} from '../Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";


export default function LogIn() {

  const { setUser, setProfileUrl } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const userName = useRef();
  const password = useRef();
  const auth = getAuth();


  // conncting with user and password
  const submithandler = (a) => {
    a.preventDefault();
    setUser(userName.current.value, password.current.value);
      userName.current.value = "";
      password.current.value = "";
    }

 
  // conncting auto with google 
  const handleSignWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth(app); 
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const userr = result.user;
          setProfileUrl(userr.photoURL);
          setUser(userr.email);
        })
        .catch((error) => {
          console.log(error);
        });
  }


  // function forgot password
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    await confirmPasswordReset(auth, )
  }

  // function to hide forgot password
  function hideReset(){
    let a = document.getElementById('Reset');
    if(a.style.display == "none"){
      a.style.display = "block";
    }
    else{
      a.style.display = "none";
    }
  }
  

  return ( 
    <div className=''>
    <form className='form-signin bg_login rounded mb-4' onSubmit={submithandler}>
      <div className='text-center mb-4'>
        <img className='mb-4' src={"https://i.ibb.co/mcCN2jp/logo-free-parking.png"} alt="icon" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal text-light">Enter User</h1>
        <Link className='link-light' to={'/NewUser'}>New User? Click here</Link>
      </div>
      <div class="form-label-group">
        <input ref={userName} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autoFocus />
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input ref={password} type="password" id="inputPassword" class="form-control" placeholder="Password" required />
        <label for="inputPassword">Password</label>
      </div>


      <div class="checkbox mb-3">
        <label className='text-light'>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <div className='d-flex flex-column align-items-center'>
        <button class="btn btn-lg btn-primary w-25" type="submit" >Login</button>
        <div className='w-100 d-flex justify-content-center'>
          <hr className='w-50 mx-1'/>
          or
          <hr className='w-50 mx-1'/>
        </div>
        <button class="btn btn-light mx-3 rounded-circle" onClick={handleSignWithGoogle} ><FcGoogle size={35}/></button>
      </div>
      <div className='btn text-primary d-flex justify-content-center' onClick={hideReset}>Forgot Password</div>
      <div id='Reset' style={{display: "none"}}>
        <div class="input-group d-flex justify-content-center w-sm-75 rounded">
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <div class="input-group-append">
            <button class="btn btn-warning btn-outline-secondary" type="button" onClick={triggerResetEmail}>Reset Password</button>
          </div>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}