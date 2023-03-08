import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from "./scss/ProfilePage.module.scss";
const ProfilePage = () => {

  const [profile, setProfile] = useState({ fullname: "", dob: "", email:"", phone:"" });
  const navigate = useNavigate();

  const [errProfile, setErrorProfile] = useState({
    fullname: "", dob: "", email:"", phone:""
  });


  const handleChange = async (evt) => {
    const { name, value } = evt.target;
    const tempObj = { ...profile };

    setProfile({ ...tempObj, [name]: value.trim() });
  };

  const handleBlur = async (evt) => {
    const { name, value } = evt.target;
    const tempErrObj = {...errProfile};
    setErrorProfile({...tempErrObj, [name]: validation(name,value)});

  };

  const validation = (name, value) => {
    switch(name){
      case "email":{
        if(!value.trim()){
          return "Please enter your email";
        }
        else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)){
          return "Incorrect email format";
        }
        break
      }
      case "fullname": { 
        if(!value.trim()){
          return "Please enter your full name";
        }else if( /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g.test(value) ){
          return "Fullname does not allow to contain numbers or special characters";
        }
        break
      }
      case "phone": { 
        if(!value.trim()){
          return "Please enter your phone number";
        }else if( !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value) ){
          return "Incorrect phone number";
        }
        break
      }
      case "dob":{
        if(!value.trim()){
          return "Please choose your DOB";
        }
        break
      }
      default :
       return "";
    }
  };

  const handleSubmit = async (eve) => {
    eve.preventDefault();

    let validationError = {};

    for (let key in profile){
      const error = validation(key, profile[key]);
      if(error){
        validationError[key] = error;
      }
    }

    if(Object.keys(validationError).length > 0){
     await setErrorProfile(validationError);
     return;
    }

    alert("Update profile success");
    navigate('/');
    console.log(profile);
    localStorage.setItem("userProfile", JSON.stringify(profile));

  };

  return (
    <div className={style.profilePage}>
        <div className={style.formContainer}>
    <div className={style.container}>
      <form className={style.formCover}>
        <h2 className={style.headerForm}>Profile</h2>

        {/* Full name */}
        <div className={style.formControl}>
          <p className={style.formLabel}>Full name: </p>
          <input
            className={style.formInput}
            onChange={handleChange}
            onBlur={handleBlur}
            name="fullname"
            type="text"
          />
        </div>
     {errProfile.fullname && <h5 style={{color:"red"}}>{errProfile.fullname}</h5> }
        {/* Date of Birth */}
        <div className={style.formControl}>
          <p className={style.formLabel}>Date of Birth: </p>
          <input
            className={style.formInput}
            onChange={handleChange}
            onBlur={handleBlur}
            name="dob"
            type="date"
           
          />
        </div>
        {errProfile.dob && <h5 style={{color:"red"}}>{errProfile.dob}</h5> }
    
      {/* Email */}
        <div className={style.formControl}>
          <p className={style.formLabel}>Email: </p>
          <input
            className={style.formInput}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
          />
        </div>
        {errProfile.email && <h5 style={{color:"red"}}>{errProfile.email}</h5> }
    
    {/* Phone */}
     <div className={style.formControl}>
          <p className={style.formLabel}>Phone: </p>
          <input
            className={style.formInput}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone"
            type="text"
          />
        </div>
  {errProfile.phone && <h5 style={{color:"red"}}>{errProfile.phone}</h5> }  




        <button className={style.formBtn} onClick={handleSubmit}>
          Ok
        </button>
      </form>
    </div>
  </div>
    </div>
  
  )
}

export default ProfilePage