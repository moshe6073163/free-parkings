import React, { useContext, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import Allert from "../Components/Allert";
import { Link } from "react-router-dom";
import { MyContext } from "../App";
import L from 'leaflet';
import { } from 'mapbox-gl-leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { MdViewModule } from "react-icons/md";
import { HiViewList } from "react-icons/hi";


const myAPIKey = "7aeea4fe26fa4c258c13fb720430df95";

export default function Parkings() {

  const [inputData, setInput] = useState("");
  const { setIsShowAlert, setCordUser, cordUser, posts, input, updateUser, updatePost, currentUser, favoritePosts, setFavoritePosts } = useContext(MyContext);
  const v = useGeolocated();
  const [map, setMap] = useState(false);
  const [cardsMode, setCardsMode] = useState(true);
  useEffect(() => {
    if (v.coords != undefined) {
      setCordUser({ latitude: v.coords.latitude, longitude: v.coords.longitude });
    }
  }, [v.coords])

  useEffect(() => {
    if (input !== "") {
      let m = input.split(',');
      let v = document.getElementById('search');
      v.value = m[0];
      setInput(m[0]);
    }
  }, [])

  const postInput = function (inputParkings) {
    setInput(inputParkings.charAt(0).toUpperCase() + inputParkings.slice(1));
  };

  function setMaps(e) {
    e.preventDefault();
    setMap(!map);
  }

  function setFavorite(post) {
    if (currentUser.id) {
      let p = currentUser.favoritePosts.filter((e) => e === post.id);
      if (p[0]) {
        currentUser.favoritePosts = currentUser.favoritePosts.filter((e) => e !== post.id);
        updateUser(currentUser);
        post.favorite -= 1;
        updatePost(post);
        let v = favoritePosts.filter((e) => e.id !== post.id);
        if (v[0]) {
          setFavoritePosts(v);
        } else {
          setFavoritePosts([]);
        }
      } else {
        currentUser.favoritePosts = [...currentUser.favoritePosts, post.id];
        updateUser(currentUser);
        post.favorite += 1;
        updatePost(post);
        setFavoritePosts([...favoritePosts, post]);
      }
    } else {
      setIsShowAlert({ set: true, component: <Allert set={true} detail={"Please log in"} /> })
    }

  }

  const setFav = (id) => {
    if (currentUser.id) {
      let p = currentUser.favoritePosts.find((e) => e === id);
      if (p) {
        return (<MdFavorite size={30} />)
      } else {
        return (<GrFavorite size={30} />)
      }
    }
  }


  let i = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?color=%23ff0000&size=small&apiKey=${myAPIKey}`,
  });

  return (
    <>
      <div className="container h-auto">
        <div className="d-flex justify-content-between mb-4" >
          <input id="search" className="w-50 rounded mx-3" type="search" placeholder="Search City" onChange={(e) => postInput(e.target.value)} />
          <div className="btn border" onClick={()=> setCardsMode(!cardsMode)}>{!cardsMode ? <MdViewModule size={30}/> : <HiViewList size={30}/>}</div>
          <button className="btn mx-4 d-flex" style={{ backgroundColor: "rgba(216, 213, 111, 0.8" }} onClick={(e) => setMaps(e)}><div>Live Map</div>
            <lord-icon
              src="https://cdn.lordicon.com/oaflahpk.json"
              trigger="hover"
              colors="primary:#e83a30"
              style={{ width: '30px', height: "28px" }}>
            </lord-icon>
          </button>
        </div>

        {!map ? "" : !cordUser ? "" :
          <div className="row d-flex justify-content-center">
            <MapContainer className="mb-3 mx-3 rounded col-sm-11 col-10 " id="my" center={[cordUser.latitude, cordUser.longitude]} style={{ height: '500px' }} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://maps.geoapify.com/v1/tile/maptiler-3d/{z}/{x}/{y}.png?apiKey=${myAPIKey}`}
              />
              <Marker position={[cordUser.latitude, cordUser.longitude]}>
                <Popup>
                  You find here.
                </Popup>
              </Marker>
              {posts.map((post) => (
                <Marker icon={i} position={[post.cordLocation.lat, post.cordLocation.lon]}>
                  <Popup>
                    {post.street + ", " + post.city}
                    <Link to={post.id}> Go to</Link>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>}

        {cardsMode ? 
         <div className="row justify-content-center ">
          <div className="row justify-content-around container rounded mr-0">
            {posts[0] ? posts.filter((post) => post.city.startsWith(inputData)).map((item, i) => (
              <div className="border cards rounded mb-2" style={{ width: "300px", height: "450px" }}>
                <Link to={item.id} key={i} className={'text-decoration-none color-font'}>
                  <div className="d-flex justify-content-center mt-3" style={{ height: "65%" }}>
                    <img className="img-card border rounded" src={item.imgUrl} style={{ height: "90%", width: "100%" }} />
                  </div>
                  <h5 className=""><b>City: </b>{item.city.length > 20 ? item.city.substring(0, 20) + "..." : item.city}</h5>
                  <h5 className=""><b>Street: </b>{item.street.length > 20 ? item.street.substring(0, 20) + "..." : item.street}</h5>
                  <h5 className=""><b>Price: </b>{item.price}₪</h5>
                </Link>
                <div className="d-flex justify-content-between">
                  <div>{item.favorite + " Like this parking "}</div>
                  <div className="color-font" style={{ width: '30px' }} onClick={() => setFavorite(item)}>
                    {currentUser.id ? currentUser.favoritePosts[0] ? setFav(item.id) : <GrFavorite size={30} /> : <GrFavorite size={30} />}
                  </div>
                </div>
              </div>
            )) : ''}
          </div>
        </div> 
        :
        <div className="row justify-content-around container rounded mr-0">
          {posts[0] ? posts.filter((post) => post.city.startsWith(inputData)).map((item, i) => (
            <div className="border d-flex justify-content-between cards rounded mb-2 col-12" style={{ height: "130px" }}>
              <Link to={item.id} key={i} className="col-7 d-flex justify-content-between text-decoration-none color-font">
                <div className="col-4">
                  <h4 className=""><b style={{color: "rgb(52, 54, 34)"}}>City: </b>{item.city.length > 12 ? item.city.substring(0, 12) + "..." : item.city}</h4>
                  <h4 className=""><b style={{color: "rgb(52, 54, 34)"}}>Street: </b>{item.street.length > 12 ? item.street.substring(0, 12) + "..." : item.street}</h4>
                  <h4 className=""><b style={{color: "rgb(52, 54, 34)"}}>Price: </b>{item.price}₪</h4>
                </div>
                <div className="mt-3 col-8 d-flex justify-content-end" style={{ height: "65%" }}>
                  <img className="img-card border rounded col-6" src={item.imgUrl} style={{ height: "120%" }} />
                </div>
              </Link>
              <div className="col-2">
                <div>{item.favorite + " Like this parking "}</div>
                <div className="color-font" style={{ width: '30px' }} onClick={() => setFavorite(item)}>
                  {currentUser.id ? currentUser.favoritePosts[0] ? setFav(item.id) : <GrFavorite size={30} /> : <GrFavorite size={30} />}
                </div>
              </div>
            </div>
          )) : ''}
        </div>
        }
      </div>
    </>
  );
}