import React, { useEffect } from 'react'
import {useAuthState } from "react-firebase-hooks/auth"
 import "./style.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import userSvg from "../../assets/user.svg"
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    }
  },[user,loading]);  
  const logoutFnc=()=>{
       try{
        signOut(auth).then(() => {
          toast.success("Logged-out successfully!")
        navigate("/");
          // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        toast.error(error.message)
        })
       }
       catch(e){
toast.error(e.message);
       }
    }
  return ( 
    <div className='navbar'>
        <p className='logo'>Financely.</p>
     {user && <p 
      className='logo-link'
       onClick={logoutFnc}>      
            <img 
            src={user.photoURL ? user.photoURL : userSvg}
            style={{borderRadius:"50%",height:"1.5rem",width:"1.5rem"}}
            />
            <span>Logout</span>
            </p>
            }   
    </div>
  );
}
 
export default Header;





