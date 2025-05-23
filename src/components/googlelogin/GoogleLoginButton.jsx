import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async (credentialResponse) => {
    const credential = credentialResponse.credential;

    try {
      // Send credential to backend
      const res = await fetch("https://giveummahbackend.onrender.com//api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();
      console.log("Logged in user:", data);

      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="your_google_client_id">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          alert("Google Sign In was unsuccessful.");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;