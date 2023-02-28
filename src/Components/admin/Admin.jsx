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


  const { posts, users } = useContext(MyContext);

  const [currPosts, setCurrPosts] = useState([]);
  const [otherCurrUser, setOtherCurrUser] = useState();

  useEffect(()=>{
    setOtherCurrUser(users.find((e)=> e.userId == id));
    setCurrPosts(posts.filter((e)=> e.userId == id));
  },[])
  
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
          <div className='col-sm-4 col-8 bg-light rounded p-0 shadow'>
            <div className='bg-primary d-flex justify-content-center rounded-top mb-2'>profile</div>
              <div className="d-flex flex-column align-items-center w-100" >
                <img style={{ width: "60px", height: "60px" }} src={otherCurrUser.profileUrl ? otherCurrUser.profileUrl : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="rounded-circle mb-3" />
                <h5 className="mb-0">{otherCurrUser.yourName}</h5>
                <small className="text-muted">{otherCurrUser.userName}</small>
                <hr className='w-75'/>
                <div className='btn btn-danger mb-2' >Delete User</div>
              </div>
          </div>
        </div>
        {currPosts[0] == undefined ? "" :
          <div className='row d-flex justify-content-center shadow'>
            <div className='col-sm-12 col-8 bg-light rounded p-0'>
              <div className='bg-primary d-flex justify-content-center rounded-top mb-2'>profile</div>
                <div className="d-flex flex-column align-items-center mb-4 mt-4" >
                  {currPosts.map((item, i) => (
                    <div className='border mb-3 d-flex col-8 rounded'>
                        <img className='w-sm-75 w-25 h-50 rounded' src={item.imgUrl}/>
                        <div className='text-primary mx-1' key={i} >
                          <div className='mt-2'>City: {item.city + "," }</div>
                          <div className='mt-2'>Street: {item.street + "."} </div>
                        </div>
                    </div> 
                    ))}
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
