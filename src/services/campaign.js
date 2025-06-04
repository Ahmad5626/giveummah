  const baseAPI = "http://localhost:9000";
 const token = localStorage.getItem("token");
  export const campaign=async(formData)=>{
    

    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }
   const res=await fetch(`${baseAPI}/v1/api/create-campaign`,({
     method:"POST",
       headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
     body:JSON.stringify(formData)

    

   }));
    const data=await res.json();
    if(data.success){
      console.log("Campaign created successfully:", data.data.campaign);
      return data; // return campaign data
    }else{
      console.warn("Campaign creation failed");
      return data.err;
    }
 
  }

  export const  getAllCampaigns=async()=>{
    const res=await fetch(`${baseAPI}/v1/api/get-all-campaigns`,{
      method:"GET",
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
 
  }

 export const getSingleCampaign=async()=>{
    const res=await fetch(`${baseAPI}/v1/api/get-login-user-campaigns`,{
      method:"GET",
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    const data=await res.json();
    if(data.success){
      // console.log("Campaigns fetched successfully:", data.data.campaigns);
      return data; // return campaign data
    }else{
      console.warn("Campaign fetch failed");
      return data.err;
    }
 
  }

  export const createComment=async(formData,id)=>{
 try {
     const response =await fetch(`${baseAPI}/v1/api/create-comment/${id}`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        
      },
      body:JSON.stringify(formData)
     })
     const data=await response.json();
     if(data.success){
      console.log("Comment created successfully:", data.data.comment);
      return data; // return campaign data
    }else{
      console.warn("Comment creation failed");
      return data.err;
    }
 } catch (error) {
  return error
 }
  }