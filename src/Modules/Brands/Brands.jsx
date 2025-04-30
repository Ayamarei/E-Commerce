import axios from 'axios'
import { DotLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {

    // FETCH DATA 
    const getAllBrands =  () => {
       return  axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }




  const {data, error,isFetching,isLoading,isError} = useQuery({queryKey:"allData",
        queryFn:getAllBrands
    })

if(isLoading){
    return <div className="loader  d-flex justify-content-center align-items-center vh-100">
    <DotLoader
        color="#000"
        size={60}
    />
</div>

}

 console.log(data);
 
    return (
        <>
               <div className='container my-4 mx-auto'>
                 <div className="row g-3">
                    {data.data.data.map((brand) => <div key={brand._id} className="col-12 col-md-4 col-lg-2 ">
                        <div className="card overflow-hidden ">
                            <img src={brand.image} alt={brand.name} />
                           <div className="card-content p-3">
                           <h6 className='text-success'>{brand.name}</h6>
                           </div>
                        </div>
                    </div>)} </div>
                       </div> 
        </>
    )
}

