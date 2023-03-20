import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../App";
import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';
import { useGeolocated } from 'react-geolocated';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import SpeedAccess from "../speedAccess/SpeedAccess"

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

const myAPIKey = "7aeea4fe26fa4c258c13fb720430df95";
export default function Parking() {

  const { id } = useParams();
  const {posts, setCordUser, cordUser, users} = useContext(MyContext);
  // const [img, setImg] = useState();
  const [current, setCurrent] = useState();
  
  useEffect(()=>{
    setCurrent( posts.find((post) => post.id === id));
  },[])

  // useEffect(()=>{
  //  let v = users.find((e)=> e.userId == current.userId);
  //  console.log(v)
  //  if(v){
  //   v.profileUrl === "" ? setImg("https://cdn-icons-png.flaticon.com/512/149/149071.png") :
  //   setImg(v.profileUrl);
  //  }
  // console.log(v)
  // },[current])

  let ro;
  async function mapRouting(fromWaypoint, toWaypoint){
    const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=instruction_details&apiKey=${myAPIKey}`;
    await fetch(url).then(res => res.json()).then(result => { 
      ro = result;
    }, error => console.log(error));
  }

  async function setRout(){
    await mapRouting([cordUser.latitude , cordUser.longitude], [current.cordLocation.lat , current.cordLocation.lon]);    
    if(ro){
      L.geoJSON(ro, {
        style: (feature) => {
          return {
            color: "rgba(20, 137, 255, 0.7)",
            weight: 5
          };
        }
      }).bindPopup((layer) => {
        return `${layer.features.properties.distance} ${layer.features.properties.distance_units}, ${layer.features.properties.time}`
      }).addTo(map);
    }
  }


  const [hide, setHide] = useState(false);

  function hideContact(){
    if (hide == true) {
      setHide(false);
    }
    else{
      setHide(true);
    }
    
  }

  const v = useGeolocated();
  const [routing, setRouting] = useState(false);


  useEffect(()=>{
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
    }
  }, [v.coords])

  var map;
let m = document.getElementById('my-map');

async function maps(e){
  e.preventDefault();
  if(!m.style.display || m.style.display == 'none') {

    m.style.display = 'block';
   
    map = L.map('my-map').setView([cordUser.latitude, cordUser.longitude], 17);
    

    const isRetina = L.Browser.retina;
    const baseUrl = `https://maps.geoapify.com/v1/tile/maptiler-3d/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/maptiler-3d/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: myAPIKey, 
      maxZoom: 20, 
      id: 'maptiler-3d',
    }).addTo(map);
    
    posts.map((e)=>{
      let i = L.icon({
        iconUrl:`https://api.geoapify.com/v1/icon/?color=%23ff0000&size=small&apiKey=${myAPIKey}`,
      });
      let l = L.marker([e.cordLocation.lat , e.cordLocation.lon], {icon: i}).addTo(map)
      .bindPopup(`${e.street + ", " + e.city}`)
      .openPopup();
    })
    
    L.marker([cordUser.latitude , cordUser.longitude]).addTo(map)
        .bindPopup('You Find Here')
        .openPopup();
        setRouting(true);
    setRout();
  } else {
    m.style.display = 'none';
    map = '';
    }
}

  return (
    <div >
    {current ? 
    <div class="container mt-5 ">
       {/* <WhatsappShareButton title={"*Free parking*\n We found a parking for you!\n City: " + current.city + ", Street: " + current.street + "\nPrice: " + current.price + ' ₪ for hour\n\n' } url={ window.location.href } > 
          <WhatsappIcon round={ false } size={ 44 } />
        </WhatsappShareButton> */}
        
      <div class="row">
        <h1>{current.address}</h1>
        <div class="col-md-5">
        <Carousel className="border rounded" autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
          {current.imgUrl.map((img)=>(
          <img src={img} alt="picture parking" class="img-fluid rounded-3" style={{  height: "350px" }} />
          )) }
        </Carousel>
        </div>
        <ul class="col-md-6 list-unstyled fs-5"> <h2>Parking Detail:</h2>
          <li class="text-primary"><b>Detail: </b>{current.detail ? current.detail : ""}</li>
          <li class="text-primary"><b>city: </b>{current.city}</li>
          <li class="text-primary"><b>street: </b>{current.street}</li>
          <li class="text-primary"><b>Activity time: </b>{current.activityTime}</li>
          <li class="text-primary"><b>price: ₪</b>{current.price}</li>
          <li class="text-primary"><b>accessibility: </b>{current.accessibility == true ? "yes" : "no"}</li>
          <li class="text-primary"><b>Have a Code?: </b>{current.code == true ? "yes" : "no"}</li>
          <div class="row mt-5">
            <div class="col-7 d-flex">
              <button class="btn btn-primary btn-lg mb-2" style={{ height:'48px'}} onClick={() => hideContact()}>contact</button>
              <SpeedAccess />
              {hide ? 
              <div className="mx-4 inPositionContact">
                <img className="" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" style={{ width: "90px", height: "90px" }} />
                <div className="">Name: {current.contactName}</div>
                <div className="">Phone: <a href={`tel:${current.contactPhone}`}>{current.contactPhone}</a></div>
              </div>
            : ''}
            </div>
          </div>
        </ul>
        
      </div> 
      <button className="btn btn-primary mt-2 mb-2" onClick={e=>maps(e)} >Live</button>
      <div className="">
        <div className="" style={{ height:'450px', width:'80%'}} id="my-map"></div>
      </div>
    </div> : ''}
    </div>
  )
}

