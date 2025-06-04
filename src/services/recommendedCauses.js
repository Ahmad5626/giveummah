const baseAPI="http://localhost:9000";

export const getAllRecommendedCauses=async()=>{
 try {
    const res=await fetch(`${baseAPI}/v1/api/recommendedCauses/get-recommended-couses`,{
     method:"GET",
     headers:{
       "Content-Type": "application/json",
     }
    })
    const data=await res.json();
    
    return data

 } catch (error) {
    console.log(error);
    return error
    
 }
}