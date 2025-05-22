"use client"

import { useContext, useEffect, useState } from "react"
import { Home, ListOrdered, User, DollarSign, LogOut, ChevronDown, Info } from "lucide-react"
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


export default function Dashboard() {
 const {userData,updateHandleUser,Toaster,updateUserFormdata,handleChangeUpdateUserFormdata,setUpdateUserFormdata } = useContext(AuthContext)
 
 
   const [hoveredCard, setHoveredCard] = useState(null)
  const [activeSection, setActiveSection] = useState("dashboard")
 

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
      <div className="fixed top-14 left-0 right-0 p-4 bg-muted/40 border-b z-10">
      
      </div>

      {/* Sidebar */}
      <div className="fixed top-[80px] bottom-0 w-64 border-r bg-background ">
        <div className="space-y-1 p-4">
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
      <div className="ml-64 pt-[73px] flex-1 p-6">
        <div className="">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              {/* Date and Welcome */}
              <div className="my-8">
                <div className="text-sm text-muted-foreground">
                  {formattedDate} 
                </div>
                <h1 className="text-4xl font-bold mt-2">Welcome back!</h1>
              </div>

              

              {/* Funds Raised */}
              <div className="my-20">
                <h2 className="text-2xl font-bold">
                  {userDonationData.totalRaised} {userDonationData.currency}
                </h2>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Gross funds raised</span>
                  <span className="mx-2">·</span>
                  <span>{userDonationData.dateRange}</span>
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
                        name="userName"
                        
                         defaultValue={userData.userName} 
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
                        value={updateUserFormdata.Gender}
                      onValueChange={(value) =>
                  setUpdateUserFormdata({ ...updateUserFormdata, Gender: value })
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
                        name="District"
                        value={updateUserFormdata.District}
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

          {/* Donations Section */}
          {activeSection === "donations" && (
            <>
              <div className="my-8">
                <h1 className="text-3xl font-bold">Your Donations</h1>
                <p className="text-muted-foreground mt-2">Track all your donation activities</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 bg-muted p-4 font-medium">
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
