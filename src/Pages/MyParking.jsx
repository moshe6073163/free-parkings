import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../App';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ActivityTime from '../Components/ActivityTime';


export default function MyParking() {
  const imageRef = useRef();
  const accessibility = useRef();
  const suitable = useRef();
  const price = useRef();
  const detail = useRef();
  const name = useRef();
  const phone = useRef();
  const code = useRef();
  const keyCode = useRef();

  const { id } = useParams();
  const { posts, postDelete, updatePost, setActivityTime, activityTime } = useContext(MyContext);
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [current, setCurrent] = useState()

  useEffect(()=>{
    if(current){
      setActivityTime(current.activityTime)
    }
  },[current])

  useEffect(()=>{
    if(posts[0])
    setCurrent(posts.find((post) => post.id === id));
  },[posts]) 

  function deletePost(id, nameFile) {
    postDelete(id, nameFile);
    navigate('/MyAccount');
  }

  function postUpdate(current) {
    const post = {
      userId: current.userId,
      accessibility: accessibility.current.checked,
      detail: detail.current.value,
      code: code.current ? code.current.checked : current.code,
      keyCode: keyCode != undefined ? keyCode.current.value : "",
      city: current.city,
      street: current.street,
      price: price.current.value,
      suitable: suitable.current.value,
      activityTime: activityTime,
      contactName: name.current.value,
      contactPhone: phone.current.value,
      cordLocation: current.cordLocation,
      favorite: current.favorite,
      id: current.id,
    };
    updatePost(post);
    setChange(false);
  }

  return (
    <>
      {current ?
        <div class="container mt-5"> {}
          <div class="row">
            <h1>{current.city + ', ' + current.street}</h1>
            <div class="col-md-5">
              <Carousel className="border rounded" autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
                {current.imgUrl.map((img) => (
                  <img src={img} alt="picture parking" class="img-fluid rounded-3" style={{ width: "640px", height: "350px", objectFit: "cover"}} />
                ))}
              </Carousel>
            </div>

            <div class="col-sm-11 col-md-7 col-12">             
              <div className='col-12'>

                <div class="fw-bold fs-4 mb-4">Name: 
                  <span className='fs-6'>
                    {" " + current.contactName}
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='w-50 mt-2' type="text" defaultValue={current.contactName} ref={name} />
                  </div>}
                </div>

                <div class="fw-bold fs-4 mb-4">Phone:
                  <span className='fs-6'>
                    {" " + current.contactPhone}
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='w-50 mt-2' type="text" defaultValue={current.contactPhone} ref={phone} />
                  </div>}
                </div>
                
                <div class="fw-bold fs-4 mb-4">Price: 
                  <span className='fs-6'>
                    {" " + current.price}
                  </span>₪
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='w-50 mt-2' type="number" defaultValue={current.price} ref={price} />
                  </div>}
                </div>     
                
                <div class="fw-bold fs-4 mb-4">Suitable: 
                  <span className='fs-6'>
                    {" " + current.suitable}
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='w-50 mt-2' defaultValue={current.suitable} type="text" ref={suitable} />
                  </div>}
                </div>

                <div class="fw-bold fs-4 mb-4">Code: 
                  <span className='fs-6'>
                    {" " + current.code ? " Yes" : " No"}
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='mt-2 d-block' type="checkbox" onClick={()=> current.code = !current.code} defaultChecked={current.code} ref={code} />
                    {!current.code ? <input className='w-50 mt-2' type="text" ref={keyCode} /> : <input className='w-50 mt-2' type="text" defaultValue={current.keyCode} ref={keyCode}/>}
                  </div>
                  }
                </div>

                <div class="fw-bold fs-4 mb-4">Accessibility: 
                  <span className='fs-6'>
                    {" " + current.accessibility  ? " Yes" : " No"}
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <input className='mt-2' type="checkbox" defaultChecked={current.accessibility} ref={accessibility} />
                  </div>}
                </div>

                <div class="fw-bold fs-4 mb-4">Detail:
                  <span className='fs-6'> 
                    {current.detail.length > 25 ? " " + current.detail.substring(0,25) + "..." : " " + current.detail} 
                  </span>
                  {!change ? "" 
                  : 
                  <div className=''>
                    <textarea variant="outlined" multiline className='w-50 mt-2' type="textarea" rows={5} defaultValue={current.detail} ref={detail} />
                  </div>}
                </div>

                <div class="fw-bold mb-4">Activity Time: 
                  <ActivityTime parking={true} activityTime={current.activityTime}/>
                  {!change ? "" 
                  : 
                  <div className=' mt-2 mx-2 col-sm-10  col-11 d-flex justify-content-start '>
                    <ActivityTime />
                  </div>}
                </div>

              </div>
            </div>
          </div>
          {!change ? "" :
          <div className='d-flex justify-content-center'>
             <div className='btn btn-primary mx-1 d-flex justify-content-center' onClick={(e) => postUpdate(current)}>Save</div>

          </div>
          }
          <div class="d-flex justify-content-center m-3">
            <div className='btn btn-danger mx-3' onClick={() => deletePost(id, current.nameFile)}>Delete Post</div>
            <div className='btn btn-primary' onClick={() => setChange(!change)}>Edit Post</div>
          </div>
        </div> : ""}
    </>
  )
}
