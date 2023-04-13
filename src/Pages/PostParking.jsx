import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { BiCurrentLocation, BiImageAdd } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import ModalC from '../Components/ModalC'
import { location, getCurrLoc } from '../Components/APIs';
import { TextField } from "@mui/material";
import { useGeolocated } from "react-geolocated";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ActivityTime from "../Components/ActivityTime";


export default function PostParking() {

  const { currentUser, setActivityTime, activityTime, setImage, image, setNewPost, isLoading } = useContext(MyContext);
  const navigate = useNavigate();

  const imageRef = useRef();
  const accessibility = useRef();
  const suitable = useRef();
  const price = useRef();
  const detail = useRef();

  const [url, setUrl] = useState([]);
  const [code, setCode] = useState();
  const [keyCode, setKeyCode] = useState();
  const [showActivityTime, setShowActivityTime] = useState(false);
  const [cityInput, setCityInput] = useState([]);
  const [addressInput, setAddressInput] = useState([]);

  const [totalCity, setTotalCity] = useState([]);
  const [totalStreet, setTotalStreet] = useState([]);
  const [total, setTotal] = useState();
  const [geo, setGeo] = useState();
  const [currLoc, setCurrLoc] = useState();

  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.yourName == undefined)
      changeNavigate();
    setActivityTime([]);
  }, []);
  

  useEffect(() => {
    if (cityInput) {
      location(cityInput, setTotalCity);
    }
  }, [cityInput])


  useEffect(() => {
    if (total) {
      location(total + " " + addressInput, setTotalStreet);
    }
  }, [addressInput])


  const submitPost = (e) => {
    e.preventDefault();
    const post = {
      userId: currentUser.userId,
      accessibility: accessibility.current.checked,
      detail: detail != undefined ? detail.current.value : "",
      code: code != undefined ? code.target.checked : "",
      keyCode: keyCode != undefined ? keyCode.target.value : "",
      city: cityInput,
      street: addressInput,
      price: price.current.value,
      suitable: suitable.current.value,
      activityTime: activityTime ? activityTime : [],
      contactName: currentUser.yourName,
      contactPhone: currentUser.phone,
      cordLocation: geo,
      favorite: 0,
    };
    setNewPost(post)

    accessibility.current.checked = false;
    code != undefined ? code.target.checked = false : setCode(undefined);
    suitable.current.value = "";
    price.current.value = "";
    setImage([]);
    setUrl([]);
  };


  const unsetImage = (e) => {
    url[e] = undefined;
    setUrl(url.filter((url) => url != undefined));

    image[e] = undefined;
    setImage(image.filter((img) => img != undefined));
  };

  function selectImage(e) {
    setUrl([...url, URL.createObjectURL(imageRef.current.files[0])]);

    let file = imageRef.current.files[0];
    setImage([...image, file])
    imageRef.current.value = null;
  }

  function setCity(e) {
    const t = document.getElementById('city');
    t.value = e;
    setCityInput(t.value);
    setTotal(e);
    setTimeout(() => {
      setTotalCity([]);
    }, 1000);
  }

  function setTotalAddress(e) {
    setAddressInput(e);
    setTotal(total + " " + addressInput);
    const t = document.getElementById('street');
    t.value = e;
    setGeo({ lat: totalStreet[0].properties.lat, lon: totalStreet[0].properties.lon });
    setTimeout(() => {
      setTotalStreet([]);
    }, 1000);
  }


  const v = useGeolocated();
  function setAutoLocation(e) {
    e.preventDefault();
    let ge = {
      lat: v.coords.latitude,
      lon: v.coords.longitude
    }
    getCurrLoc(ge, setCurrLoc);
    setGeo({ lat: ge.lat, lon: ge.lon });
  }

  useEffect(() => {
    const t = document.getElementById('street');
    if (currLoc) {
      const t = document.getElementById('street');
      t.value = currLoc.address_line1;
      setAddressInput(t.value);
      const v = document.getElementById('city');
      v.value = currLoc.city;
      setCityInput(v.value);
      location(t.value + " " + v.value, setTotalStreet);
      setTimeout(() => {
        setTotalCity([]);
        setTotalStreet([]);
      }, 1000);
    }
  }, [currLoc]);

  return (
    <>
      <ModalC />
      {currentUser.yourName == undefined ? (
        changeNavigate()
      ) : (
        <div className="h-auto mb-5 d-flex justify-content-center ">
          <div className="col-sm-7 col-9 bg_postPark border rounded shadow d-flex flex-column justify-content-center">

            <div className="row">
              <div className="col-12 h1 text-center">Post A Park</div>
            </div>

            <form className="row justify-content-around " onSubmit={submitPost}>

              <div className="col-sm-7 col-12 flex-wrap justify-content-center">

                <div className="h3 text-center">Detail</div>

                <div className="row d-flex flex-wrap justify-content-center p-0">
                  <div className="col-5 p-0 ">
                    <TextField required color="warning" id="city" label="City" variant="outlined" className="bg-light col-10 rounded m-2" onChange={(e) => setCityInput(e.target.value)} />
                    <div className="PositionPostParking bg-light  rounded d-flex flex-column align-items-center col-5">
                      {totalCity.map((e, i) => (
                      <div className="col-12 rounded">{i < 1 ? <div> 
                      <button className="col-12 border bg-primary rounded" onClick={e => setAutoLocation(e)}>My location <BiCurrentLocation /> </button>
                      <button className="col-12 border rounded" onClick={(e) => setCity(e.target.innerHTML)}>{e.properties.city}</button>
                      </div>  :
                        totalCity[i].properties.city == totalCity[i - 1].properties.city || !totalCity[i].properties.city ? ""
                        :
                        <button className="col-12 border rounded" onClick={(e) => setCity(e.target.innerHTML)}>{totalCity[i].properties.city}</button>}</div>))}
                    </div>
                  </div>

                  <div className="col-5 p-0">
                    <TextField required color="warning" id="street" label="Street" variant="outlined" className="bg-light rounded col-10 m-2" onChange={(e) => setAddressInput(e.target.value)} />
                    <div className="PositionPostParking d-flex flex-column align-items-center col-5">{totalStreet.map((e, i) => (
                      <div className="col-12 border">{i < 1 ? <button className="w-100 border btn-light" onClick={(e) => setTotalAddress(e.target.innerHTML)}>{e.properties.address_line1}</button>
                        :
                        totalStreet[i].properties.address_line1 == totalStreet[i - 1].properties.address_line1 ? ""
                          :
                          <button className="border btn-light col-12" onClick={(e) => setTotalAddress(e.target.innerHTML)}>{totalStreet[i].properties.address_line1}</button>}</div>))}
                    </div>
                  </div>
                </div>


                
                <div className="d-flex flex-wrap m-2 justify-content-center">
                  {!showActivityTime ? <div style={{height:'56px'}} className="btn btn-light mt-2 text-primary col-5" onClick={()=>setShowActivityTime(!showActivityTime)}>Activity time</div> 
                  : 
                  <div className=" posActivityTime rounded mt-2 col-sm-6 col-md-4 col-11 d-flex flex-wrap justify-content-center"><ActivityTime show={setShowActivityTime}/></div>
                  }
                  <TextField required color="warning" label="suitable for?" placeholder="Car / Trunk / Bike" variant="outlined" className="bg-light rounded m-2 col-5" inputRef={suitable} />
                </div>

                <div className="d-flex flex-wrap m-2 justify-content-center">
                  <TextField required color="warning" label="Please Enter Price:" placeholder="Price For Hour" variant="outlined" className="bg-light rounded m-2 col-5" inputRef={price} />
                  {/* <TextField required color="warning" label="Please Enter Price:" placeholder="Price For Hour" variant="outlined" className="bg-light m-2 col-5" inputRef={price}/> */}
                </div>

                <div className="d-flex flex-wrap m-2 justify-content-around">
                  <div className="col-5">
                    <label className=" form-label" for="form3Example4c">accessibility ?</label>
                    <input type="checkbox" ref={accessibility} className="m-2" />

                  </div>

                  <div className="col-5">
                    <label>Have a Code ?</label>
                    <input type="checkbox" className="m-2" onChange={(e) => setCode(e)} />
                    {code == undefined ? "" :
                      code.target.checked == false
                        ?
                        ("")
                        :
                        (<input className="w-100 rounded" required placeholder="Please Enter A Code" onChange={(e) => setKeyCode(e)} type="number" />)}
                  </div>
                </div>

                <div className="w-100 m-3 d-flex justify-content-center">
                  <TextField className="w-75 bg-light rounded" required color="warning" label="Parking details" placeholder="Give details about the parking" variant="outlined" multiline rows={7} inputRef={detail} />
                </div>
              </div>


              <div className="col-sm-6 col-12 d-flex flex-column  align-items-center">

                <div className="h3  mb-5">Images</div>

                <div className="border rounded m-1">
                  <input type="file" id="img" style={{ display: "none" }} onChange={(e) => selectImage()} ref={imageRef} />
                  <label for="img"><BiImageAdd size={185} /></label>
                </div>

                <div className="col-10 d-flex justify-content-center pt-3">
                  <Carousel className=" d-flex justify-content-center" autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
                    {url.map((item, i) => (
                      <div class="position-relative rounded border d-flex justify-content-center" key={i}>
                        <img src={item} alt="picture parking" class="img-fluid" style={{ width: '590px', height: '300px' }} />
                        <button className="btn-no-background position-absolute top-50 start-50 translate-middle" onClick={() => unsetImage(i)}><FaTrashAlt size={40} /></button>
                      </div>
                    ))}
                  </Carousel>
                </div>

              </div>

              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="btn btn-primary btn-lg mt-4">{isLoading == true ? <img style={{ width: '48px', height: '48px' }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" /> : "submit"}</button>
              </div>
            </form>
          </div>
        </div>)}
    </>
  );
};