import React, { useContext, useRef } from 'react';
import { MyContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {app} from '../Firebase';
import { FcGoogle } from "react-icons/fc";
import Allert from '../Components/Allert';


export default function NewUser() {
  const {setNewUser, currentUser, setProfileUrl, setIsShowAlert} = useContext(MyContext);
  const userName = useRef();
  const pass1 = useRef();
  const pass2 = useRef();
  const phone = useRef();
  const yourName = useRef();
  const address = useRef();


  const submitHandler = (e) => {
    e.preventDefault();
    const { v4: userId } = require('uuid');
    const user = {
      userName: userName.current.value, 
      phone: phone.current.value,
      yourName: yourName.current.value,
      password: pass1.current.value,
      address: address.current.value,
      userId: userId(),
      admin: userName.current.value === 'moshe6073163@gmail.com' || userName.current.value === 'neria.levi444@gmail.com' ? true : false ,
      profileUrl: '',
      favoritePosts: [],
    }
    if(pass1.current.value!=pass2.current.value){
      setIsShowAlert({set: true, component: <Allert set={true} detail = {"the password not correct"}/> })
    } else {
      setNewUser(user);
      userName.current.value = "";
      pass1.current.value = "";
      phone.current.value = "";
      yourName.current.value = "";
      pass2.current.value = "";
      address.current.value = "";
    }
}

const signUpWithGoogle = () =>{
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const auth = getAuth(app); 
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        
        const user = result.user;

        const { v4: userId } = require('uuid');
        const user1 = {
          userName: user.email, 
          phone: 0,
          yourName: user.displayName,
          password: "1234",
          address: "",
          userId: userId(),
          admin: user.email === 'moshe6073163@gmail.com' || user.email === 'neria.levi444@gmail.com' ? true : false ,
          profileUrl: user.photoURL,
          favoritePosts: [],
        }
        setProfileUrl(user.photoURL);
        setIsShowAlert({set: true, component: <Allert set={true} detail = {"Your first password is: 1234,\nplease change and add all details in the private zone"}/> })            
        setNewUser(user1);
      })
      .catch((error) => {
      
      });
}

  return (
  <>
  {currentUser.yourName != undefined ? <div></div> :
  <div class="vh-auto mb-3" >
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-white" style={{borderRadius: '25px', backgroundColor:'rgba(31, 30, 29, 0.6)'}}>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form class="mx-1 mx-md-4" onSubmit={submitHandler}>

                  <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="text" id="form3Example1c" class="form-control" ref={yourName} />
                        <label class="form-label" for="form3Example1c">Your Name</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="number" id="form3Example4c" class="form-control" ref={phone}/>
                        <label class="form-label" for="form3Example4c">Your phone</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fa-solid fa-house-user me-3"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="address" id="form3Example4c" class="form-control" ref={address}/>
                        <label class="form-label" for="form3Example4c">Your Address</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="email" id="form3Example3c" class="form-control" ref={userName} />
                        <label class="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="password" id="form3Example4c" class="form-control" ref={pass1}/>
                        <label class="form-label" for="form3Example4c">Password</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input required type="password" id="form3Example4cd" class="form-control" ref={pass2}/>
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input required class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                      <label class="form-check-label" for="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg">Register</button>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button class="btn btn-light mx-3 rounded-circle" onClick={signUpWithGoogle} ><FcGoogle size={35}/></button>
                    </div>
                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid" alt="Sample image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
  </>
  );
}