import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../App";
import { location } from "../Components/APIs";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import Allert from "../Components/Allert";

export default function Home() {
  const {setIsShowAlert , setInput, currentUser, setFavoritePosts, favoritePosts, updatePost, updateUser} = useContext(MyContext);
  const [inputData, setInputData] = useState([]); 
  
  let v = document.getElementById('search');
  function startSearch(){
    setInput(v.value.charAt(0).toUpperCase() + v.value.slice(1));
  }

  useEffect(()=>{
    setInput('');
  },[])
  
  function addToIn(e){
    v.value = e;
    setInputData([]);
  }

  function getData(e){
    location(e, setInputData);
  }


  return (
  <>
  <div className="container-fluid row m-0">
    <div className="col-12">
      <h1 className="d-flex justify-content-center display-2">Search Parkings</h1>
      <samp className="d-flex flex-wrap justify-content-center"> 
        <p className="d-flex justify-content-center pb-sm-2 fs-1 ">Here you can easily </p>
        <p className="d-flex justify-content-center pb-2 fs-1 mx-2">find parking</p>
      </samp>
      <samp className="d-flex justify-content-center display-6 mb-1">Choose City ...</samp>
      <div className="d-flex justify-content-center col-12">
        <div className="col-sm-6 col-12">
          <div class="input-group d-flex justify-content-center w-sm-75 rounded" style={{border: "2px solid rgb(111, 184, 184)", shadow: "2px 2px 12px 2px rgb(12, 11, 11)" }}>
            <input id="search" type="text" className="form-control" placeholder="Please Enter City" onChange={e=>getData(e.target.value) } />
            <div class="input-group-append">
              <Link to={'/Parkings'}><button class="btn btn-outline-secondary" type="button" onClick={startSearch}>Search</button></Link>
            </div>
          </div>
          <div className="">{inputData.map((e, i)=>(
            <div className="border bg-light">{i < 1 ? <div onClick={e=>addToIn(e.target.innerHTML)} className="btn text-dark" >{e.properties.city+ ', ' + e.properties.country}</div> 
              : 
              inputData[i].properties.city == inputData[i-1].properties.city ? ""
              : 
              <div className="btn text-dark" onClick={e=>addToIn(e.target.innerHTML)}>{e.properties.city+ ', ' + e.properties.country}</div>}
            </div>))}
          </div>
        </div>
      </div>

    </div>
    <div className="d-flex justify-content-center flex-wrap">
      <div className="col-sm-4 col-10 d-flex  mb-sm-0 mb-2 rounded  h-sm-75" >
        <img src="https://i.imagesup.co/images2/fa578cc5194b76cef23d2f175890b2b0ba81e6e4.png" width={'100%'}/>
      </div>
      <div className="col-sm-4 col-12 d-flex flex-wrap justify-content-sm-start justify-content-center">
        <div className="mx-4 mb-1">
          <div className="display-2 text-secondary"><b>Hellow </b></div>
          <div className="display-3 text-secondary">How are you</div>
          <div className=" d-flex mt-3 w-75 justify-content-between">
            <Link id="linkToParkings" to={"/Parkings"} className="btn btn-outline-secondary w-100 hover-overlay">Search Parkings</Link>
            <Link to={"/PostParking"} className="btn text-secondary w-100 ">post parking</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}