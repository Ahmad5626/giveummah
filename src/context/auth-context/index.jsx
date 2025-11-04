
// import { useNavigate } from "react-router-dom";
import { initialSignInFormData, initialSignUpFormData, initialUpdateFormData } from "@/config";
import {
  getAuthenticatedUser,
  getData,
  loginUser,
  registerService,
  updateUser,
} from "@/services/authApi";
import getButtons from "@/services/buttons";
import { campaign, createComment, getAllCampaigns, getSingleCampaign } from "@/services/campaign";
import { createFundRequest } from "@/services/fundRequest";
import getAllInspiringInstitutes from "@/services/institutes";
import { getAllRecommendedCauses } from "@/services/recommendedCauses";
import { uploadFile } from "@/services/uploadImg";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { baseUrl } from "@/utils/Constant";
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInFormdata, setSignInFormdata] = useState(initialSignInFormData);
  const [signUpFormdata, setSignUpFormdata] = useState(initialSignUpFormData);
  const [updateUserFormdata, setUpdateUserFormdata] = useState(initialUpdateFormData);
  const [activeSection, setActiveSection] = useState("profile");
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userData, setUserData] = useState({});
  const [buttonData, setButtonData] = useState({});
  const [inspiringInstitutesData, setInspiringInstitutesData] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [userCampaignData, setUserCampaignData] = useState([]);
  const [recommendedCauses, setRecommendedCauses] = useState([]);
  const [allUserData, setAllUserData] = useState([])
  const [givingLevels, setGivingLevels] = useState([]);
  const [uploadingHero, setUploadingHero] = useState(false)
  const [loading, setLoading] = useState(false)
  const [givenAmountData, setGivenAmountData] = useState([])
  const [paymentData, setPaymentData] = useState([])

  
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

    if (files && files.length > 0) {
      const file = files[0];
      try {
        setUploadingHero(true);
        const uploadedUrl = await uploadFile(file);
        console.log("Uploaded Image URL:", uploadedUrl);
        setUpdateUserFormdata(prev => {
          const updated = {
            ...prev,
            [name]: uploadedUrl,
          };
          console.log("New Form Data:", updated);
          return updated;
        });

      } catch (error) {
        console.error("File upload failed:", error);
      }
      finally {
      setUploadingHero(false)
    }
    } else {
      setUpdateUserFormdata(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  //   check if signup form is valid
function checkIfSignUpFormIsValid() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    signUpFormdata &&
    signUpFormdata.fullName !== "" &&
    signUpFormdata.userEmail !== "" &&
    signUpFormdata.password !== "" &&
    
    passwordRegex.test(signUpFormdata.password)
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
const registerHandleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await registerService(signUpFormdata);
    console.log(result);

    if (result?.success) {
      toast.success("Registered successfully!");
      setActiveTab("signin"); // ✅ change tab after successful registration
    } else {
      toast.error(result.message || "Registration failed");
    }
  } catch (error) {
    // ✅ This handles unexpected server errors or non-JSON responses
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
  }
};

  // login form
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(signInFormdata);
   try {
     if (result?.success) {
      toast.success("Login successfully!");
      localStorage.setItem("id", result.data.user._id);

      navigator("/dashboard");
      setActiveSection("profile");
      window.location.reload();
    } else {
      toast.error(result.message || "Login failed");
      
   }
   } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
   }

  };

  // update user
  async function getUserData() {
    const userData = await getAuthenticatedUser();
    if (userData) setUserData(userData);
  }
  const updateHandleUser = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    const result = await updateUser(updateUserFormdata);
    if (result?.success) {
      toast.success("User updated successfully!");
      // console.log(resultdata);
      setActiveSection("dashboard");
      getUserData();
    }
    else {
      toast.error(result?.message || "User update failed");
      console.log(result);

    }
  }
  // get user Campaign
  async function getSingleCampaignsData() {
    const loignInstitutesData = await getAllCampaigns();
    if (loignInstitutesData) setUserCampaignData(loignInstitutesData.data);
  }

  // get all Copmaign
  async function getAllCampaignsData() {
    setLoading(true);
    const compaignData = await getAllCampaigns();
    if (compaignData) setAllCampaigns(compaignData.data);
    setLoading(false);
  }

  // get buttons data
  async function getButtonsData() {
    const data = await getButtons();
    if (data) setButtonData(data);
  }
  // get all inspiring institutes

  async function getAllInspiringInstitutesData() {
    const institutesData = await getAllInspiringInstitutes();


    if (institutesData) setInspiringInstitutesData(institutesData.data);
  }

  // get all recommended causes

  async function getRecommendedCausesData() {
    const RecommendedCauses = await getAllRecommendedCauses();


    if (RecommendedCauses) setRecommendedCauses(RecommendedCauses.data);
  }

  // get all user
  async function getLoginUserData() {
    const getAllUserData = await getData();
    if (getAllUserData) setAllUserData(getAllUserData.data);
  }

  // payment data
   const  getAllPayments= async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/api/payments/get-all-payments`)
      const data = await response.json()
// console.log(data);

      setPaymentData(data.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {


    getUserData();
    getSingleCampaignsData()
    getAllCampaignsData()
    getButtonsData()
    getAllInspiringInstitutesData()
    getRecommendedCausesData()
    getLoginUserData()
getAllPayments()

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
          firstName: "",
          lastName: "",
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
          // Only multiple here
          supportingDocumentsId: [],     // array of File objects
          supportingDocumentsUrl: [],    // array of uploaded URLs
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
          instituteName: userData.instituteName ,
          instituteBio: "",
          anticipatedDonations: "",
          spendingPlans: "",
          state: "",
          district: "",
          addressDetails: "",
          pincode: "",
        }
    }
    return {}
  })
  const navigate = useNavigate();
  const createCampaign = async (e) => {

    const result = await campaign(formData);
    if (result?.success) {

      localStorage.removeItem("campaignData");
      navigate("/dashboard");
      setActiveSection("fundraisers")
      getSingleCampaignsData()
      toast.success("Campaign created successfully!");

    }
    else {
      toast.error(result?.message || "Campaign creation failed");
    }
  }



  // console.log(allUserData);
  const handleCreateComment = async (formData, id) => {
    const data = await createComment(formData, id);
    if (data?.success) {
      console.log("Comment created successfully:", data);
      toast.success("Thanks for your comment!");
      return data; // return campaign data
    } else {
      console.warn(data);

      return data.err;
    }

    // payment 


  }

  //  console.log(updateUserFormdata);


  // fund request 
  const handleSubmitFundRequest = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    console.log(formData );
    
    const result = await createFundRequest(formData);
    if (result?.success) {
      toast.success("Fund request created successfully!");
      
    }
    else {
      toast.error(result?.message || "Fund request creation failed");
    }


      try {
      const data =await fetch(`${baseUrl}/v1/api/sendMail/send-fund-request-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSON.stringify({
            campaignName: formData.campaignType,
    creatorName:formData.name,
    fundingGoal:formData.fundingGoal,
    amountRaised:formData.amountRaised,
    requestedAmount:formData.amount,
    requestDate:(new Date()).toDateString(),
    acountNumber:formData.accountNumber,
    email: `razaira01@gmailcom`,
    
         
          
        }),
      }).then((res) => { 
        if (res.ok) {
         console.log("Email sent successfully");
         
        }
        toast.success("Message sent successfully");
      })
    } catch (error) {
      console.log(error);
      
    }
  }


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
        activeSection,
        buttonData,
        inspiringInstitutesData,
        campaignDetails,
        setCampaignDetails,
        userCampaignData,
        recommendedCauses,
        allUserData,
        handleCreateComment,
        givingLevels,
        setGivingLevels,
        loading,
        givenAmountData,
        setGivenAmountData,
        uploadingHero,
        setUploadingHero,
        handleSubmitFundRequest,
        paymentData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
