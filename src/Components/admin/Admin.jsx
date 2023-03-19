import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

export default function Admin() {

  const { id } = useParams();


  const { posts, users, postDelete, userDelete, updateUser, setUsers } = useContext(MyContext);

  const [currPosts, setCurrPosts] = useState([]);
  const [otherCurrUser, setOtherCurrUser] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    setOtherCurrUser(users.find((e)=> e.userId == id));
    setCurrPosts(posts.filter((e)=> e.userId == id));
  },[])

  function deletePost (id, nameFile){
    postDelete(id, nameFile);
    navigate(`/Users`);
  }

  function deleteUser(id){
    userDelete(id);
    navigate(`/Users`);
  }

  function setAsAdmin(id){
    let u = users.find((e)=> e.id == id);
    if(u.admin === 'false'){
      otherCurrUser.admin = "true";
      u.admin = "true";
    } else {
      otherCurrUser.admin = "false";
      u.admin = "false";
    }
    updateUser(u);
  }
  
  return (
    <> { !otherCurrUser ? "" :
    //  <Container className="mt-4 mb-5 vh-100 ">
    //   <Row>
    //     <Col md={12} className='mb-3 d-flex justify-content-center'>
    //       <Card className="shadow w-25">
    //         <Card.Header className="bg-primary text-light">Profile</Card.Header>
    //         <Card.Body>
    //           <div className="d-flex flex-column align-items-center">
    //             <img style={{ width: "60px", height: "60px" }} src={otherCurrUser.profileUrl ? otherCurrUser.profileUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="rounded-circle mb-3" />
    //             <h5 className="mb-0">{otherCurrUser.yourName}</h5>
    //             <small className="text-muted">{otherCurrUser.userName}</small>
    //           </div>
    //           <hr />
              
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md={7} className='col-sm-6 col-12 '>
    //       <Card className="shadow" style={{height:'354px'}}>
    //         <Card.Header className="bg-secondary shadow text-light">Last Posts</Card.Header>
    //         <Card.Body>
    //         {currPosts[0] == undefined ? "" :
    //         currPosts.map((item, i) => (
    //           <div className='bg-dark'>
    //               <img className='w-75' style={{ height:"250px"}}  src={item.imgUrl}/>
    //               <Link to={item.id} className='text-primary' key={i} >
    //               {/* <img className='w-75' style={{ height:"250px"}}  src={item.imgUrl}/> */}
    //               <div className=''>
    //                   <div className='mt-sm-2'></div>
    //                   <div>
    //                       <span className='mt-sm-2 mt-4'>{item.city + ", " + item.street}</span>
    //                       <span className=''>{} </span>
    //                   </div>
    //                   <div className=''>{}</div>
    //               </div>
    //               </Link>
    //           </div> 
    //           ))
    //         }
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
          
     <div className='container mb-4 h-auto '>
        <div className='row d-flex justify-content-center mb-4'>
          <div className='col-sm-3 col-6 bg-light rounded p-0 shadow'>
            <div className='bg-primary d-flex justify-content-center rounded-top mb-2'>profile</div>
              <div className="d-flex flex-column align-items-center w-100" >
                <img style={{ width: "60px", height: "60px" }} src={otherCurrUser.profileUrl ? otherCurrUser.profileUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="rounded-circle mb-3" />
                <h5 className="mb-0">{otherCurrUser.yourName}</h5>
                <small className="text-muted">{otherCurrUser.userName}</small>
                <hr className='w-75'/>
                {otherCurrUser.userName === 'neria.levi444@gmail.com' || otherCurrUser.userName === 'moshe6073163@gmail.com' ? 'Owner' : <div className='d-flex flex-column align-items-center'>
                <div className='btn btn-danger mb-2' onClick={()=> deleteUser(otherCurrUser.id)}>Delete User</div>
                <div className='btn btn-warning mb-2' onClick={()=> setAsAdmin(otherCurrUser.id)}>{otherCurrUser.admin === 'true' ? 'Unset' : 'Set'} As Admin</div>
                </div>} 
                </div>
          </div>
        </div>
        {currPosts[0] == undefined ? "" :
          <div className='row d-flex justify-content-center'>
            <div className='col-sm-6 col-8 bg-light rounded p-0 shadow '>
              <div className='bg-primary d-flex justify-content-center rounded-top mb-2'>Posts</div>
                <div className="d-flex flex-column align-items-center mb-4 mt-4 mb-2" >
                  <div className='d-flex flex-column align-items-center'>
                  {currPosts.map((item, i) => (
                    <div className='d-flex flex-wrap justify-content-center h-100 w-100 rounded mt-2'>
                        <img className='img-fluid rounded shadow' style={{height: '250px', width:'70%'}} src={item.imgUrl[0]}/>
                        <div className='text-primary mx-1 d-flex flex-column align-items-center ' key={i} >
                          <div className='mt-2 '>City: {item.city + "," }</div>
                          <div className='mt-2 '>Street: {item.street + "."} </div>
                          <hr className='w-75 '/>
                          {otherCurrUser.userName === 'neria.levi444@gmail.com' || otherCurrUser.userName === 'moshe6073163@gmail.com' ? '' : 
                          <div className='btn btn-danger mb-2' onClick={(e)=> deletePost(item.id, item.nameFile)}>Delete Post</div>
                          }
                        </div>
                    </div> 
                    ))}</div>
                </div>
            </div>
          </div>
        }
      </div>
}
    </>
  )
}



























// import React from 'react'
// import MyParking from '../myParking/MyParking'

// export default function Admin() {
//   return (
//     <div>
//       <MyParking/>
//     </div>
//   )
// }
