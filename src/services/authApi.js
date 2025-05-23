



  const baseAPI = "https://giveummahbackend.onrender.com/";
       const token = localStorage.getItem("token");
 export async function registerService(formData) {
  try {
    const res = await fetch(`${baseAPI}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Register error:", err);
    return null;
  }
}
 export async function loginUser(formData) {
  try {
    const res = await fetch(`${baseAPI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); 
    console.log("Token:", data.data.token);
   
   if (data.data.token) {
      localStorage.setItem("token", data.data.token);
    }
   return data; 
  } catch (err) {
    console.error("Login Error:", err);
    return null;
  }
}

// check login user
export async function getAuthenticatedUser() {
  try {
 

    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }

    const res = await fetch(`${baseAPI}/auth/check-auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
      },
    });

    const data = await res.json();
    if (data.success) {
      console.log("Authenticated user:", data.data.user);
      return data.data.user; // return user data
    } else {
      console.warn("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Error checking auth:", error);
    return null;
  }
}


export async function updateUser(formData){
  try {
    const res=await fetch (`${baseAPI}/auth/update-user`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body:JSON.stringify(formData)

    })
    const data=await res.json();
    if(data.success){
      console.log("User updated successfully:", data.data.user);
      return data; // return user data
    }else{
      console.log("User update failed");
      return data.err;
    }
  } catch (error) {
    console.log(error);
    
  }
}

