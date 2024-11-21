import axios from "axios";
import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

function Logout() {

  const  [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try{
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout successfull")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch(error) {
      console.log("Error: ", error);
      toast.error("error in logging out");
    }
    
  }

  return (
    <div className="h-[10vh] bg-slate-800">
      <div>
        <TbLogout2 className="text-5xl text-white hover:bg-slate-700 duration-200 cursor-pointer rounded-full p-2 ml-2 mt-1"
        onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
