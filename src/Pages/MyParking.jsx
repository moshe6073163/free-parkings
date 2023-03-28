import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../App';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { TextField } from '@mui/joy';


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
  const activityTime = useRef();

  const { id } = useParams();
  const { posts, postDelete, updatePost } = useContext(MyContext);
  const navigate = useNavigate();
  const [change, setChange] = useState(false);

  const current = posts.find((post) => post.id == id);

  function deletePost(id, nameFile) {
    postDelete(id, nameFile);
    navigate('/MyAccount');
  }

  function postUpdate(current) {
    const post = {
      userId: current.userId,
      accessibility: accessibility.current.checked,
      detail: detail.current.value,
      code: code.target.checked,
      keyCode: keyCode != undefined ? keyCode.target.value : "",
      city: current.city,
      street: current.street,
      price: price.current.value,
      suitable: suitable.current.value,
      activityTime: activityTime.target.value,
      contactName: name.target.value,
      contactPhone: phone.target.value,
      cordLocation: current.cordLocation,
      favorite: current.favorite,
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
                  <img src={img} alt="picture parking" class="img-fluid rounded-3" style={{ width: "640px", height: "350px" }} />
                ))}
              </Carousel>
            </div>

            <div class="col-sm-7 col-12">

              <p class="text-primary mt-2 display-6 d-flex">Price: {current.price}₪
                {!change ? "" : <div>
                  <input className='w-50 mt-2' type="number" defaultValue={current.price} ref={price} />
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">Activity Time: {current.activityTime}
                {!change ? "" : <div>
                  <input className='w-50 mt-2' defaultValue={current.activityTime} type="text" ref={activityTime} />
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">accessibility: {current.accessibility  ? "Yes" : "No"}
                {!change ? "" : <div>
                  <input className='w-50 mt-2' type="checkbox" defaultChecked={current.accessibility} ref={accessibility} />
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">Code: {current.code ? "Yes" : "No"}
                {!change ? "" : <div>
                  <input className='w-50 mt-2' type="checkbox" onClick={()=> current.code = !current.code} defaultChecked={current.code} ref={code} />
                  {!current.code ? <input className='w-50 mt-2' type="text" ref={keyCode} /> : <input className='w-50 mt-2' type="text" defaultValue={current.keyCode} ref={keyCode}/>}
                  
                  {/* {!current.code ? "" : <div>{current.keyCode}</div>} */}
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">Detail: <br/><p className='w-50'> {current.detail}</p>
                {!change ? "" : <div>
                {/* <TextField defaultValue={current.detail} className="w-75 bg-light" required color="warning" label="Parking details" placeholder="Give details about the parking" variant="outlined" multiline rows={7} inputRef={detail} /> */}
                  <textarea variant="outlined" multiline className='w-100 h-75 mt-2' type="textarea" defaultValue={current.detail} ref={detail} />
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">Name: {current.contactName}
                {!change ? "" : <div>
                  <input className='w-50 mt-2' type="text" defaultValue={current.contactName} ref={name} />
                </div>
                }
              </p>

              <p class="text-primary mt-2 display-6 d-flex">Phone: {current.contactPhone}
                {!change ? "" : <div>
                  <input className='w-50 mt-2' type="text" defaultValue={current.contactPhone} ref={phone} />
                </div>
                }
              </p>
            </div>
          </div>
          <div className='btn btn-primary mx-1' onClick={(e) => postUpdate(current)}>Save</div>
          
          <div class="mt-5">
            <div className='btn btn-danger' onClick={() => deletePost(id, current.nameFile)}>Delete Post</div>
            <div className='btn btn-primary' onClick={() => setChange(!change)}>Edit Post</div>
          </div>
        </div>}
    </>
  )
}
