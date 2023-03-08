import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./scss/Home.module.scss";
const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userObj = JSON?.parse(localStorage.getItem("userProfile"));
    if(!userObj){
      navigate("/profile");
    }else{
      setName(userObj.fullname);
    }
    
  }, []);


  return (
    <div className={style.welcome}>
      <div className={style.container}>
        <div className={style.details}>
          <h2 className={style.welcomeScript}>
            Welcome, <b>{name}</b>
          </h2>
          <button
            className={style.btnLogOut}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("userProfile");
              if (window.confirm("Do you really wanna logout?")) {
                navigate("/login");
              } else {
                return;
              }
              
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
