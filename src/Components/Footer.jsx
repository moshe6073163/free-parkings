import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {

  return (
    <>
    <footer>
    <div className="container-fluid text-center text-md-left text-white bg_header d-block">
    <div className="row m-0">
      <div className="col-md-6 mt-md-0 mt-3">
        <h5 className="text-uppercase">Free Parkings</h5>
        <p>Here you can easily find parking.</p>
      </div>

      <hr className="clearfix w-100 d-md-none pb-0"/>

      <div className="col-md-3 mb-md-0 mb-3">
        contact us-
        <ul className="list-unstyled">
          <li>1800-770-770</li>        
        </ul>
      </div>

      <div className="col-md-3 mb-md-0 mb-3">
          <ul className="list-unstyled">
            <li><Link className=' text-light' to={"/About"}>About</Link></li>
          </ul>
      </div>
    </div>
    

    <div className="footer-copyright text-center py-3">© 2023 Free parkings:
    </div>
    </div>
    </footer>
  </>
  )
}
