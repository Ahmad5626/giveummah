import { baseUrl } from "@/utils/Constant";

const getAllInspiringInstitutes=async()=>{
 try {
    const res=await fetch(`${baseUrl}/v1/api/inspiringInstitutes/get-inspiring-institutes`,{
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
export default getAllInspiringInstitutes