import React from 'react'
import errImg from "../../../assets/images/error.svg"

export default function NotFound() {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center  vh-100'>
      <img src={errImg} alt="errImg" />
    </div>
    </>
  )
}
