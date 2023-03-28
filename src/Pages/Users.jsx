import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../App'
import MyParking from '../Components/MyParking';

export default function Users() {
    const {users} = useContext(MyContext);

  return (
    <div className='vh-100'>
      <h1 className='d-flex justify-content-center'>All Users</h1>

      <div className='d-flex justify-content-center flex-wrap' style={{height: "650px" }}>
        {users.map((u, i)=>( 
        <Link to={"Admin/" + u.userId} className="text-decoration-none border m-1 rounded bg-light" style={{ width: "250px", height: "140px" }}>
          <div className='d-flex justify-content-center'><b>{(i + 1)}</b></div>
          <div className='d-flex justify-content-center'><img className='rounded-circle' src={u.profileUrl ? u.profileUrl : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} style={{ width: "60px", height: "60px" }}/></div>
          <div className='d-flex justify-content-center'>{u.yourName}</div>
          <div className='d-flex justify-content-center'>{u.userName}</div>
        </Link>
        ))}
      </div>
    </div>
  )
}

//{/* <div className='btn btn-warning ' onClick={e => setPosts(u)}>See Posts</div> */}
