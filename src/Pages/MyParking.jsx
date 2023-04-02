import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../App';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { TextField } from '@mui/joy';
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
  const [current, setCurrent] = useState(posts.find((post) => post.id == id))

  useEffect(()=>{
    if(current){
      setActivityTime(current.activityTime)
    }
  },[current])

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
      {!current ? "" :
        <div class="container mt-5">
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
              <div className='col-12 d-flex flex-column align-items-center'>
              <p class=" mt-2 display-6 d-flex fw-bold">Price: <p>{current.price}</p>₪
                {!change ? "" : <div className='d-flex justify-content-end'>
                  <input className='w-50 mt-2' type="number" defaultValue={current.price} ref={price} />
                </div>
                }
              </p>

              <p class="col-10 mt-2 display-6 d-flex flex-wrap justify-content-center">Activity Time: <p><ActivityTime parking={true} activityTime={current.activityTime}/></p>
                {!change ? "" : <div className='col-12'>
                <ActivityTime  /></div>
                }
              </p>
              <p class=" mt-2 display-6 d-flex">Suitable: <p>{current.suitable}</p>
                {!change ? "" : <div className='d-flex justify-content-end'>
                  <input className='w-50 mt-2' defaultValue={current.suitable} type="text" ref={suitable} />
                </div>
                }
              </p>

              <p class=" mt-2 display-6 d-flex">Accessibility: <p>{current.accessibility  ? "Yes" : "No"}</p>
                {!change ? "" : <div className='d-flex justify-content-end'>
                  <input className=' mt-2' type="checkbox" defaultChecked={current.accessibility} ref={accessibility} />
                </div>
                }
              </p>

              <p class=" mt-2 display-6 d-flex">Code: <p>{current.code ? "Yes" : "No"}</p>
                {!change ? "" : <div className='d-flex justify-content-end'>
                  <input className=' mt-2' type="checkbox" onClick={()=> current.code = !current.code} defaultChecked={current.code} ref={code} />
                  {!current.code ? <input className='w-50 mt-2' type="text" ref={keyCode} /> : <input className='w-50 mt-2' type="text" defaultValue={current.keyCode} ref={keyCode}/>}
                  
                  {/* {!current.code ? "" : <div>{current.keyCode}</div>} */}
                </div>
                }
              </p>

              <p class=" mt-2 display-6 d-flex">Detail:<p> {current.detail.length > 25 ? current.detail.substring(0,25) + "..." : current.detail} </p>
                {!change ? "" : <div className='d-flex justify-content-end'>
                {/* <TextField defaultValue={current.detail} className="w-75 bg-light" required color="warning" label="Parking details" placeholder="Give details about the parking" variant="outlined" multiline rows={7} inputRef={detail} /> */}
                  <textarea variant="outlined" multiline className='w-75 h-100 mt-2' type="textarea" defaultValue={current.detail} ref={detail} />
                </div>
                }
              </p>

              <p class=" mt-2 display-6 d-flex">Name: <p className='w-50'>{current.contactName}</p>
                {!change ? "" : <div className='d-flex w-100 justify-content-end'>
                  <input className='w-100 mt-2' type="text" defaultValue={current.contactName} ref={name} />
                </div>
                }
              </p>

              <p class=" mt-2 display-6 d-flex">Phone: <p>{current.contactPhone}</p>
                {!change ? "" : <div className='d-flex w-100 justify-content-end'>
                  <input className='w-75 mt-2' type="text" defaultValue={current.contactPhone} ref={phone} />
                </div>
                }
              </p>
              </div>
            </div>
          </div>
          {!change ? "" :
          <div className='btn btn-primary mx-1' onClick={(e) => postUpdate(current)}>Save</div>
          }
          <div class="mt-5 mb-3">
            <div className='btn btn-danger mx-3' onClick={() => deletePost(id, current.nameFile)}>Delete Post</div>
            <div className='btn btn-primary' onClick={() => setChange(!change)}>Edit Post</div>
          </div>
        </div>}
    </>
  )
}
