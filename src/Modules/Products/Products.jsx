import axios from 'axios'
import React, {  useState } from 'react'
import { DotLoader } from 'react-spinners'
import ProductsSlider from './ProductsSlider'
import img1 from '../../assets/images/blog-img-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import CategoriesSlider from '../Categories/CategoriesSlider'
import { useQuery } from '@tanstack/react-query'
import ProductData from './ProductData'
import { Link } from 'react-router-dom'

export default function Products() {
   const [productId, setProductId] = useState(null)
   console.log(productId);
   

    // FETCH DATA 
    const getAllProducts =  () => {
       return  axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

  const {data,isLoading} = useQuery({queryKey:"allData",
        queryFn:getAllProducts
    })

if(isLoading){
    return <div className="loader  d-flex justify-content-center align-items-center vh-100">
    <DotLoader
        color="#000"
        size={60}
    />
</div>

}
 
    return (
        <>
  <div className='container-fluid my-4'>
    {/* Slider Section */}
    <div className='row'>
      <div className="col-12 col-md-9 p-0">
        <ProductsSlider />
      </div>
      <div className="col-12 col-md-3 slider2 p-0 ">
        <img src={img1} alt="slider2" className='img-fluid rounded' />
        <img src={img2} alt="slider2" className='img-fluid rounded' />
      </div>
    </div>

    {/* Categories Slider */}
    <div className='mt-4'>
      <CategoriesSlider />
    </div>

    {/* Products Grid */}
    <div className='row g-3 mt-4'>
      {data?.data?.data.map((product) => (
        <div key={product._id} className="col-6 col-md-4 col-lg-2">
            <div className='card '>
         <Link className='text-decoration-none' to={`/products-data/${product._id}`} >
         <div className="  h-100 overflow-hidden">
            <img
              src={product.imageCover}
              alt={product.title}
              className="img-fluid"
            />
            <div className="card-body p-2">
              <h6 className='text-success'>{product?.category?.name}</h6>
              <h6 className='fw-bold'>{product?.title?.split(" ").slice(0, 2).join(" ")}</h6>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="mb-0">
                  {product.priceAfterDiscount && (
                    <span className="text-danger text-decoration-line-through mx-1">
                      {product?.price} EGP
                    </span>
                  )}
                  <span className="fw-bold">
                    {product.priceAfterDiscount || `${product?.price} EGP`}
                  </span>
                </p>
                <p className="mb-0">
                  <i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}
                </p>
              </div>
            </div>
          </div>
         </Link>
         <button className='w-100 btn btn-success'>+add to cart</button>

         </div>
         
        </div>
      ))}
    </div>
  </div>

  {productId&&<ProductData productId={productId}/>}
</>

    )
}
