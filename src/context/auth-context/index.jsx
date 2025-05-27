
// import { useNavigate } from "react-router-dom";
import { initialSignInFormData, initialSignUpFormData,initialUpdateFormData } from "@/config";
import {
  getAuthenticatedUser,
  loginUser,
  registerService,
  updateUser,
} from "@/services/authApi";
import { campaign, getAllCampaigns } from "@/services/campaign";
import { uploadFile } from "@/services/uploadImg";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInFormdata, setSignInFormdata] = useState(initialSignInFormData);
  const [signUpFormdata, setSignUpFormdata] = useState(initialSignUpFormData);
  const [updateUserFormdata, setUpdateUserFormdata] = useState(initialUpdateFormData);
  const [activeSection, setActiveSection] = useState("dashboard")
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userData, setUserData] = useState({});
const navigator = useNavigate();
  // change signup form data
  function handleChangeSignUpFormdata(e) {
    const { name, value } = e.target;
    setSignUpFormdata({ ...signUpFormdata, [name]: value });
  }

  // change signin form data
  function handleChangeSignInFormdata(e) {
    const { name, value } = e.target;
    setSignInFormdata({ ...signInFormdata, [name]: value });
  }
  // change update user data
async function handleChangeUpdateUserFormdata(e) {
  const { name, value, files } = e.target;

  if (files && files[0]) {
    const file = files[0];
    const uploadedUrl = await uploadFile(file);

    setUpdateUserFormdata({
      ...updateUserFormdata,
      [name]: uploadedUrl,
    });
  } else {
    setUpdateUserFormdata({
      ...updateUserFormdata,
      [name]: value,
    });
  }
}

  //   check if signup form is valid
  function checkIfSignUpFormIsValid() {
    return (
      signUpFormdata &&
      signUpFormdata.fullName !== "" &&
      signUpFormdata.userEmail !== "" &&
      signUpFormdata.password !== ""
    );
  }

  //   check if signin form is valid
  function checkIfSignInFormIsValid() {
    return (
      signInFormdata &&
      signInFormdata.email !== "" &&
      signInFormdata.password !== ""
    );
  }

  //   sumbit register form
  const registerHandleSubmit = async(e) => {
    e.preventDefault();
    const result =await registerService(signUpFormdata);
    

    if (result?.success) {
      toast.success("Registered successfully!");
      setActiveTab("signin"); // ✅ change tab after successful registration
     
    } else {
      toast.error(result?.message || "Registration failed");
    }
  };

  // login form
  const loginHandleSubmit = async(e) => {
    e.preventDefault();
   const result = await loginUser(signInFormdata);
   if(result?.success){
    toast.success("Login successfully!");
   localStorage.setItem("id", result.data.user._id);
  
    navigator("/");
    window.location.reload();
   } else{
    toast.error(result?.message || "Login failed");
   }
  };

  // update user
const updateHandleUser =async(e)=>{
  e.preventDefault();
  const id = localStorage.getItem("id");
  const result = await updateUser(updateUserFormdata);
  if(result?.success){
    toast.success("User updated successfully!");
    // console.log(resultdata);
    setActiveSection("dashboard");
  }
  else{
    toast.error(result?.message || "User update failed");
    console.log(result);
    
  }
}
  // get login user Data
  useEffect(() => {
    (async () => {
      const userData = await getAuthenticatedUser();
      if (userData) setUserData(userData);
    })();

    (async () => {
      const compaignData = await getAllCampaigns();
      if (compaignData) setAllCampaigns(compaignData.data);
    })();
  }, []);
 
  


  const [formData, setFormData] = useState(() => {
      if (typeof window !== "undefined") {
        const savedData = localStorage.getItem("campaignData")
        return savedData
          ? JSON.parse(savedData)
          : {
              // Step 1
              fundType: "",
              
              // Step 2
              goalAmount: "",
              campaignTitle: "",
              // Step 3
              featureImage: null,
              featureImageUrl: "", // For preview
              tagline: "",
              category: "",
              location: "",
              endDate: "",
              // Step 4
              story: "",
              zakatVerified: false,
              // Step 5
              agreeAll: false,
              agreePrivacy: false,
              agreeTerms: false,
              agreePayment: false,
              isUrgent: false,
              // Step 6 - Personal Info
              email: "",
              givenName: "",
              familyName: "",
              dateOfBirth: {
                day: "",
                month: "",
                year: "",
              },
              phone: "",
              address: {
                country: "India",
                street: "",
                city: "",
                state: "",
                district: "",
                postalCode: "",
              },
              governmentId: null,
              governmentIdUrl: "", // For preview
              // Bank Info
              accountHolderName: "",
              accountNumber: "",
              bankName: "",
              ifscCode: "",
              // Documents
              aadharImage: null,
              aadharImageUrl: "", // For preview
              panImage: null,
              panImageUrl: "", // For preview
              // Step 6 - References
              masjidName: "",
              nameOfImamSahab: "",
              numberOfImamSahab: "",
              emailOfImamSahab: "",
              beneficiaryDateOfBirth: "",
              gender: "",
              maritalStatus: "",
              emailId: "",
              mobileNumber: "",
              state: "",
              district: "",
              addressDetails: "",
              pincode: "",
            }
      }
      return {}
    })

   const createCampaign =async(e)=> {
  
     const result = await campaign(formData);
     if(result?.success){
      
      localStorage.removeItem("campaignData");
      window.location.reload();
      toast.success("Campaign created successfully!");
      
     }
     else{
      toast.error(result?.message || "Campaign creation failed");
     }
    }



  console.log(userData);
  
  
  return (
    <AuthContext.Provider
      value={{
        signInFormdata,
        setSignInFormdata,
        signUpFormdata,
        setSignUpFormdata,
        handleChangeSignUpFormdata,
        handleChangeSignInFormdata,
        checkIfSignUpFormIsValid,
        checkIfSignInFormIsValid,
        registerHandleSubmit,
        loginHandleSubmit,
        setUserData,
        Toaster,
        toast,
        userData,
        activeTab,
        setActiveTab,
        formData,
        setFormData,
        createCampaign,
        allCampaigns,
        updateUserFormdata,
        setUpdateUserFormdata,
        handleChangeUpdateUserFormdata,
        updateHandleUser,
        setActiveSection,
        activeSection
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
