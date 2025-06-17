"use client"

import { useContext, useEffect, useState } from "react"
import { Home, ListOrdered, User, DollarSign, LogOut, ChevronDown, Info, Menu, Heart, X, Upload, ImageIcon, Trash, Save, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner";
import { Navbar } from "@/components/header/Navbar"
import { AuthContext } from "@/context/auth-context"
import { getAuthenticatedUser } from "@/services/authApi"
import { Link } from "react-router-dom"
import UpperPage from "@/components/upperpage/UpperPage"
import { uploadFile } from "@/services/uploadImg"


export default function Dashboard() {
  const { userCampaignData } = useContext(AuthContext)
  const { userData, updateHandleUser, Toaster, updateUserFormdata, handleChangeUpdateUserFormdata, setUpdateUserFormdata, setActiveSection,
    activeSection, setUserData, uploadingHero, setUploadingHero ,uploadingHero,setUploadingHero} = useContext(AuthContext)



  // edit function 


  const [showEditModal, setShowEditModal] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [editedItem, setEditedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [uploadingHero, setUploadingHero] = useState(false)
  const [givenAmountFormdata, setGivenAmountFormdata] = useState({
    amount: "",
    headline: "",
    subHeadline: "",
  })
  const [updatesFormdata, setUpdatesFormdata] = useState({
    story: "",
    images: [],
    videoUrl: "",
  })

  const funded = 25000 // Replace with actual funded amount calculation

  const handleManageClick = (campaign, e) => {
    e.preventDefault()
    e.stopPropagation()
    setEditedItem({ ...campaign })
    setShowEditModal(true)
    setActiveTab("basic")
  }

  const handleInputChange = (field, value) => {
    setEditedItem((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setEditedItem((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }))
  }

  const handleStoryChange = (value) => {
    setEditedItem((prev) => ({
      ...prev,
      story: value,
    }))
  }

  const handleChangenGivenAmount = (field, value) => {
    setGivenAmountFormdata((prev) => ({
      ...prev,
      [field]: value,
    }))
  }





  const handleChangenUpdates = async (e) => {
    // If files exist (image upload)
    const { name, value, files } = e.target
   try {
     if (files && files.length > 0) {
      setUploadingHero(true)
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const uploadedUrl = await uploadFile(files[i]); // 👈 Your file upload function
        uploadedUrls.push(uploadedUrl);
      }

      setUpdatesFormdata((prevData) => ({
        ...prevData,
        [name]: files.length === 1 ? uploadedUrls[0] : uploadedUrls,
      }));
    } else {
      setUpdatesFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
   } catch (error) {
    console.log(error);
    
   }finally{
    setUploadingHero(false)
   }
  }

  const handleAddGivenAmount = () => {
    if (!givenAmountFormdata.amount || !givenAmountFormdata.headline) {
      alert("Please fill in amount and headline")
      return
    }

    const newGivenAmount = {
      _id: Date.now().toString(), // Temporary ID for new items
      ...givenAmountFormdata,
    }

    setEditedItem((prev) => ({
      ...prev,
      givenAmount: [...(prev.givenAmount || []), newGivenAmount],
    }))

    // Reset form
    setGivenAmountFormdata({
      amount: "",
      headline: "",
      subHeadline: "",
    })
  }


  const handleAddUpadte = () => {
    if (!updatesFormdata.story || !updatesFormdata.images) {
      alert("Please fill in story and images")
      return
    }

    const newUpdate = {
      _id: Date.now().toString(), // Temporary ID for new items
      ...updatesFormdata,
    }

    setEditedItem((prev) => ({
      ...prev,
      updates: [...(prev.updates || []), newUpdate],
    }))

    // Reset form
    setUpdatesFormdata({
      story: "",
      images: [],
      videoUrl: "",
    })
  }

  console.log(updatesFormdata);

  const handleDeleteGivenAmount = (campaignId, updateId) => {
    setEditedItem((prev) => ({
      ...prev,
      givenAmount: prev.givenAmount.filter((item) => item._id !== updateId),
    }))
  }

  const handleDeleteUpdates = (campaignId, updateId) => {
    setEditedItem((prev) => ({
      ...prev,
      updates: prev.updates.filter((item) => item._id !== updateId),
    }))
  }
  const handleImageUpload = (field, e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real application, you would upload these files to your server
    // For now, we'll just create object URLs for preview
    if (field === "supportingDocumentsUrl") {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file))
      setEditedItem((prev) => ({
        ...prev,
        supportingDocumentsUrl: [...(prev.supportingDocumentsUrl || []), ...newUrls],
      }))
    } else {
      const url = URL.createObjectURL(files[0])
      setEditedItem((prev) => ({
        ...prev,
        [field]: url,
      }))
    }
  }

  const handleSaveEdit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://give-v59n.onrender.com/v1/api/update-campaigns/${editedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      })

      if (response.ok) {
        alert("Campaign updated successfully!")
        setShowEditModal(false)
        // Here you would typically refresh your data
        // For example: fetchCampaigns();
      } else {
        const errorData = await response.json()
        alert(`Failed to update campaign: ${errorData.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error updating campaign:", error)
      alert(`Error updating campaign: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }
  // end function
  //  console.log(userCampaignData);



  const [hoveredCard, setHoveredCard] = useState(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const currentDate = new Date()

  // Format the date as "Tuesday, May 20, 2025"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })




  // Mock user data
  const userDonationData = {
    name: "Ahmad Raza",
    email: "razaira01@gmail.com",
    organization: "Ahmad Raza's Organization",
    orgId: "#71580",
    country: "IN",
    currency: "INR",
    totalRaised: "₹0.00",
    dateRange: "Apr 21 to May 20, IST",
    mobile: "08207869386",
  }
  const [progress, setProgress] = useState(3)
  useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 4)
    return () => clearTimeout(timer)
  }, [])

  // const allCampaigns = [
  //     {
  //       id: 1,
  //       aadharImageUrl: "https://pmedia.launchgood.com/261067/urgent_need_for_a_field_hospital_for_palestinian_patients_RADS%201446%20Cover%20Image%20-%202025-05-17T040928.885-493x370.png",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "MATW Project",
  //       tagline: "Give Qurbani in Gaza and Around the World",
  //       goalAmount: 98,
  //       daysLeft: 54,
  //       raised: 4555,
  //       goal: 13000,
  //       isZakatVerified: false,
  //     },
  //     {
  //       id: 2,
  //       aadharImageUrl: "https://pmedia.launchgood.com/307480/give_qurbani_for_orphans_widows__displaced_in_syria__lebanon_IMG_5565-555x370.JPG",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Aldar Waqf City",
  //       tagline: "Provide Housing for Displaced Orphans and Widows in Syria",
  //       goalAmount: 623,
  //       daysLeft: 42,
  //       raised: 14522,
  //       goal: 50000,
  //       isZakatVerified: true,
  //     },
  //     {
  //       id: 3,
  //       aadharImageUrl: "https://launchgood.s3.amazonaws.com/sponsor/14938/qurbani_to_gaza_and_beyond_with_matw_project_1000753009-493x370.jpg",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "The Noor Project",
  //       tagline: "Provide Meals & Life Essentials to Orphans in Pakistan",
  //       goalAmount: 1231,
  //       daysLeft: 164,
  //       raised: 49950,
  //       goal: 70000,
  //       isZakatVerified: true,
  //     },
  //     {
  //       id: 4,
  //       aadharImageUrl: "https://pmedia.launchgood.com/307292/qurbani_for_gaza_hope_with_every_sacrifice_WhatsApp%20Image%202025-05-13%20at%2017.19.55-493x370.jpeg",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Islamic Relief",
  //       tagline: "Emergency Response: Flood Relief in Bangladesh",
  //       goalAmount: 845,
  //       daysLeft: 21,
  //       raised: 32500,
  //       goal: 60000,
  //       isZakatVerified: true,
  //     },
  //     {
  //       id: 5,
  //       aadharImageUrl: "https://pmedia.launchgood.com/262319/mothers_and_newborns_at_risk_in_syria_RADS%201446%20Cover%20Image%20-%202025-05-17T043631.564-493x370.png",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Charity Water",
  //       tagline: "Clean Water Wells for Communities in Somalia",
  //       goalAmount: 1567,
  //       daysLeft: 78,
  //       raised: 87300,
  //       goal: 100000,
  //       isZakatVerified: false,
  //     },
  //     {
  //       id: 6,
  //       aadharImageUrl: "https://pmedia.launchgood.com/307099/water_for_sindh_pakistan_LG%20B%201-1-493x370.jpg",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Penny Appeal",
  //       tagline: "Build a School for Orphans in Yemen",
  //       goalAmount: 732,
  //       daysLeft: 112,
  //       raised: 65800,
  //       goal: 120000,
  //       isZakatVerified: true,
  //     },
  //     {
  //       id: 7,
  //       aadharImageUrl: "https://pmedia.launchgood.com/257719/sponsor_100_palestinian__lebanese_orphans_1446%20Cover%20Images%20%2860%29-493x370.png",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Human Appeal",
  //       tagline: "Winter Emergency: Warm Clothing for Refugees",
  //       goalAmount: 421,
  //       daysLeft: 35,
  //       raised: 18750,
  //       goal: 40000,
  //       isZakatVerified: true,
  //     },
  //     {
  //       id: 8,
  //       aadharImageUrl: "https://pmedia.launchgood.com/260675/support_free_education_for_syrias_forgotten_children_DJI_0628-490x370.JPG",
  //       logo: "/placeholder.svg?height=40&width=40",
  //       fundType: "Muslim Hands",
  //       tagline: "Feed the Fasting: Ramadan Food Packages",
  //       goalAmount: 1893,
  //       daysLeft: 15,
  //       raised: 93400,
  //       goal: 150000,
  //       isZakatVerified: true,
  //     },
  //   ]

  // Mock donations data
  const donations = [
    {
      id: 1,
      fundraiser: "Education for Children",
      amount: "₹100",
      date: "May 15, 2025",
      status: "Completed",
    },
    {
      id: 2,
      fundraiser: "Clean Water Initiative",
      amount: "₹50",
      date: "May 10, 2025",
      status: "Completed",
    },
    {
      id: 3,
      fundraiser: "Medical Supplies Drive",
      amount: "₹75",
      date: "May 5, 2025",
      status: "Completed",
    },
  ]

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
    })
    // In a real app, you would handle actual logout logic here
  }




  return (
    <>
      {/* <UpperPage/> */}
      <Toaster
        position="top-center"

      />
      <Navbar position={"fixed bg-[whitesmoke]"} />
      <div className="flex min-h-screen bg-background ">
        {/* Organization Selector */}
        {/* <div className={`fixed top-14 ${isDropdownOpen ? "block" : "hidden"} right-0 p-4 bg-muted/40 border-b z-10`}>
      
      </div> */}

        {/* Sidebar */}
        <div className={`fixed top-[120px] md:top-[80px] ${isDropdownOpen ? "-left-48" : "-left-0"} transition-all  bottom-0 w-64 border-r bg-background `}>
          <div className=" absolute top-10 md:top-5 right-5 z-30" onClick={(e) => setIsDropdownOpen(!isDropdownOpen)}>
            <Menu />
          </div>
          <div className="space-y-1 p-4 mt-8">
            <Button
              variant={activeSection === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start font-medium focus:bg-gray-200"
              onClick={() => setActiveSection("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeSection === "fundraisers" ? "default" : "ghost"}
              className="w-full justify-start focus:bg-gray-200"
              onClick={() => setActiveSection("fundraisers")}
            >
              <ListOrdered className="mr-2 h-4 w-4" />
              Fundraisers
            </Button>
            <Button
              variant={activeSection === "profile" ? "default" : "ghost"}
              className="w-full justify-start focus:bg-gray-200"
              onClick={() => setActiveSection("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              My Profile
            </Button>
            <Button
              variant={activeSection === "donations" ? "default" : "ghost"}
              className="w-full justify-start focus:bg-gray-200"
              onClick={() => setActiveSection("donations")}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Donations
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 "
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

        </div>

        {/* Main Content */}
        <div className={`${isDropdownOpen ? "ml-15" : "ml-70"}  pt-[120px] md:pt-[80px] flex-1 p-6`}>
          <div className="">
            {/* Dashboard Section */}
            {activeSection === "dashboard" && (
              <>
                {/* Date and Welcome */}
                <div className="my-10">
                  <div className="text-sm text-muted-foreground">
                    {formattedDate}
                  </div>
                  <h1 className="text-4xl font-bold mt-2">Welcome back!</h1>
                </div>



                {/* Funds Raised */}
                {/* <div className="my-20">
                <h2 className="text-2xl font-bold">
                  {userDonationData.totalRaised} {userDonationData.currency}
                </h2>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Gross funds raised</span>
                  <span className="mx-2">·</span>
                  <span>{userDonationData.dateRange}</span>
                </div>
              </div> */}
                <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto my-32 lg:my-0">


                  <div id="profile"
                    className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

                    {userData.RegisteredType == "Institute" ?
                      <>
                        <div className="p-4 md:p-12 text-center lg:text-left">

                          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                            style={{ backgroundImage: ` ${userData.profileImage ? `url(${userData.profileImage})` : "url(./assets/user.jpg)"}` }}></div>

                          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.instituteName ? userData.instituteName : "Institute Name"}</h1>
                          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20">
                              <path
                                d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                            </svg> {userData.instituteCategory ? userData.instituteCategory : "Institute Category"}
                          </p>
                          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20">
                              <path
                                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                            </svg> {userData.Address ? userData.Address : "Address"}
                          </p>
                          <p className="pt-8 text-sm">{userData.instituteBio ? userData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>

                          {/* <div className="pt-12 pb-8">
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
				         Get In Touch
				     </button>
                </div> */}





                        </div>
                      </>
                      :
                      <>
                        <div className="p-4 md:p-12 text-center lg:text-left">

                          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                            style={{ backgroundImage: ` ${userData.profileImage ? `url(${userData.profileImage})` : "url(./assets/user.jpg)"}` }}></div>

                          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.fullName ? userData.fullName : "Institute Name"}</h1>
                          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

                          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20">
                              <path
                                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                            </svg> {userData.Address ? userData.Address : "Address"}
                          </p>
                          <p className="pt-8 text-sm">{userData.instituteBio ? userData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>

                          {/* <div className="pt-12 pb-8">
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
				         Get In Touch
				     </button>
                </div> */}





                        </div>
                      </>
                    }


                  </div>


                  <div className="w-full lg:w-[300px] h-[340px]">
                    {/*  */}
                    <img src={`${userData.profileImage ? userData.profileImage : './assets/user.jpg'} `} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-full" />


                  </div>
                </div>





              </>
            )}

            {/* Fundraisers Section */}
            {activeSection === "fundraisers" && (
              <>
                <div className="container mx-auto px-4">
                  <div className="my-8">
                    <h1 className="text-3xl font-bold">Your Fundraisers Campaign</h1>
                    <p className="text-muted-foreground mt-2">Manage and track your fundraising campaigns</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCampaignData
                      .filter((campaign) => campaign.createdBy === userData._id)
                      .map((campaign, index) => (
                        <div
                          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                          key={index}
                        >
                          <Link to={`/campaignDetails/${campaign._id}`}>
                            <div className="relative overflow-hidden h-48">
                              <img
                                src={campaign.featureImageUrl || "/placeholder.svg"}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-bold">{campaign.fundType}</span>
                              </div>
                              <h3 className="text-lg font-semibold line-clamp-2 h-14">{campaign.campaignTitle}</h3>
                              <div className="flex justify-between text-sm text-gray-500 py-2">
                                <span>43 Donors</span>
                                <span>
                                  {Math.max(Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0)} days
                                  left
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                                <div
                                  className="bg-gradient-to-r from-[#000000] to-[#f8bb26] h-2 rounded-full"
                                  style={{ width: `${Math.min((funded / campaign.goalAmount) * 100, 100)}%` }}
                                ></div>
                              </div>

                              <div className="flex justify-between items-end mt-4">
                                <div>
                                  <p className="text-2xl font-bold">₹{campaign.goalAmount}</p>
                                  <p className="text-sm text-gray-500">funded of ₹{funded}</p>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="rounded-full px-6 py-2 text-white bg-[#fea000] hover:bg-[#e69000] transition-all duration-300"
                                  onClick={(e) => handleManageClick(campaign, e)}
                                >
                                  Manage
                                </motion.button>
                              </div>
                            </div>
                          </Link>

                          <div className="flex justify-between p-4 border-t">
                            <div className="flex gap-2">
                              <button className="p-2 rounded-full hover:bg-gray-100">
                                <Heart className="h-5 w-5" />
                              </button>
                              <button className="p-2 rounded-full hover:bg-gray-100">
                                <Share2 className="h-5 w-5" />
                              </button>
                            </div>
                            {campaign.zakatVerified && (
                              <div className="flex items-center text-[#fea000] border border-green-200 bg-green-50 px-2 py-1 rounded-full gap-1">
                                Zakat-verified
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                  />
                                  <path
                                    d="M7.75 12L10.58 14.83L16.25 9.17"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Edit Modal */}
                  {showEditModal && editedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-medium">Edit Campaign</h3>
                          <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowEditModal(false)}>
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "basic"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("basic")}
                          >
                            Basic Info
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "campaign"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("campaign")}
                          >
                            Campaign Details
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "personal"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("personal")}
                          >
                            Personal Info
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "bank"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("bank")}
                          >
                            Bank Details
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "address"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("address")}
                          >
                            Address
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "institute"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("institute")}
                          >
                            Institute Info
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "images"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("images")}
                          >
                            Images & Documents
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "given"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("given")}
                          >
                            Given Amount
                          </button>

                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "updates"
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                            onClick={() => setActiveTab("updates")}
                          >
                            New Updates
                          </button>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-6">
                          {/* Basic Info Tab */}
                          {activeTab === "basic" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zakat Verified</label>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.zakatVerified ? "true" : "false"}
                                  onChange={(e) => handleInputChange("zakatVerified", e.target.value === "true")}
                                >
                                  <option value="true">Verified</option>
                                  <option value="false">Not Verified</option>
                                </select>
                              </div>


                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.campaignTitle || ""}
                                  onChange={(e) => handleInputChange("campaignTitle", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                  type="email"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.email || ""}
                                  onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.phone || ""}
                                  onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.category || ""}
                                  onChange={(e) => handleInputChange("category", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fund Type</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.fundType || ""}
                                  onChange={(e) => handleInputChange("fundType", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Is Urgent</label>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.isUrgent ? "true" : "false"}
                                  onChange={(e) => handleInputChange("isUrgent", e.target.value === "true")}
                                >
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                  type="datetime-local"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.endDate ? new Date(editedItem.endDate).toISOString().slice(0, 16) : ""}
                                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {/* Campaign Details Tab */}
                          {activeTab === "campaign" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Amount</label>
                                <input
                                  type="number"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={
                                    typeof editedItem.goalAmount === "number"
                                      ? editedItem.goalAmount
                                      : editedItem.goalAmount?.replace(/[₹,]/g, "") || ""
                                  }
                                  onChange={(e) => handleInputChange("goalAmount", Number.parseInt(e.target.value))}
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.tagline || ""}
                                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Raising Cause</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.raisingCause || ""}
                                  onChange={(e) => handleInputChange("raisingCause", e.target.value)}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Story (HTML Content)</label>
                                <textarea
                                  rows={6}
                                  className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm"
                                  value={editedItem.story || ""}
                                  onChange={(e) => handleStoryChange(e.target.value)}
                                  placeholder="Enter HTML content from TipTap editor..."
                                />
                                <div className="mt-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                                  <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: editedItem.story || "" }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Personal Info Tab */}
                          {activeTab === "personal" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.firstName || ""}
                                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.lastName || ""}
                                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email of Imam Sahab</label>
                                <input
                                  type="email"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.emailOfImamSahab || ""}
                                  onChange={(e) => handleInputChange("emailOfImamSahab", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone of Imam Sahab</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.numberOfImamSahab || ""}
                                  onChange={(e) => handleInputChange("numberOfImamSahab", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Masjid Name</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.masjidName || ""}
                                  onChange={(e) => handleInputChange("masjidName", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {/* Bank Details Tab */}
                          {activeTab === "bank" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.bankName || ""}
                                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.ifscCode || ""}
                                  onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.accountHolderName || ""}
                                  onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.accountNumber || ""}
                                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {/* Address Tab */}
                          {activeTab === "address" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.address?.street || ""}
                                  onChange={(e) => handleNestedInputChange("address", "street", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.address?.city || ""}
                                  onChange={(e) => handleNestedInputChange("address", "city", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.address?.state || ""}
                                  onChange={(e) => handleNestedInputChange("address", "state", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.address?.pincode || editedItem.pincode || ""}
                                  onChange={(e) => handleNestedInputChange("address", "pincode", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {/* Institute Info Tab */}
                          {activeTab === "institute" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Role</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.instituteRole || ""}
                                  onChange={(e) => handleInputChange("instituteRole", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Anticipated Donations</label>
                                <input
                                  type="number"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.anticipatedDonations || ""}
                                  onChange={(e) => handleInputChange("anticipatedDonations", Number.parseInt(e.target.value))}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Spending Plans</label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={editedItem.spendingPlans || ""}
                                  onChange={(e) => handleInputChange("spendingPlans", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {/* Images & Documents Tab */}
                          {activeTab === "images" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Feature Image */}
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Feature Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  {editedItem.featureImageUrl ? (
                                    <div className="space-y-3">
                                      <img
                                        src={editedItem.featureImageUrl || "/placeholder.svg"}
                                        alt="Feature"
                                        className="w-full h-32 object-cover rounded-md"
                                      />
                                      <div className="flex gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("featureImageUrl", e)}
                                          className="hidden"
                                          id="featureImage"
                                        />
                                        <label
                                          htmlFor="featureImage"
                                          className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Replace
                                        </label>
                                        <button
                                          onClick={() => handleInputChange("featureImageUrl", "")}
                                          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="mt-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("featureImageUrl", e)}
                                          className="hidden"
                                          id="featureImage"
                                        />
                                        <label
                                          htmlFor="featureImage"
                                          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload Feature Image
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Aadhar Image */}
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Aadhar Document</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  {editedItem.aadharImageUrl ? (
                                    <div className="space-y-3">
                                      <img
                                        src={editedItem.aadharImageUrl || "/placeholder.svg"}
                                        alt="Aadhar"
                                        className="w-full h-32 object-cover rounded-md"
                                      />
                                      <div className="flex gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("aadharImageUrl", e)}
                                          className="hidden"
                                          id="aadharImage"
                                        />
                                        <label
                                          htmlFor="aadharImage"
                                          className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Replace
                                        </label>
                                        <button
                                          onClick={() => handleInputChange("aadharImageUrl", "")}
                                          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="mt-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("aadharImageUrl", e)}
                                          className="hidden"
                                          id="aadharImage"
                                        />
                                        <label
                                          htmlFor="aadharImage"
                                          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload Aadhar Document
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* PAN Image */}
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">PAN Document</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  {editedItem.panImageUrl ? (
                                    <div className="space-y-3">
                                      <img
                                        src={editedItem.panImageUrl || "/placeholder.svg"}
                                        alt="PAN"
                                        className="w-full h-32 object-cover rounded-md"
                                      />
                                      <div className="flex gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("panImageUrl", e)}
                                          className="hidden"
                                          id="panImage"
                                        />
                                        <label
                                          htmlFor="panImage"
                                          className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Replace
                                        </label>
                                        <button
                                          onClick={() => handleInputChange("panImageUrl", "")}
                                          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="mt-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("panImageUrl", e)}
                                          className="hidden"
                                          id="panImage"
                                        />
                                        <label
                                          htmlFor="panImage"
                                          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload PAN Document
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Government ID */}
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Government ID</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  {editedItem.governmentIdUrl ? (
                                    <div className="space-y-3">
                                      <img
                                        src={editedItem.governmentIdUrl || "/placeholder.svg"}
                                        alt="Government ID"
                                        className="w-full h-32 object-cover rounded-md"
                                      />
                                      <div className="flex gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("governmentIdUrl", e)}
                                          className="hidden"
                                          id="governmentId"
                                        />
                                        <label
                                          htmlFor="governmentId"
                                          className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Replace
                                        </label>
                                        <button
                                          onClick={() => handleInputChange("governmentIdUrl", "")}
                                          className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="mt-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload("governmentIdUrl", e)}
                                          className="hidden"
                                          id="governmentId"
                                        />
                                        <label
                                          htmlFor="governmentId"
                                          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload Government ID
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Supporting Documents */}
                              <div className="space-y-3 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Supporting Documents</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  {editedItem.supportingDocumentsUrl?.length > 0 ? (
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {editedItem.supportingDocumentsUrl.map((url, index) => (
                                          <div key={index} className="relative group">
                                            {url.endsWith(".pdf") ? (
                                              <div className="h-32 flex items-center justify-center bg-gray-100 rounded-md border">
                                                <span className="text-sm text-gray-500">PDF File</span>
                                              </div>
                                            ) : (
                                              <img
                                                src={url || "/placeholder.svg"}
                                                alt={`Document ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-md"
                                              />
                                            )}
                                            <button
                                              onClick={() => {
                                                setEditedItem((prev) => ({
                                                  ...prev,
                                                  supportingDocumentsUrl: prev.supportingDocumentsUrl.filter((_, i) => i !== index),
                                                }))
                                              }}
                                              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded hover:bg-red-700"
                                            >
                                              ✕
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                      <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => handleImageUpload("supportingDocumentsUrl", e)}
                                        multiple
                                        className="hidden"
                                        id="supportingDocs"
                                      />
                                      <label
                                        htmlFor="supportingDocs"
                                        className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                      >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload More
                                      </label>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="mt-2">
                                        <input
                                          type="file"
                                          accept="image/*,application/pdf"
                                          onChange={(e) => handleImageUpload("supportingDocumentsUrl", e)}
                                          multiple
                                          className="hidden"
                                          id="supportingDocs"
                                        />
                                        <label
                                          htmlFor="supportingDocs"
                                          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
                                        >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload Supporting Documents
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Given Amount Tab */}
                          {activeTab === "given" && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                  <input
                                    type="number"
                                    name="amount"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={givenAmountFormdata.amount || ""}
                                    onChange={(e) => handleChangenGivenAmount("amount", Number.parseInt(e.target.value))}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                                  <input
                                    type="text"
                                    name="headline"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={givenAmountFormdata.headline || ""}
                                    onChange={(e) => handleChangenGivenAmount("headline", e.target.value)}
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-7"></label>
                                  <button
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    onClick={handleAddGivenAmount}
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                              <div className="mt-10">
                                <div className="overflow-hidden w-full bg-white border border-gray-200 rounded-lg shadow">
                                  <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Given Amount</h3>
                                  </div>
                                  <div className="overflow-auto w-[500px] md:w-full">
                                    <div className="rounded-md border">
                                      <div className="flex justify-around bg-gray-50 p-4 font-medium">
                                        <div>Amount</div>
                                        <div>Headline</div>

                                        <div>Delete</div>
                                      </div>
                                      {editedItem.givenAmount && editedItem.givenAmount.length > 0 ? (
                                        editedItem.givenAmount.map((givenAmount, index) => (
                                          <div key={index} className="flex justify-between gap-10 p-4 border-t">
                                            <div className="w-[25%] text-center overflow-auto">{givenAmount.amount}</div>
                                            <div className="w-[25%] text-center overflow-auto">{givenAmount.headline}</div>
                                            <div className="w-[25%] text-center overflow-auto">
                                              <button
                                                className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200"
                                                onClick={() => handleDeleteGivenAmount(editedItem._id, givenAmount._id)}
                                              >
                                                <Trash className="h-3 w-3" />
                                              </button>
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <div className="p-4 text-center text-gray-500">No given amounts found</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}


                          {/*New Updates */}
                          {activeTab === "updates" && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
                                  <input
                                    type="text"
                                    name="story"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatesFormdata.story || ""}
                                    onChange={handleChangenUpdates}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                                 {uploadingHero ? (
                                  <>
                                     <Loader2 className="w-8 h-8 mb-4 text-blue-500 animate-spin" />
                                  <p className="mb-2 text-sm text-blue-600 font-semibold">Uploading ...</p>
                                  </>
                                 ):
                                 (
                                  <> <input
                                    type="file"
                                    multiple
                                    name="images"
                                    className="w-full p-2 border border-gray-300 rounded-md"

                                    onChange={handleChangenUpdates}
                                  /></>
                                 )}
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URl</label>
                                  <input
                                    type="text"
                                    name="videoUrl"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatesFormdata.videoUrl || ""}
                                    onChange={handleChangenUpdates}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-7"></label>
                                  <button
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    onClick={handleAddUpadte}
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                              <div className="mt-10">
                                <div className="overflow-hidden w-full bg-white border border-gray-200 rounded-lg shadow">
                                  <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">New Updates</h3>
                                  </div>
                                  <div className="overflow-auto w-[500px] md:w-full">
                                    <div className="rounded-md border">
                                      <div className="flex justify-around bg-gray-50 p-4 font-medium">
                                        <div>Story</div>
                                        <div>Images</div>
                                        <div>Video URL</div>
                                        <div>Delete</div>
                                      </div>
                                      {editedItem.updates && editedItem.updates.length > 0 ? (
                                        editedItem.updates.map((updates, index) => (
                                          <div key={index} className="flex justify-between gap-10 p-4 border-t">
                                            <div className="w-[25%] text-center overflow-auto">{updates.story}</div>
                                            <div className="w-[25%] text-center overflow-auto">
                                              <div className="flex items-center space-x-2">
                                                {updates.images?.map((image, imageIndex) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={image}
                                                    alt={`Image ${imageIndex}`}
                                                    className="w-16 h-12 object-cover"
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                            <div className="w-[25%] text-center overflow-auto">{updates.videoUrl}</div>
                                            <div className="w-[25%] text-center overflow-auto">

                                              <button
                                                className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 hover:bg-red-200"
                                                onClick={() => handleDeleteUpdates(editedItem._id, updates._id)}
                                              >
                                                <Trash className="h-3 w-3" />
                                              </button>
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <div className="p-4 text-center text-gray-500">No given amounts found</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end">
                          <button
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleSaveEdit}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>


              </>
            )}

            {/* Profile Section */}
            {userData.RegisteredType == "Institute"
              ?
              <>
                {activeSection === "profile" && (
                  <>
                    <div className="my-8">
                      <h1 className="text-3xl font-bold">Institute Profile</h1>
                      <p className="text-muted-foreground mt-2">Tell me about your Institute</p>
                    </div>

                    <Card>
                      <CardContent className="pt-6">
                        <form onSubmit={updateHandleUser}>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Institute Name :</Label>
                              <Input id="fullName"
                                name="instituteName"

                                value={updateUserFormdata.instituteName}
                                onChange={handleChangeUpdateUserFormdata}

                              />
                            </div>


                            <div className="space-y-2">
                              <Label htmlFor="mobile" className="flex items-center">
                                Mobile Number <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input id="mobile"
                                name="mobileNumber"

                                maxLength={10}
                                value={updateUserFormdata.mobileNumber}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>


                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="address">Institute Bio</Label>
                              <Textarea id="address" placeholder="About your Institute ..."
                                name="instituteBio"
                                value={updateUserFormdata.instituteBio}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>


                            <div className="space-y-2 ">
                              <Label htmlFor="gender" className="flex items-center">
                                Which Category best describes your Institute? <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Select defaultValue="" className=""
                                name="instituteCategory"
                                value={updateUserFormdata.instituteCategory}
                                onValueChange={(value) =>
                                  setUpdateUserFormdata({ ...updateUserFormdata, instituteCategory: value })
                                }
                              >
                                <SelectTrigger className="w-full"   >
                                  <SelectValue placeholder="- Select -" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="Madrasa" className="hover:bg-gray-200">Madrasa</SelectItem>
                                  <SelectItem value="Masjid" className="hover:bg-gray-200">Masjid</SelectItem>
                                  <SelectItem value="Trust/NGO" className="hover:bg-gray-200">Trust/NGO</SelectItem>
                                  <SelectItem value="Khankah" className="hover:bg-gray-200">Khankah</SelectItem>
                                  <SelectItem value="School" className="hover:bg-gray-200">School</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dob">Country</Label>
                              <Input id="dob" type={"input"} placeholder="Country"
                                name="Country"
                                value={updateUserFormdata.Country}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>


                            <div className="space-y-2">
                              <Label htmlFor="state" className="flex items-center">
                                State <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input type={"text"} placeholder="State"
                                name="State"
                                value={updateUserFormdata.State}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="district" className="flex items-center">
                                District <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input type={"text"} placeholder="District"
                                name="district"
                                value={updateUserFormdata.district}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="address">Address</Label>
                              <Textarea id="address" placeholder="Address (max 200 chars)"
                                name="Address"
                                value={updateUserFormdata.Address}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pincode">Pincode</Label>
                              <Input id="pincode" placeholder="Pincode (max 6 chars)"
                                name="Pincode"
                                value={updateUserFormdata.Pincode}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="panCard">website Url</Label>
                              <Input id="panCard"
                                name="websiteUrl"
                                value={updateUserFormdata.websiteUrl}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dob">Profile Image</Label>
                              {uploadingHero ? (
                                <>    <Loader2 className="w-8 h-8 mb-4 text-blue-500 animate-spin" />
                                  <p className="mb-2 text-sm text-blue-600 font-semibold">Uploading ...</p></>
                              ) : (
                                <>
                                  <Input id="dob" type={"file"}
                                    name="profileImage"

                                    onChange={handleChangeUpdateUserFormdata}
                                  />
                                </>
                              )
                              }
                            </div>
                          </div>

                          <div className="mt-6 flex justify-center">
                            <Button type="submit" className="bg-[#fea000] hover:bg-green-600 text-white" >
                              Save & Continue
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
              :
              <>
                {activeSection === "profile" && (
                  <>
                    <div className="my-8">
                      <h1 className="text-3xl font-bold">My Profile</h1>
                      <p className="text-muted-foreground mt-2">Manage your personal information</p>
                    </div>

                    <Card>
                      <CardContent className="pt-6">
                        <form onSubmit={updateHandleUser}>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name :</Label>
                              <Input id="fullName"
                                name="fullName"

                                defaultValue={userData.fullName}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email ID</Label>
                              <Input id="email" defaultValue={userData.userEmail}
                                name="userEmail"

                              />
                            </div>

                            <div className="space-y-2 ">
                              <Label htmlFor="gender" className="flex items-center">
                                Gender <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Select defaultValue="" className=""
                                name="maritalStatus"
                                value={updateUserFormdata.gender}
                                onValueChange={(value) =>
                                  setUpdateUserFormdata({ ...updateUserFormdata, gender: value })
                                }
                              >
                                <SelectTrigger className="w-full"   >
                                  <SelectValue placeholder="- Select -" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="maritalStatus">Marital Status</Label>
                              <Select defaultValue=""
                                name="State"
                                value={updateUserFormdata.maritalStatus}
                                onValueChange={(value) =>
                                  setUpdateUserFormdata({ ...updateUserFormdata, maritalStatus: value })
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="- Select -" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="single">Single</SelectItem>
                                  <SelectItem value="married">Married</SelectItem>

                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dob">Date of Birth (DD/MM/YYYY)</Label>
                              <Input id="dob" type={"date"} placeholder="DD/MM/YYYY"
                                name="dateOfBirth"
                                value={updateUserFormdata.dateOfBirth}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="mobile" className="flex items-center">
                                Mobile Number <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input id="mobile"
                                name="mobileNumber"
                                value={updateUserFormdata.mobileNumber}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="state" className="flex items-center">
                                State <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input type={"text"} placeholder="State"
                                name="State"
                                value={updateUserFormdata.State}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="district" className="flex items-center">
                                District <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input type={"text"} placeholder="District"
                                name="district"
                                value={updateUserFormdata.district}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="address">Address</Label>
                              <Textarea id="address" placeholder="Address (max 200 chars)"
                                name="Address"
                                value={updateUserFormdata.Address}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pincode">Pincode</Label>
                              <Input id="pincode" placeholder="Pincode (max 6 chars)"
                                name="Pincode"
                                value={updateUserFormdata.Pincode}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="panCard">PAN Card No.</Label>
                              <Input id="panCard"
                                name="PANCardNo"
                                value={updateUserFormdata.PANCardNo}
                                onChange={handleChangeUpdateUserFormdata}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dob">Profile Image</Label>
                              {uploadingHero ? (
                                <>    <Loader2 className="w-8 h-8 mb-4 text-blue-500 animate-spin" />
                                  <p className="mb-2 text-sm text-blue-600 font-semibold">Uploading ...</p></>
                              ) : (
                                <>
                                  <Input id="dob" type={"file"}
                                    name="profileImage"

                                    onChange={handleChangeUpdateUserFormdata}
                                  />
                                </>
                              )
                              }
                            </div>
                          </div>

                          <div className="mt-6 flex justify-center">
                            <Button type="submit" className="bg-[#fea000] hover:bg-green-600 text-white" >
                              Save & Continue
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
            }


            {/* Donations Section */}
            {activeSection === "donations" && (
              <>
                <div className="my-8">
                  <h1 className="text-3xl font-bold">Your Donations</h1>
                  <p className="text-muted-foreground mt-2">Track all your donation activities</p>
                </div>

                <Card className=" overflow-hidden w-full">
                  <CardHeader>
                    <CardTitle>Donation History</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-auto w-[500px] md:w-full" >
                    <div className="rounded-md border ">
                      <div className="grid grid-cols-5 bg-muted p-4 font-medium ">
                        <div>ID</div>
                        <div>Fundraiser</div>
                        <div>Amount</div>
                        <div>Date</div>
                        <div>Status</div>
                      </div>
                      {donations.length > 0 ? (
                        donations.map((donation) => (
                          <div key={donation.id} className="grid grid-cols-5 p-4 border-t">
                            <div>#{donation.id}</div>
                            <div>{donation.fundraiser}</div>
                            <div>{donation.amount}</div>
                            <div>{donation.date}</div>
                            <div>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {donation.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">No donations found</div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Donation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4 text-center">
                          <h3 className="text-lg font-medium">Total Donated</h3>
                          <p className="text-3xl font-bold mt-2">₹225</p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <h3 className="text-lg font-medium">Donations</h3>
                          <p className="text-3xl font-bold mt-2">{donations.length}</p>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
