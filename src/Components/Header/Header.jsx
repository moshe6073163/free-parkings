import React from 'react'
import { useContext } from 'react';
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser,setCurrentUser} = useContext(MyContext);

  function Disconnect(){
    setCurrentUser(undefined);
    localStorage.clear();
  } 
  return (
    <>
    <ul className='d-flex justify-content-around fs-2 sticky-top list-unstyled bg_header'>
      <li><Link to={"/"}><img className='rounded-circle' src='https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg' width="100px" height="70px"/></Link></li>
      <li></li>
      <li></li>
      <li></li>
      <p>{currentUser}</p>
      
     
      

    <div class="btn-group rounded" role="group">
      <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
        Menu
      </button>
      <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
        <li className=''><Link className="dropdown-item link-primary" to={'/MyAccount'}>My Account</Link></li>
        <li>
        {currentUser != undefined ? 
       <li><button style={{marginLeft:'8px'}} className='btn btn-danger' onClick={Disconnect}>Disconnect <FaUserCheck/></button></li>
      : 
       <li><Link style={{marginLeft:'8px'}} className='btn btn-primary' to={"/LogIn"}>LogIn <FaUserAltSlash/></Link></li>}</li>
       <li><Link className='link-primary mx-5' to={"/About"}>About</Link></li>
      </ul>
    </div>

  </ul>
    </>
  )
}
