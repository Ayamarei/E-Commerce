import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { DotLoader } from 'react-spinners'

export default function ProductData({productId}) {


   const{id} =  useParams()

        // FETCH DATA 
        const getProductData =  () => {
            return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
         }
     
       const {data,isLoading} = useQuery({queryKey:["ProductData",id],
             queryFn:getProductData
         })
     
     if(isLoading){
         return <div className="loader  d-flex justify-content-center align-items-center vh-100">
         <DotLoader
             color="#000"
             size={60}
         />
     </div>
     
     }

     const product =data?.data?.data
     console.log(product);
     
  return (
    <>
        <div className='container'>
            <div className="row g-3 vh-100 align-items-center">
                <div className="col-md-3">
                <img className='w-100' src={product.imageCover} alt={product.title} />
                </div>
                <div className="col-md-9">
                <h1>{product.title} </h1>
                <p>{product.description} </p>
                <p>Price: {product.price} </p>
                <button className='w-100 btn btn-success'>+add to cart</button>
                </div>
            </div>
          
           
        </div>
    </>
  )
}
