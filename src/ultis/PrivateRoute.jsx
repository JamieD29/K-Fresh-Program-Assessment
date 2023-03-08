import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user")) ;
  const [auth, setAuth] = useState({...userObj }) ;

  if(auth.email){
    return <Outlet/>;
 }else{
   return <Navigate to='/login'/>
 }
 
}

export default PrivateRoute