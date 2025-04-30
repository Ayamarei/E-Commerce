import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import NotFound from './Modules/Authentication/NotFound/NotFound'
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout'
import { Bounce, ToastContainer } from 'react-toastify'
import AuthContextProvider from './Modules/Context/AuthContext'
import Brands from './Modules/Brands/Brands'
import Categories from './Modules/Categories/Categories'
import Products from './Modules/Products/Products'
import ProtectedRoutes from './Modules/Shared/ProtectedRoutes/ProtectedRoutes'
import Cart from './Modules/Cart/Cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductData from './Modules/Products/ProductData'
import CartContextProvider from './Context/CartContext/CartContext'

export default function App() {
 const  QueryClientConfig =new QueryClient()

 const router= createHashRouter([
    {path:"",element: <MasterLayout/>,children:[
      {path:"",element:<Login/>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes> },
      {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>  },
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>  },
      {path:"products-data/:id",element:<ProtectedRoutes><ProductData/></ProtectedRoutes>  },
      {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes> },
      {path:"*",element:<NotFound/>}
    ]},
   
  ])
  return (
    <>
    <AuthContextProvider>
      <QueryClientProvider client={QueryClientConfig}>
        <CartContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </CartContextProvider>
    </QueryClientProvider>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Bounce}/>
     </AuthContextProvider>

</>
    
  )
}
