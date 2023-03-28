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


export default function PostParking() {

  const { currentUser, setStorage, setImage, image, setNewPost, isLoading } = useContext(MyContext);
  const navigate = useNavigate();

  const imageRef = useRef();
  const accessibility = useRef();
  const city = useRef();
  const street = useRef();
  const suitable = useRef();
  const price = useRef();
  const detail = useRef();

  const [url, setUrl] = useState([]);
  const [code, setCode] = useState();
  const [keyCode, setKeyCode] = useState();
  const [activityTime, setActivityTime] = useState();
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



  // let img = document.getElementById("myimg");

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
      activityTime: activityTime.target.value,
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
    activityTime.target.value = "";
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
      console.log(t);
      t.value = currLoc.address_line1;
      console.log(t.value);
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
          <div className="w-75 bg_postPark border rounded shadow d-flex flex-column justify-content-center">

            <div className="row">
              <div className="col-12 h1 text-center">Post A Park</div>
            </div>

            <form className="row justify-content-around " onSubmit={submitPost}>

              <div className="col-sm-6 col-12 flex-wrap justify-content-center">

                <div className="h3 text-center">Detail</div>
                <button className="btn btn-primary mb-3 w-sm-25 w-50 mx-5" onClick={e => setAutoLocation(e)}>use in current location <BiCurrentLocation /> </button>

                <div className="row d-flex flex-wrap justify-content-center p-0">
                  <div className="col-5 p-0">
                    <TextField required color="warning" id="city" label="City" variant="outlined" className="bg-light col-11 m-2" onChange={(e) => setCityInput(e.target.value)} />
                    <div className="PositionPostParking d-flex flex-column align-items-center col-2">{totalCity.map((e, i) => (
                      <div className="col-12 border">{i < 1 ? <button className="col-12 border btn-light" onClick={(e) => setCity(e.target.innerHTML)}>{e.properties.city}</button>
                        :
                        totalCity[i].properties.city == totalCity[i - 1].properties.city || !totalCity[i].properties.city ? ""
                        :
                        <button className="col-12 border btn-light" onClick={(e) => setCity(e.target.innerHTML)}>{totalCity[i].properties.city}</button>}</div>))}
                    </div>
                  </div>

                  <div className="col-5 p-0">
                    <TextField required color="warning" id="street" label="Street" variant="outlined" className="bg-light col-11 m-2" onChange={(e) => setAddressInput(e.target.value)} />
                    <div className="PositionPostParking d-flex flex-column align-items-center col-2">{totalStreet.map((e, i) => (
                      <div className="col-12 border">{i < 1 ? <button className="w-100 border btn-light" onClick={(e) => setTotalAddress(e.target.innerHTML)}>{e.properties.address_line1}</button>
                        :
                        totalStreet[i].properties.address_line1 == totalStreet[i - 1].properties.address_line1 ? ""
                          :
                          <button className="border btn-light col-12" onClick={(e) => setTotalAddress(e.target.innerHTML)}>{totalStreet[i].properties.address_line1}</button>}</div>))}
                    </div>
                  </div>
                </div>



                <div className="d-flex flex-wrap m-2 justify-content-center">
                  <TextField required color="warning" label="Activity time?" placeholder="sun - thurs" variant="outlined" className="bg-light m-2 col-5" onChange={e => setActivityTime(e)} />
                  <TextField required color="warning" label="suitable for?" placeholder="Car / Trunk / Bike" variant="outlined" className="bg-light m-2 col-5" inputRef={suitable} />
                </div>

                <div className="d-flex flex-wrap m-2 justify-content-center">
                  <TextField required color="warning" label="Please Enter Price:" placeholder="Price For Hour" variant="outlined" className="bg-light m-2 col-5" inputRef={price} />
                  {/* <TextField required color="warning" label="Please Enter Price:" placeholder="Price For Hour" variant="outlined" className="bg-light m-2 col-5" inputRef={price}/> */}
                </div>

                <div className="d-flex flex-wrap m-2 justify-content-center">
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
                        (<input required placeholder="Please Enter A Code" onChange={(e) => setKeyCode(e)} type="number" />)}
                  </div>
                </div>

                <div className="w-100 m-3 d-flex justify-content-center">
                  <TextField className="w-75 bg-light" required color="warning" label="Parking details" placeholder="Give details about the parking" variant="outlined" multiline rows={7} inputRef={detail} />
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



