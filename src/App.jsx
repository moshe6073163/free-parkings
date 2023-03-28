import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Parkings from "./Pages/Parkings";
import Parking from "./Pages/Parking";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import NewUser from "./Pages/NewUser";
import PostParking from "./Pages/PostParking";
import MyAccount from "./Pages/MyAccount";
import PageError from "./Pages/PageError";
import MyParking from "./Components/MyParking";
import Admin from "./Pages/Admin";
import Users from "./Pages/Users";
import FavoritePosts from "./Pages/FavoritePosts";

// firestore Files
import { firestore, storage } from "./Firebase";
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes,deleteObject, listAll  } from "firebase/storage";
import Allert from "./Components/Allert";
//////////////////////////////////////////////////////////////////////////////////////////////

// lord icon
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export const MyContext = createContext(); // הצהרה רישונית

export default function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [image, setImage] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [cordUser, setCordUser] = useState();
  const [profileUrl, setProfileUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [flag, setflag] = useState(true);  
  const [isShowAlert, setIsShowAlert] = useState({set: false});
  const navigate = useNavigate();

  // function to create new user
  const usersRef = collection(firestore, "users");
  let v = 0;
  const setNewUser = (userData) => {
    const queryUser = query(usersRef, where('userName', '==', `${userData.userName}`));
    onSnapshot(queryUser, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      if(books[0] && v == 0){
        setIsShowAlert({set: true, component: <Allert set={true} detail = {"You Have a Account"}/> })            
        navigate('/LogIn');
      } 
      else if(v == 0) {
        try {
          addDoc(usersRef, userData)
          .then((user)=>{
            userData.id = user.id
          })
        }
        catch (err) {
          console.log(err);
        }
        localStorage.setItem("userId", `${userData.userId}`);
        setCurrentUser(userData);
        navigate('/');
      }
      v=1;
    })
  }

 
  // function to create new post
  let postsRef = collection(firestore, "posts");
  const setNewPost = (postData) => {
    try { 
      let n = addDoc(postsRef, postData)
      .then((result)=>{
        postData.id = result.id;
        setStorage(image, postData);
      }) 
      .catch((error) => console.log(error));
      setPosts([...posts, postData]); 
    } 
    catch (err) {
      console.log(err);
    } 
  };


  // function to upload images to fireBase
  let storageRef;
  const setStorage = (files, post) => {
    let i = 0;
    while(files[i]){
      storageRef = ref(storage, currentUser.userId + `/${post.id}/` + files[i].name);
      setIsLoading(true);
  
      uploadBytes(storageRef, files[i])
      .then((snapshot) => {
        console.log('Uploaded successed!');
        setIsLoading(false);
        setIsShowModal(true);
        setInput('');
        getUrl(post, i);
      });
      i++;
    }
  };


  // function to add url for image in post in fireBase
  let arr = [];
  function getUrl(post, i) {
    arr = [];
    storageRef = ref(storage, post.userId + `/${post.id}`);
    listAll(storageRef)
    .then((files)=>{
      if(files.items.length == image.length){
        files.items.forEach((e,i)=>{
          getDownloadURL(e)
          .then((url)=>{
            arr[i] = url;
            updatePost({...post, imgUrl: arr})
          })
        })
      } 
      else if(i == image.length) {
        getUrl(post);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
   

  
  const localeUId = localStorage.getItem('userId');
  function setUser (UserName, password){ 
    let queryUser;
    if(localeUId != null) {
      queryUser = query(usersRef, where('userId', '==', `${localeUId}`));
    } else {
      queryUser = query(usersRef, where('userName', '==', `${UserName}`));
    }
      onSnapshot(queryUser, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      if(books[0] != undefined){
        if(localeUId != null) {
         setCurrentUser(books.find((e)=> e.userId == localeUId));
        } else {
          if(books[0].password == password){
            setCurrentUser(books[0]);
            localStorage.setItem("userId", `${books[0].userId}`);
            navigate('/');
          } else if(!password && UserName){
            setCurrentUser(books[0]);
            localStorage.setItem("userId", `${books[0].userId}`);
            navigate('/');
          } else {
            setIsShowAlert({set: true, component: <Allert set={true} detail = {"Please Enter Password correct"}/> })            
          }
        }
      } else {
        if(password == undefined) {}
        else{
          setIsShowAlert({set: true, component: <Allert set={true} detail = {"Please Sign In"}/> })
        } 
    }
    });
  }
  
  useEffect(()=>{
    if(profileUrl !== ''){
      updateUser({...currentUser, profileUrl: profileUrl});
    }
    getAllUsers();
    
    if(currentUser.yourName != undefined && flag){
      let arr = [];
      for(let i = 0; i < currentUser.favoritePosts.length; i++){
        for(let j = 0; j < posts.length; j++){
          if(currentUser.favoritePosts[i] === posts[j].id){
            arr.push(posts[j]);
          }
        }
      }
      setFavoritePosts(arr);
      setflag(false);
    }
  }, [currentUser])

  function getAllUsers(){
    if(currentUser.admin){
      let queryUser = query(usersRef);
      onSnapshot(queryUser, (snapshot) => {
        const books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        let v = [];
        books.map((e,i)=>{
            v[i] = {
              yourName: e.yourName,
              userName: e.userName,
              userId: e.userId,
              profileUrl:  e.profileUrl,
              id: e.id,
              admin: e.admin,
            }
        })
        setUsers(v)
      });
    }
  }
 
  useEffect(() => {
    setUser();
    let queryPosts = query(postsRef);
    onSnapshot(queryPosts, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setPosts(books);     
    });
    
  },[]);

  

  

  function updateUser(user){
    let a = doc(firestore, 'users', `${user.id}`);
    const loc = updateDoc(a,user);
  }

  function updatePost(current){
    let a = doc(firestore, 'posts', `${current.id}`);
    const loc = updateDoc(a,current);
  }

  function postDelete(id, fileName){

    /// delete post from firebase
    let a = doc(firestore, 'posts', `${id}`);
    let n = deleteDoc(a);

    /// delete image from firebase
    storageRef = ref(storage, currentUser.userId + "/images/" + `${fileName}`);
    deleteObject(storageRef);

    let arr = posts.filter((item)=> item.id != id);
    setPosts(arr);
  }

  function userDelete(id){
    let queryUser = query(usersRef, where('id', '==', id));
    onSnapshot(queryUser, (snapshot) => {
        const books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
      
    let u = books[0];
    let p = posts.filter((e)=> e.userId == u.userId);
    p.map((e)=>{
      postDelete(e.id, e.fileName);
    })
    setFavoritePosts([]);
  })

    /// delete user from firebase
    let a = doc(firestore, 'users', `${id}`);
    let n = deleteDoc(a);
    let arr = users.filter((item)=> item.id != id);
    setUsers(arr);
  }
//////////////////////////////////////////////////////////////////////////////////////////////
 
  const AllData = {
///////////////////
    setNewUser,
    setNewPost,
    setStorage,
    setUser,
    postDelete,
    updateUser,
    updatePost,
    userDelete,
///////////////////
    currentUser,
    setCurrentUser,
    setImage,
    image,
    posts,
    isLoading,
    isShowModal,
    setIsShowModal,
    input, 
    setInput,
    cordUser,
    setCordUser,
    setProfileUrl,
    users,
    setUsers,
    favoritePosts,
    setFavoritePosts,
    setIsShowAlert,
  };

  return (
    <div className="bg_site">
    <div className="" >
      <div id="GoToUp" className="" style={{minHeight: '90vh'}}>
        <MyContext.Provider value={AllData}>
        {isShowAlert.set ? isShowAlert.component : ""}
          <Header  />
          <Routes >
            <Route path="/" element={<Home />}></Route>
            <Route path="/*" element={<PageError />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/MyAccount" element={<MyAccount />}></Route>
            <Route path="/Parkings" element={<Parkings />}></Route>
            <Route path="/Parkings/:id" element={<Parking />}></Route>
            <Route path="/MyAccount/:id" element={<MyParking />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/NewUser" element={<NewUser />}></Route>
            <Route path="/FavoritePosts" element={<FavoritePosts />}></Route>
            <Route path="/PostParking" element={<PostParking />}></Route>
            <Route path="/Users" element={<Users />}></Route>
            <Route path="/Users/Admin/:id" element={<Admin />}></Route>
          </Routes>
          {/* <a style={{zIndex:'9999', position:'fixed', bottom:'50px', height:'50px'}}   href="#GoToUp"><IoArrowUpOutline className="border rounded-circle text-light" size={50}/></a> */}
        </MyContext.Provider>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
