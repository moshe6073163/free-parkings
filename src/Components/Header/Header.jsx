import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { MdFavorite } from "react-icons/md";
// import { getAuth, signOut } from "firebase/auth";
// import { app } from "../../firebase/Firebase";

export default function Header() {
  const { currentUser, setCurrentUser, setProfileUrl } = useContext(MyContext);
  const [showName, setShowName] = useState(true);
  const navigate = useNavigate();

  function Disconnect() {
    // const auth = getAuth(app); 
    setCurrentUser({});
    localStorage.clear();
    setProfileUrl("");
    navigate("/");
    // signOut(auth);
  }

  useEffect(() => {
    window.addEventListener("click", () => setShowName(true));
  }, []);

  function setName(e) {
    e.stopPropagation();
    setShowName(!showName);
  }

  return (
    <div className="sticky-top"> 
      <ul
        
        className="d-flex justify-content-around fs-2 list-unstyled bg_header text-light w-100"
      >
        <li>
          <Link to={"/"}>
            <img
              className="rounded-circle mt-1 mb-1"
              src="https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg"
              width="100px"
              height="70px"
            />
          </Link>
        </li>
        <li className="mx-1 mt-2">Free Parkings</li>
        <li></li>
        <p className="p-2 ">{showName ? currentUser.yourName : ""}</p>
        <img
          className="rounded-circle mt-1"
          onClick={(e) => setName(e)}
          src={
            currentUser.profileUrl
              ? currentUser.profileUrl
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          style={{ width: "60px", height: "60px" }}
        />
        {showName ? "" :
        <div
          className="position-absolute bg-light rounded p-2"
          style={{ top: "70px", right: "20px" }}
        >
          <ul className="list-unstyled mx-sm-0 ">
            <li className="d-flex justify-content-center bg-primary boredr rounded fs-3 mb-1">
              {currentUser.yourName}
            </li>
            <li>
              <Link
                className=" nav-link text-primary d-flex justify-content-center"
                to={"/MyAccount"}
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                className=" nav-link text-primary d-flex justify-content-center"
                to={"/About"}
              >
                About
              </Link>
            </li>
            {currentUser.yourName != undefined ? (
              <div className="">
                {currentUser.admin == false ? (
                  ""
                ) : (
                  <Link className="d-flex justify-content-center nav-link text-primary" to={"/Users"}>
                    Users
                  </Link>
                )}

                <li>
                  <Link className="d-flex justify-content-center nav-link text-primary" to={"/FavoritePosts"}>My Favorite <MdFavorite className="mx-1 text-danger mt-2" size={30}/></Link>
                </li>
                
                <li className="">
                  <button
                    className=" bg-danger d-flex justify-content-center rounded"
                    onClick={Disconnect}
                  >
                    Disconnect
                    <FaUserCheck className="mx-2 mt-2" />
                  </button>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link
                    className=" btn btn-primary d-flex justify-content-center"
                    to={"/LogIn"}
                  >
                    LogIn  <FaUserAltSlash className="mx-1 mt-1" />
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      }
      </ul>
    </div>
  );
}
