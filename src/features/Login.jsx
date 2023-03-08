import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./scss/Login.module.scss";
import 'animate.css';
const Login = () => {

  const users = [{
    email:"abc@gmail.com",
    password:"123456789"
  },{
    email:"xyz@gmail.com",
    password:"123456789"
  },{
    email:"tester1@gmail.com",
    password:"123456789"
  },{
    email:"tester2@gmail.com",
    password:"123456789"
  },{
    email:"tester3@gmail.com",
    password:"123456789"
  }];

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (evt) => {
    const { name, value } = evt.target;

    const tempObj = { ...userLogin };

    setUserLogin({ ...tempObj, [name]: value.trim() });
  };

  const handleBlur = async (evt) => {
    const { name, value } = evt.target;
    const tempErrObj = {...loginError};
    setLoginError({...tempErrObj, [name]: validation(name,value)});

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
      case "password": { 
        if(!value.trim()){
          return "Please enter your password";
        }else if( value.length < 8 ){
          return "Password has at least 8 characters";
        }
        break
      }
      default :
       return "";
    }
  };

  const showPassword = () => {
    if (password === "text") {
      setPassword("password");
    } else {
      setPassword("text");
    }
  };


  const handleSubmit = async (eve) => {
    eve.preventDefault();

    let validationError = {};

    for (let key in userLogin){
      const error = validation(key, userLogin[key]);
      if(error){
        validationError[key] = error;
      }
    }

    if(Object.keys(validationError).length > 0){
     await setLoginError(validationError);
     return;
    }

    for(let user of users){
      if(user.email === userLogin.email && user.password === userLogin.password){
        alert("Login Success");
        navigate('/profile');
        localStorage.setItem("user", JSON.stringify(userLogin));
        return;
      }
    }

    alert("Your email or your password is not incorrect")
   

  };


 
  useEffect(()=>{
    const userObj = JSON.parse(localStorage.getItem("user")) ;
    if(userObj?.email){
      navigate('/')
   }else{
     navigate('/login');
   }
  },[]);

  console.log(loginError);
  return (
    <div className={`${style.formContainer}`}>
      <div className={`${style.container} `}>
        <form className={`${style.loginFormCover}  `}>
          <h2 className={style.headerForm}>Login</h2>

          {/* email */}
          <div className={style.formControl}>
            <p className={style.formLabel}>Email: </p>
            <input
              className={style.formInput}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type="text"
            />
          </div>
       {loginError.email && <h5 style={{color:"red"}}>{loginError.email}</h5> }
          {/* Password */}
          <div className={style.formControl}>
            <p className={style.formLabel}>Password: </p>
            <input
              className={style.formInput}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type={password}
            />
          </div>
          {loginError.password && <h5 style={{color:"red"}}>{loginError.password}</h5> }
          {/* Show password */}
          <div className={style.checkBoxControl}>
            <input
              type="checkbox"
              className={style.checkBox}
              onClick={showPassword}
            />
            <label className={style.checkBoxLabel}>Show password</label>
          </div>

          <button className={style.formBtn} onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
