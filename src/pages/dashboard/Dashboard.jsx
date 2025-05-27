"use client"

import { useContext, useEffect, useState } from "react"
import { Home, ListOrdered, User, DollarSign, LogOut, ChevronDown, Info, Menu } from "lucide-react"
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


export default function Dashboard() {
 const {userData,updateHandleUser,Toaster,updateUserFormdata,handleChangeUpdateUserFormdata,setUpdateUserFormdata,setActiveSection,
  activeSection,setUserData } = useContext(AuthContext)
 


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

const allCampaigns = [
    {
      id: 1,
      aadharImageUrl: "https://pmedia.launchgood.com/261067/urgent_need_for_a_field_hospital_for_palestinian_patients_RADS%201446%20Cover%20Image%20-%202025-05-17T040928.885-493x370.png",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "MATW Project",
      tagline: "Give Qurbani in Gaza and Around the World",
      goalAmount: 98,
      daysLeft: 54,
      raised: 4555,
      goal: 13000,
      isZakatVerified: false,
    },
    {
      id: 2,
      aadharImageUrl: "https://pmedia.launchgood.com/307480/give_qurbani_for_orphans_widows__displaced_in_syria__lebanon_IMG_5565-555x370.JPG",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Aldar Waqf City",
      tagline: "Provide Housing for Displaced Orphans and Widows in Syria",
      goalAmount: 623,
      daysLeft: 42,
      raised: 14522,
      goal: 50000,
      isZakatVerified: true,
    },
    {
      id: 3,
      aadharImageUrl: "https://launchgood.s3.amazonaws.com/sponsor/14938/qurbani_to_gaza_and_beyond_with_matw_project_1000753009-493x370.jpg",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "The Noor Project",
      tagline: "Provide Meals & Life Essentials to Orphans in Pakistan",
      goalAmount: 1231,
      daysLeft: 164,
      raised: 49950,
      goal: 70000,
      isZakatVerified: true,
    },
    {
      id: 4,
      aadharImageUrl: "https://pmedia.launchgood.com/307292/qurbani_for_gaza_hope_with_every_sacrifice_WhatsApp%20Image%202025-05-13%20at%2017.19.55-493x370.jpeg",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Islamic Relief",
      tagline: "Emergency Response: Flood Relief in Bangladesh",
      goalAmount: 845,
      daysLeft: 21,
      raised: 32500,
      goal: 60000,
      isZakatVerified: true,
    },
    {
      id: 5,
      aadharImageUrl: "https://pmedia.launchgood.com/262319/mothers_and_newborns_at_risk_in_syria_RADS%201446%20Cover%20Image%20-%202025-05-17T043631.564-493x370.png",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Charity Water",
      tagline: "Clean Water Wells for Communities in Somalia",
      goalAmount: 1567,
      daysLeft: 78,
      raised: 87300,
      goal: 100000,
      isZakatVerified: false,
    },
    {
      id: 6,
      aadharImageUrl: "https://pmedia.launchgood.com/307099/water_for_sindh_pakistan_LG%20B%201-1-493x370.jpg",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Penny Appeal",
      tagline: "Build a School for Orphans in Yemen",
      goalAmount: 732,
      daysLeft: 112,
      raised: 65800,
      goal: 120000,
      isZakatVerified: true,
    },
    {
      id: 7,
      aadharImageUrl: "https://pmedia.launchgood.com/257719/sponsor_100_palestinian__lebanese_orphans_1446%20Cover%20Images%20%2860%29-493x370.png",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Human Appeal",
      tagline: "Winter Emergency: Warm Clothing for Refugees",
      goalAmount: 421,
      daysLeft: 35,
      raised: 18750,
      goal: 40000,
      isZakatVerified: true,
    },
    {
      id: 8,
      aadharImageUrl: "https://pmedia.launchgood.com/260675/support_free_education_for_syrias_forgotten_children_DJI_0628-490x370.JPG",
      logo: "/placeholder.svg?height=40&width=40",
      fundType: "Muslim Hands",
      tagline: "Feed the Fasting: Ramadan Food Packages",
      goalAmount: 1893,
      daysLeft: 15,
      raised: 93400,
      goal: 150000,
      isZakatVerified: true,
    },
  ]

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
 <Toaster   
  position="top-center"
  
 />
  <Navbar position={"fixed bg-[whitesmoke]"}/>
     <div className="flex min-h-screen bg-background ">
      {/* Organization Selector */}
      {/* <div className={`fixed top-14 ${isDropdownOpen ? "block" : "hidden"} right-0 p-4 bg-muted/40 border-b z-10`}>
      
      </div> */}

      {/* Sidebar */}
      <div className={`fixed top-[120px] md:top-[80px] ${isDropdownOpen? "-left-48" : "-left-0"} transition-all  bottom-0 w-64 border-r bg-background `}>
      <div className=" absolute top-10 md:top-5 right-5 z-30" onClick={(e)=> setIsDropdownOpen(!isDropdownOpen)}>
          <Menu />
        </div>
        <div className="space-y-1 p-4 mt-6">
          <Button
            variant={activeSection === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start font-medium "
            onClick={() => setActiveSection("dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeSection === "fundraisers" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("fundraisers")}
          >
            <ListOrdered className="mr-2 h-4 w-4" />
            Fundraisers
          </Button>
          <Button
            variant={activeSection === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Button>
          <Button
            variant={activeSection === "donations" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("donations")}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Donations
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
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
                     style={{backgroundImage:` ${userData.profileImage? `url(${userData.profileImage})` : "url(./assets/user.jpg)"}`}}></div>

                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.instituteName? userData.instituteName : "Institute Name"}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg> {userData.instituteCategory? userData.instituteCategory : "Institute Category"}
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg> {userData.Address? userData.Address : "Address"}
                </p>
                <p className="pt-8 text-sm">{userData.instituteBio? userData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>

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
                     style={{backgroundImage:` ${userData.profileImage? `url(${userData.profileImage})` : "url(./assets/user.jpg)"}`}}></div>

                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.fullName? userData.fullName : "Institute Name"}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
               
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg> {userData.Address? userData.Address : "Address"}
                </p>
                <p className="pt-8 text-sm">{userData.instituteBio? userData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>

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
            <img src={`${userData.profileImage? userData.profileImage : './assets/user.jpg'} `} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-full"/>
           

        </div>
        </div>
        

             

              {/* No Donations Message */}
              {/* <div className="text-center py-12">
                <h3 className="text-xl font-semibold">No donations in the last 30 days</h3>
              </div> */}

              {/* User Summary */}
             
            </>
          )}

          {/* Fundraisers Section */}
          {activeSection === "fundraisers" && (
            <>
              <div className="my-8">
                <h1 className="text-3xl font-bold">Your Fundraisers Campaign</h1>
                <p className="text-muted-foreground mt-2">Manage and track your fundraising campaigns</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {allCampaigns.map((campaign) => (
          
            <Card
              className="h-full overflow-hidden  transition-all duration-300 hover:shadow-lg pt-0 pb-2 rounded-lg border-transparent"
             
            >
              <div className="relative overflow-hidden h-48">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${campaign.aadharImageUrl })`,
                    transform: hoveredCard === campaign.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={campaign.logo || "/placeholder.svg"}
                      alt={campaign.fundType}
                      className="h-full w-full object-cover"
                    />
                  </div> */}
                  <span className="text-sm font-bold">{campaign.fundType}</span>
                </div>
                <h3 className="text-lg font-semibold mb-4 line-clamp-2 h-14">{campaign.tagline}</h3>
                <div className="flex justify-between text-sm text-muted-foreground ">
                  <span>43 goalAmount</span>
                  <span>{campaign.endDate } days left</span>
                </div>
                
                  <Progress value={progress} className=" h-2 bg-gradient-to-r from-[#000000] to-[#f8bb26] my-4 p-0" />
               
                <div className="flex justify-between items-end ">
                  <div>
                    <p className="text-2xl font-bold">₹{campaign.goalAmount}</p>
                    <p className="text-sm text-muted-foreground">funded of ₹1000</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="rounded-full px-6 text-lg text-white bg-[#fea000] hover:bg-green-600 transition-all duration-300">
                      Manage
                    </Button>
                  </motion.div>
                </div>

                
              </CardContent>
              <CardFooter className="flex justify-between pt-0 ">
                <div className="flex gap-2">
                  
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-all">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                {campaign.isZakatVerified && (
                  <Badge variant="outline" className="text-[#fea000] border-green-200 bg-green-50 gap-1">
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
                  </Badge>
                )}
              </CardFooter>
            </Card>
      
        ))}
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
                                      <SelectItem value="Madrasa">Madrasa</SelectItem>
                                      <SelectItem value="Masjid">Masjid</SelectItem>
                                      <SelectItem value="Trust/NGO">Trust/NGO</SelectItem>
                                      <SelectItem value="Khankah">Khankah</SelectItem>
                                      <SelectItem value="School">School</SelectItem>
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
                                  <Input type={"text"}  placeholder="State"
                                  name="State"
                                  value={updateUserFormdata.State}
                                  onChange={handleChangeUpdateUserFormdata}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="district" className="flex items-center">
                                    District <span className="text-red-500 ml-1">*</span>
                                  </Label>
                                  <Input type={"text"}  placeholder="District"
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
                                  <Input id="dob" type={"file"} 
                                  name="profileImage"
                                  
                                   onChange={handleChangeUpdateUserFormdata}
                                  />
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
                                  <Input type={"text"}  placeholder="State"
                                  name="State"
                                  value={updateUserFormdata.State}
                                  onChange={handleChangeUpdateUserFormdata}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="district" className="flex items-center">
                                    District <span className="text-red-500 ml-1">*</span>
                                  </Label>
                                  <Input type={"text"}  placeholder="District"
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
                                  <Input id="dob" type={"file"} 
                                  name="profileImage"
                                  
                                   onChange={handleChangeUpdateUserFormdata}
                                  />
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