{/* <div className="d-flex justify-content-center border">
                <Carousel autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
                {url.map((item, i) => ( */}
//   <div className='bg-dark '>
//     <div className='text-primary ' key={i} >
//       <img className='w-75 rounded' style={{ height:"250px"}}  src={item}/>
//     </div>
//   </div>))}
// </Carousel>
// </div>}







{/* <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-white" style={{ borderRadius: "25px", backgroundColor: "rgba(31, 30, 29, 0.6)",}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Post A Park</p>
                      <form className="mx-1 mx-md-4" onSubmit={submitPost}>

                      <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <TextField required color="warning" id="outlined-basic" label="City" variant="outlined" onChange={(e)=>setCityInput(e.target.value)} className="bg-light" />
                                <div>{totalCity.map((e, i)=>(
                                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{e.properties.city}</button> : totalCity[i].properties.city == totalCity[i-1].properties.city ? "" : <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{totalCity[i].properties.city}</button>}</div>
                                ))}</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                            <TextField required color="warning" id="outlined" label="Street" variant="outlined" onChange={(e)=>setAddressInput( e.target.value)} className="bg-light" />
                            <div>{totalStreet.map((e, i)=>(
                                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{e.properties.address_line1}</button> : totalStreet[i].properties.address_line1 == totalStreet[i-1].properties.address_line1 ? "" : <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{totalStreet[i].properties.address_line1}</button>}</div>
                                ))}</div>
                            </div>
                        </div>

                        <button className="btn btn-dark text-primary mb-3" onClick={e=>setAutoLocation(e)}>Search By Current Location <BiCurrentLocation/></button>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <input required placeholder="sun - thurs " type="text" id="form3Example4c" className="form-control" onChange={e => setActivityTime(e)}/>
                                <label className="form-label" for="form3Example4c">Activity time?</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                            <input required placeholder="Car / Trunk / Bike" type="text" id="form3Example4c" className="form-control" ref={suitable}/>
                            <label className="form-label" for="form3Example4c">suitable for?</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <input required placeholder="Price For Hour " type="text" id="form3Example4c" className="form-control" ref={price}/>
                                <label className="form-label" for="form3Example4c">Please Enter Price: </label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example3c">Have a Code?</label>
                                <input type="checkbox" id="form3Example3c" onChange={(e) => setCode(e)} className="mx-2"/>
                                { code == undefined ? "" :
                                code.target.checked == false 
                                ?
                                ("") 
                                : 
                                (<input required autoFocus placeholder="Please Enter A Code" onChange={(e) => setKeyCode(e)} type="number" />)}
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className=" form-label" for="form3Example4c">accessibility?</label>
                            <input type="checkbox" ref={accessibility} id="form3Example4c" className="mx-2"/>
                          </div>
                        </div>

                        <div className="mb-1">
                            <div className="">
                                <input onChange={setCityInputaleImage} ref={imageRef} type="file" />
                            </div>
                        </div>
                        <span className="">The selected image</span>
                        {image == undefined 
                        ?
                        ("") 
                        : 
                        (<div style={{ marginTop: "9px" }}>
                            <img className="rounded mx-3" src={url} style={{ width: "250px", height: "150px" }} id="myimg"/>
                            <button onClick={unsetImage}><FaTrashAlt /></button>
                        </div>)}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg mt-4">{isLoading == true ? <img style={{width:'48px', height:'48px'}} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"/> : "submit"}</button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
