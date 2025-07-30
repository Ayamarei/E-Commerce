import axios from 'axios'
import  { createContext, useState } from 'react'

 export const CartContext=  createContext()

export default function CartContextProvider({children}) {

  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [allProduct, setAllProduct] = useState(null)
  // console.log("allProduct",allProduct);
  

   const addToCard =async(productId)=>{
   return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
      productId:productId
    },{
      headers:{token:localStorage.getItem("tkn")}
    }).then((response)=>{
      console.log(response);
      // setNumOfCartItems(response.data.numOfCartItems)
      // setTotalCartPrice(response.data.data.totalCartPrice)
      // setAllProduct(response.data.data.products)
        getUserCard()
      return true
      
    }).catch((error)=>{
      console.log(error);
      return false
      
    })
  }

   const getUserCard =async()=>{
   return  axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      
      headers:{token:localStorage.getItem("tkn")}
    }).then((response)=>{
      // console.log(response);
      setNumOfCartItems(response.data.numOfCartItems)
      setTotalCartPrice(response.data.data.totalCartPrice)
      setAllProduct(response.data.data.products)
      return true
      
    }).catch((error)=>{
      console.log(error);
      return false
      
    })
  }

    const updateCount =async(productId,newCount)=>{
   return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      "count":newCount
    },{
      headers:{token:localStorage.getItem("tkn")}
    }).then((response)=>{
      console.log(response);
      setNumOfCartItems(response.data.numOfCartItems)
      setTotalCartPrice(response.data.data.totalCartPrice)
      setAllProduct(response.data.data.products)
      return true
      
    }).catch((error)=>{
      console.log(error);
      return false
      
    })
  }
    const deleteProduct =async(productId)=>{
   return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers:{token:localStorage.getItem("tkn")}
    }).then((response)=>{
      console.log(response);
      setNumOfCartItems(response.data.numOfCartItems)
      setTotalCartPrice(response.data.data.totalCartPrice)
      setAllProduct(response.data.data.products)
      return true
      
    }).catch((error)=>{
      console.log(error);
      return false
      
    })
  }

  return (
    <CartContext.Provider value={{allProduct,totalCartPrice,numOfCartItems,addToCard,getUserCard,updateCount,deleteProduct}}>
        {children}    
    </CartContext.Provider>
  )
}
