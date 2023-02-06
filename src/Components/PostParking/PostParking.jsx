import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import ModalC from '../modalComponnet/ModalC'
import { location } from '../API/APIs';
import { TextField } from "@mui/material";


export default function PostParking() {

  const { currentUser, setStorage, setImage, image, setNewPost, isLoading, input, setInput } = useContext(MyContext);
  const navigate = useNavigate();

  const imageRef = useRef();
  const accessibility = useRef();
  const city = useRef();
  const street = useRef();
  const suitable = useRef();
  const price = useRef();

  const [url, setUrl] = useState([]);
  const [code, setCode] = useState();
  const [keyCode, setKeyCode] = useState();
  const [activityTime, setActivityTime] = useState();
  const [loc, setLoc] = useState([]);
  const [inputCity, setInputCity] = useState("");
   
  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.yourName == undefined)
      changeNavigate();
  }, []);

  useEffect(()=>{
    location(input, setLoc);
    console.log(loc);
    console.log(city.current)
  },[input])

  let img = document.getElementById("myimg");

  const submitPost =  (e) => {
    e.preventDefault();
      const post = {
      userId: currentUser.userId,
      nameFile: imageRef.current.files[0].name,
      accessibility: accessibility.current.checked,
      code: code != undefined ? code.target.checked : "",
      city: (input.charAt(0).toUpperCase() + input.slice(1)),
      street: (street.current.value.charAt(0).toUpperCase() + street.current.value.slice(1)),
      price: price.current.value,
      suitable: suitable.current.value,
      keyCode : keyCode != undefined ? keyCode.target.value : "",
      activityTime: activityTime.target.value,
      contactName: currentUser.yourName,
      contactPhone: currentUser.phone,
      cordLocation: "m",
    };
    setNewPost(post);
    
    accessibility.current.checked = false;
    code != undefined ? code.target.checked = false : setCode(undefined);
    suitable.current.value = "";
    price.current.value = "";
    city.current.value = "";
    street.current.value = "";
    activityTime.target.value = "";
    setImage(undefined);
    img = undefined;
    setStorage(imageRef.current.files[0]);
    imageRef.current.value = null;
  };


  const unsetImage = (e) => {
    e.preventDefault();
    setImage(undefined);
    img = undefined;
    imageRef.current.value = null;
  };

  function setLocaleImage(e) {
    setImage(imageRef.current.files[0]);
    let _url = URL.createObjectURL(imageRef.current.files[0]);
    setUrl(_url);
  }
  
  
  function setAdress(e){
    const t = document.getElementById('outlined-basic');
    console.log(e);
    t.value = e;
    setInput('');
  }

  return (
    <>
      <ModalC/>
      {currentUser.yourName == undefined ? (
        changeNavigate()
      ) : ( 
      <div className="vh-100 ">
        <div className="container h-100 ">
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
                                <TextField required color="warning" id="outlined-basic" label="City" variant="outlined" onChange={(e)=>setInput(e.target.value)} className="bg-light" />
                                <div>{loc.map((e, i)=>(
                                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setAdress(e.target.innerHTML)}>{e.properties.city}</button> : loc[i].properties.city == loc[i-1].properties.city ? "" : <button className="col-4 border" onClick={(e)=>setAdress(e.target.innerHTML)}>{loc[i].properties.city}</button>}</div>
                                ))}</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <input required placeholder="Street, Number, City" type="text" id="form3Example1c" className="form-control" ref={street}/>
                                <label className="form-label" for="form3Example1c">Street</label>
                            </div>
                        </div>

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
                                <input onChange={setLocaleImage} ref={imageRef} type="file" />
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
        </div>
      </div>)}
    </>
  );
};