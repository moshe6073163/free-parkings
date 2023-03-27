import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { MdFavorite } from "react-icons/md";

export default function FavoritePosts () {
    const { updatePost, updateUser, currentUser, favoritePosts, setFavoritePosts} = useContext(MyContext);

    function setFavorite(post){
        // update fireBase
        currentUser.favoritePosts = currentUser.favoritePosts.filter((e)=> e !== post.id);
        updateUser(currentUser);
        post.favorite-=1;
        updatePost(post);
        // update local
        let v = favoritePosts.filter((e)=> e.id !== post.id);
        if(v[0]){
        setFavoritePosts(v);
        } else {
        setFavoritePosts([]);
        }
    }

  return (
    <div className='container'>
      <div className="row justify-content-center m-0">
        <div className="row justify-content-around container rounded">
            {favoritePosts[0] ? favoritePosts.map((post, i) => (
                <div key={i} className="border cards rounded mb-2" style={{ width: "300px", height: "450px" }}>
                    <Link to={`/Parkings/${post.id}`} className={'text-decoration-none color-font'}>
                        <div className="d-flex justify-content-center mt-3" style={{ height: "65%" }}>
                           <img className="img-card border rounded" src={post.imgUrl} style={{ height: "90%", width: "100%" }}/>
                        </div>
                        <h4 className=""><b>City: </b>{post.city}</h4>
                        <h5 className=""><b>Street: </b>{post.street.length > 20 ? post.street.substring(0, 20) + "..." : post.street }</h5>
                        <h5 className=""><b>Price: </b>{post.price}₪</h5>
                    </Link>
                    <div className="d-flex justify-content-between">
                        <div>{post.favorite + " Like this parking"}</div>
                        <div className="color-font" style={{width:'30px'}} onClick={()=>setFavorite(post)}>
                           <MdFavorite size={30}/>
                        </div>
                    </div>
                </div>
            ))
             : 
            <div className='col-9 d-flex flex-column align-items-center container mt-5'>
                <p className='display-5 col-12 d-flex justify-content-center'>You dont have any favorite posts, </p>
                <Link className='text-decoration-none text-dark btn btn-primary mb-2 w-25' to={'/Parkings'}>To add</Link>
            </div>
            }
            </div>
        </div>
    </div>
  )
}
