import { useEffect } from "react";
import { baseUrl } from "@/utils/Constant";
const FacebookLoginBtn = () => {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2575661042771060", // ✅ Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
    };

    // Optional: Load FB SDK if not loaded by index.html
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      alert("Facebook SDK not loaded. Please refresh and try again.");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          // Send token to your backend
          fetch( `${baseUrl}/auth/facebook-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token) {
                console.log("✅ Login success:", data);
                // Save token in localStorage or context
                localStorage.setItem("token", data.token);
              } else {
                console.log("❌ Server error:", data.message);
              }
            })
            .catch((err) => console.error("❌ Login Failed:", err));
        } else {
          console.log("❌ User cancelled login or did not authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      style={{
        
        
        border: "none",
        cursor: "pointer",
      }}
    >
      Login with Facebook
    </button>
  );
};

export default FacebookLoginBtn;