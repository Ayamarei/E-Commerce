
import axios from 'axios'
import { DotLoader } from 'react-spinners'
import useCategories from '../../CustomHooks/useCategories'

export default function Categories() {
  const {data,isLoading} = useCategories()
if(isLoading){
    return <div className="loader  d-flex justify-content-center align-items-center vh-100">
    <DotLoader
        color="#000"
        size={60}
    />
</div>

}

 console.log(data);
 const categories = data?.data?.data || [];
 
    return (
        <>
               <div className='container my-4 mx-auto'>
                 <div className="row g-3">
                    {categories.map((category) => <div key={category._id} className="col-12 col-md-4 col-lg-2 ">
                        <div className="card h-75 overflow-hidden ">
                            <img className='h-75' src={category.image} alt={category.name} />
                           <div className="card-content p-3">
                           <h6 className='text-success'>{category.name}</h6>
                           </div>
                        </div>
                    </div>)} </div>
                       </div> 
        </>
    )
}


