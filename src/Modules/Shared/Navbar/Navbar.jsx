import React, { useContext } from 'react'
import freshCard from "../../../assets/images/freshcart-logo.svg"
import { authContext } from '../../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate =useNavigate()

   const {token,setToken}=  useContext(authContext)
  // HANDLE LOGOUT
 const handleLogOut =()=>{
  localStorage.removeItem("tkn")
  navigate("/login")
  setToken(null)
 }

  return (
    <>
    <div className="content">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <img src={freshCard} alt=" fresh card" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token?<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/cart">Cart</Link>
        </li>
      </ul>:""}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex  align-items-center">
         <i className='fa-brands fa-facebook mx-1'></i>
         <i className='fa-brands fa-instagram mx-2'></i>
         <i className='fa-brands fa-twitter mx-2'></i>
         <i className='fa-brands fa-youtube mx-2'></i>
        </li>
        {!token?<><li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li></>:  <li className="nav-item">
         <span className="nav-link" onClick={handleLogOut}>Log Out</span>
        </li>}
        
      
      </ul>
    </div>
  </div>
</nav>
    </div>
    
    </>
  )
}
