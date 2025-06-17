import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
// import jwtDecode from "jwt-decode";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  

  return (
 <>
 <Toaster  position="top-center"/>
     <GoogleOAuthProvider clientId="997164635674-7u4c5gel97v61hkmq30jmikv3tbea7e9.apps.googleusercontent.com">
      <GoogleLogin
  onSuccess={(credentialResponse) => {
    fetch("https://give-v59n.onrender.com/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: credentialResponse.credential, // ✅ ye hi tokenID hai
      }),
    })
      .then(res => res.json())
      .then((data) =>{
        console.log("Logged in user:", data);
        toast.success("Login successfully!");
        localStorage.setItem("token", data.token);
        navigate("/dashboard")
        window.location.reload(); 
      } )
      .catch(err => console.log("Login failed:", err));
  }}
  onError={() => {
    console.log("Login Failed");
  }}
/>
    </GoogleOAuthProvider>
 </>
  );
};

export default GoogleLoginButton;