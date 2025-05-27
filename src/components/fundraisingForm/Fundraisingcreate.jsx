"use client"

import { useState, useEffect, use, useContext, useRef } from "react"
import JoditEditor from "jodit-react";
import { ArrowLeft, ArrowRight, Check, Calendar, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AuthContext } from "@/context/auth-context"
import { Navbar } from "../header/Navbar"
import { uploadFile } from "@/services/uploadImg"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Add custom styles for the rich text editor
const editorStyles = `
  .ql-editor {
    min-height: 300px;
    font-size: 16px;
    line-height: 1.6;
  }
  .ql-toolbar {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .ql-container {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .ql-snow .ql-tooltip {
    z-index: 1000;
  }
`

// List of countries for the dropdown
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "South Africa",
  "Mexico",
  "China",
  "Russia",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "South Korea",
  "New Zealand",
]

// List of locations for autocomplete
const locations = [
  "Delhi, India",
  "Dubai, UAE",
  "Dhaka, Bangladesh",
  "Detroit, USA",
  "Denver, USA",
  "Doha, Qatar",
  "Dublin, Ireland",
  "Dallas, USA",
  "Durban, South Africa",
  "Dortmund, Germany",
]

// List of categories
const categories = [
  "Ulama",
  "Madrasa",
  "Education",
  "Poor",
  "Orphans",
  "Medical relief",
  "Masjid"
]

// List of states in India
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

// List of districts (example for a few states)
const districts = [
  "Alipurduar",
  "Bankura",
  "Birbhum",
  "Cooch Behar",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Jhargram",
  "Kalimpong",
  "Kolkata",
  "Malda",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "Paschim Bardhaman",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Purba Medinipur",
  "Purulia",
  "South 24 Parganas",
  "Uttar Dinajpur",
  "Mumbai",
  "Pune",
  "Nagpur",
  "Thane",
  "Nashik",
  "Delhi",
  "New Delhi",
  "Central Delhi",
  "East Delhi",
  "North Delhi",
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
]

// gender options
const genderOptions = ["Male", "Female", "Other"]

// Marital status options
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"]

// Cause options
const causeOptions = [
  "Medical Treatment",
  "Education",
  "Disaster Relief",
  "Poverty Alleviation",
  "Orphan Support",
  "Community Development",
  "Religious Causes",
  "Animal Welfare",
]



export default function MultiStepForm() {
  const editor = useRef(null);
 
  // Initialize form data from localStorage or with default values
  const {formData, setFormData, createCampaign,Toaster,toast}=useContext(AuthContext)
  const [currentStep, setCurrentStep] = useState(0)
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const totalSteps = 8

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("campaignData", JSON.stringify(formData))
    }
  }, [formData])

  const handleNext =async (e) => {
    e.preventDefault();
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit form on last step
    await createCampaign(e)
      console.log("Form submitted:", formData)
      
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const updateNestedFormData = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    })
  }

  // Handle location input change
  const handleLocationChange = (value) => {
    updateFormData("location", value)

    if (value.length > 0) {
      const filtered = locations.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
      setFilteredLocations(filtered)
      setShowLocationDropdown(true)
    } else {
      setShowLocationDropdown(false)
    }
  }

  // Handle checkbox for "Agree to all"
  const handleAgreeAllChange = (checked) => {
    setFormData({
      ...formData,
      agreeAll: checked,
      agreePrivacy: checked,
      agreeTerms: checked,
      agreePayment: checked,
    })
  }

  // Check if individual agreements changed and update agreeAll accordingly
  const handleIndividualAgreementChange = (field, checked) => {
    const updatedFormData = {
      ...formData,
      [field]: checked,
    }

    // Update agreeAll based on individual checkboxes
    const allChecked =
      field === "agreePrivacy"
        ? checked && updatedFormData.agreeTerms && updatedFormData.agreePayment
        : field === "agreeTerms"
          ? updatedFormData.agreePrivacy && checked && updatedFormData.agreePayment
          : field === "agreePayment"
            ? updatedFormData.agreePrivacy && updatedFormData.agreeTerms && checked
            : false

    setFormData({
      ...updatedFormData,
      agreeAll: allChecked,
    })
  }

  // Handle file uploads
  const handleFileUpload = async (field, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create a URL for preview
      // const previewUrl = URL.createObjectURL(file)
      const uploadedUrl = await uploadFile(file); // Upload and get server URL

      // Update form data with file and URL
      if (field === "featureImage") {
        updateFormData("featureImage", file)
        updateFormData("featureImageUrl", uploadedUrl)
      } else if (field === "aadharImage") {
        updateFormData("aadharImage", file)
        updateFormData("aadharImageUrl", uploadedUrl)
      } else if (field === "panImage") {
        updateFormData("panImage", file)
        updateFormData("panImageUrl", uploadedUrl)
      } else if (field === "governmentId") {
        updateFormData("governmentId", file)
        updateFormData("governmentIdUrl", uploadedUrl)
      }
    }
  }
const token = localStorage.getItem("token")
  // Check if the current step is valid to enable/disable the Next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!formData.fundType
      case 1:
        if(!token){
          toast.error("You are not logged in, please login to create a campaign")
          return false
        }
        return !!formData.goalAmount && !!formData.campaignTitle
      case 2:
        return !!formData.featureImageUrl && !!formData.category && !!formData.location && !!formData.endDate
      case 3:
        return !!formData.story
      case 4:
        return true
      case 5:
        // For step 5, we'll allow proceeding even if not all fields are filled
        return true
      case 6:
        return formData.agreePrivacy && formData.agreeTerms && formData.agreePayment
      default:
        return true
    }
  }

  return (
    <>
     <Toaster position="top-center" />
    <Navbar/>
      <div className="max-w-3xl w-full mx-auto p-8">
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 mx-1 rounded-full ${
              index === currentStep ? "bg-[#AC6908]" : index < currentStep ? "bg-[#000000]" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="mb-12">
        {currentStep === 0 && (
          <>
            <h1 className="text-4xl font-bold text-[#000000] mb-1">Bismillah.</h1>
            <h2 className="text-4xl font-bold text-[#f8bb26] mb-4">Let's get started.</h2>

            <h3 className="text-2xl font-bold mb-6">
              I'm raising these funds for...
              <span className="text-red-500">*</span>
            </h3>

            <RadioGroup
              value={formData.fundType}
              onValueChange={(value) => updateFormData("fundType", value)}
              className="space-y-4"
            >
              <Card className="border border-[#C3CCDA] rounded-lg py-2 px-4 hover:border-emerald-400 cursor-pointer">
                <div className="space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Personal" id="Personal" className="mt-1" />

                    <Label htmlFor="Personal" className="text-lg font-medium">
                      Myself or someone else
                    </Label>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-600 pl-4">Funds raised will go to a Personal bank account.</p>
                  </div>
                </div>
              </Card>

              <Card className="border border-[#C3CCDA] rounded-lg py-2 px-4 hover:border-emerald-400 cursor-pointer">
                <div className="flex items-start space-x-2">
                  <div className="space-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Institute" id="Institute" className="mt-1" />
                      <Label htmlFor="Institute" className="text-lg font-medium">
                        My Institute
                      </Label>
                    </div>

                    <p className="text-gray-600 pl-4">Funds raised will go to an Institute bank account.</p>
                  </div>
                </div>
              </Card>
            </RadioGroup>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              Set a goal and name for your campaign.
            </h2>

            <div className="mb-8">
              <Label htmlFor="goal-amount" className="text-2xl font-bold block mb-2">
                Goal amount<span className="text-red-500">*</span>
              </Label>
              <p className="text-gray-600 mb-3">Tip: most campaigns raise ₹ 10000 on average.</p>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 text-lg">
                    ₹
                  </div>
                  <Input
                    id="goal-amount"
                    type="text"
                    value={formData.goalAmount}
                    onChange={(e) => updateFormData("goalAmount", e.target.value)}
                    className="pl-8 h-14 text-lg"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Label htmlFor="campaign-title" className="text-2xl font-bold block mb-2">
                Campaign title<span className="text-red-500">*</span>
              </Label>
              <p className="text-gray-600 mb-3">Tip: keep the title short and simple.</p>

              <Input
                id="campaign-title"
                value={formData.campaignTitle}
                onChange={(e) => updateFormData("campaignTitle", e.target.value.slice(0, 100))}
                placeholder="Title"
                className="h-14 text-lg"
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-2">
                {100 - (formData.campaignTitle?.length || 0)} characters remaining.
              </p>
            </div>

             {/* Institute-specific questions */}
              {formData.fundType === "Institute" && (
                <div className="mt-8 space-y-6 border-t pt-6">
                  <h3 className="text-xl font-bold mb-4">Institute Information</h3>

                  {/* Role Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      What's your Role? <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.instituteRole}
                      onValueChange={(value) => updateFormData("instituteRole", value)}
                    >
                      <SelectTrigger className="w-full h-14">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Teacher/Alim">Teacher/Alim</SelectItem>
                        <SelectItem value="Zimedar/Ameer">Zimedar/Ameer</SelectItem>
                        <SelectItem value="Imam">Imam</SelectItem>
                        <SelectItem value="Trustee">Trustee</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Anticipated Donations */}
                  <div>
                    <Label htmlFor="anticipated-donations" className="text-base font-medium mb-3 block">
                      How much do you anticopate raising donation the next 12 months?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        ₹
                      </div>
                      <Input
                        id="anticipated-donations"
                        type="text"
                        value={formData.anticipatedDonations}
                        onChange={(e) => updateFormData("anticipatedDonations", e.target.value)}
                        className="pl-8 h-14"
                        placeholder="Enter amount"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  {/* Spending Plans */}
                  <div>
                    <Label htmlFor="spending-plans" className="text-base font-medium mb-3 block">
                      What are you going to spend the donations on? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="spending-plans"
                      value={formData.spendingPlans}
                      onChange={(e) => updateFormData("spendingPlans", e.target.value)}
                      placeholder="Describe how you plan to use the donations..."
                      className="min-h-24"
                    />
                  </div>
                </div>
              )}
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              About your fundraiser
            </h2>

            <div className="space-y-8">
              {/* Feature Image */}
              <div>
                <Label htmlFor="feature-image" className="text-xl font-bold block mb-2">
                  Feature image<span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.featureImageUrl ? (
                    <div className="relative">
                      <img
                        src={formData.featureImageUrl || "/placeholder.svg"}
                        alt="Feature preview"
                        className="mx-auto max-h-64 object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 bg-amber-300"
                        onClick={() => {
                          updateFormData("featureImage", null)
                          updateFormData("featureImageUrl", "")
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <input
                        id="feature-image"
                        type="file"
                      multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload("featureImage", e)}
                      />
                      <Label htmlFor="feature-image" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-gray-600">Click to upload or drag and drop</span>
                      </Label>
                    </>
                  )}
                </div>
              </div>

              {/* Tagline */}
              <div>
                <Label htmlFor="tagline" className="text-xl font-bold block mb-2">
                  Tagline
                </Label>
                <p className="text-gray-600 mb-3">Summarize the impact of your fundraiser in one sentence.</p>
                <Textarea
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => updateFormData("tagline", e.target.value)}
                  placeholder="Enter a catchy tagline for your campaign"
                  className="min-h-24 text-base"
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-xl font-bold block mb-2">
                  Category<span className="text-red-500">*</span>
                </Label>
                <p className="text-gray-600 mb-3">Pick one category that best describes your campaign.</p>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-xl font-bold block mb-2">
                  Location<span className="text-red-500">*</span>
                </Label>
                <p className="text-gray-600 mb-3">Where is the impact of your campaign?</p>
                <div className="relative">
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    placeholder="Start typing a location..."
                    className="h-14 text-base"
                  />
                  {showLocationDropdown && filteredLocations.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredLocations.map((loc, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            updateFormData("location", loc)
                            setShowLocationDropdown(false)
                          }}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* End Date */}
              <div>
                <Label htmlFor="end-date" className="text-xl font-bold block mb-2">
                  End date<span className="text-red-500">*</span>
                </Label>
                <p className="text-gray-600 mb-3">
                  Most fundraisers average 30 days.
                  <br />
                  Yours is set to end on{" "}
                  {formData.endDate
                    ? format(new Date(formData.endDate), "EEEE, MMMM d, yyyy h:mm a 'India Standard Time'")
                    : "Saturday, June 14, 2025 5:30 AM India Standard Time"}
                </p>
                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal h-14">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(new Date(formData.endDate), "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        className="bg-white"
                        mode="single"
                        selected={formData.endDate ? new Date(formData.endDate) : undefined}
                        onSelect={(date) => updateFormData("endDate", date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              Tell your story
            </h2>

            <div className="space-y-8">
              <div>
                <Label htmlFor="story" className="text-xl font-bold block mb-2">
                  Your story<span className="text-red-500">*</span>
                </Label>
                <p className="text-gray-600 mb-3">
                  Tell your story in a way that's clear, concise, and creative. Check our Guidelines for proven tips
                  from other campaigns that have crowdfunded on LaunchGood!
                </p>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
      <JoditEditor
        ref={editor}
        value={formData.story}
       
        onBlur={newContent => updateFormData("story", newContent)}
       
      />
    </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="zakat-verified"
                    checked={formData.zakatVerified}
                    onCheckedChange={(checked) => updateFormData("zakatVerified", checked)}
                  />
                  <Label htmlFor="zakat-verified" className="text-sm font-medium">
                    Get your campaign Zakat-verified (optional)
                  </Label>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              Almost there...
            </h2>

            <div className="space-y-8">
              <Accordion type="single" collapsible className="w-full">
                {/* Personal Information Accordion */}
                <AccordionItem value="Personal-info">
                  <AccordionTrigger className="text-lg font-bold py-4">
                    Personal Information
                   
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-gray-600">
                        All fields are required. You can save your progress at any point by clicking Save below.
                      </p>

                      <div>
                        <Label htmlFor="email" className="text-sm text-gray-500">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="Email address"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="given-name" className="text-sm text-gray-500">
                          Fisrt Name
                        </Label>
                        <Input
                          id="given-name"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          placeholder="Given name"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">The minimum length is 2 characters.</p>
                      </div>

                      <div>
                        <Label htmlFor="family-name" className="text-sm text-gray-500">
                          Last Name
                        </Label>
                        <Input
                          id="family-name"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          placeholder="Family name"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">The minimum length is 2 characters.</p>
                      </div>

                      <div>
                        <Label htmlFor="date-of-birth" className="text-sm text-gray-500">
                          Date of Birth
                        </Label>
                        <div className="flex gap-4">
                          <Select
                            value={formData.dateOfBirth.day}
                            onValueChange={(value) => updateNestedFormData("dateOfBirth", "day", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={formData.dateOfBirth.month}
                            onValueChange={(value) => updateNestedFormData("dateOfBirth", "month", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month, index) => (
                                <SelectItem key={month} value={(index + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={formData.dateOfBirth.year}
                            onValueChange={(value) => updateNestedFormData("dateOfBirth", "year", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm text-gray-500">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          placeholder="Phone number"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Please include your international dialing code and the minimum length is 7 characters.
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm text-gray-500">Your Home Address</Label>
                        <Select
                          value={formData.address.country}
                          onValueChange={(value) => updateNestedFormData("address", "country", value)}
                          className="mt-1"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-sm text-gray-500">
                          Address
                        </Label>
                        <Input
                          id="address"
                          value={formData.address.street}
                          onChange={(e) => updateNestedFormData("address", "street", e.target.value)}
                          placeholder="Address"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-sm text-gray-500">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) => updateNestedFormData("address", "city", e.target.value)}
                          placeholder="City"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state" className="text-sm text-gray-500">
                            State/Province/Region
                          </Label>
                          <Input
                            id="state"
                            value={formData.address.state}
                            onChange={(e) => updateNestedFormData("address", "state", e.target.value)}
                            placeholder="State/Province/Region"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="postal-code" className="text-sm text-gray-500">
                            Postal Code
                          </Label>
                          <Input
                            id="postal-code"
                            value={formData.address.postalCode}
                            onChange={(e) => updateNestedFormData("address", "postalCode", e.target.value)}
                            placeholder="Postal Code"
                            className="mt-1"
                          />
                        </div>
                      </div>

                    
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Bank Information Accordion */}
                <AccordionItem value="bank-info">
                  <AccordionTrigger className="text-lg font-bold py-4">
                    Your Bank Information
                   
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-gray-600">
                        This section is optional for now, however, in order to receive the funds you raise, be sure to
                        provide bank information after under your campaign's Payment Information section. You can save
                        your progress at any point by clicking Save below.
                      </p>

                      <div>
                        <Label htmlFor="account-holder-name" className="text-sm text-gray-500">
                          Account Holder Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="account-holder-name"
                          value={formData.accountHolderName}
                          onChange={(e) => updateFormData("accountHolderName", e.target.value)}
                          placeholder="Full name on the account"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="account-number" className="text-sm text-gray-500">
                          Recipient Account Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="account-number"
                          value={formData.accountNumber}
                          onChange={(e) => updateFormData("accountNumber", e.target.value)}
                          placeholder="Account number"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bank-name" className="text-sm text-gray-500">
                          Bank Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="bank-name"
                          value={formData.bankName}
                          onChange={(e) => updateFormData("bankName", e.target.value)}
                          placeholder="Bank name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ifsc-code" className="text-sm text-gray-500">
                          IFSC Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="ifsc-code"
                          value={formData.ifscCode}
                          onChange={(e) => updateFormData("ifscCode", e.target.value)}
                          placeholder="IFSC code"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Documents Accordion */}
                <AccordionItem value="documents">
                  <AccordionTrigger className="text-lg font-bold py-4">
                    Documents
                   
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-gray-600">
                        Please upload the required documents to verify your identity.
                      </p>

                      <div>
                        <Label htmlFor="aadhar-image" className="text-sm text-gray-500">
                          Aadhar Card <span className="text-red-500">*</span>
                        </Label>
                        <div className="border border-gray-300 rounded-lg p-4 mt-1">
                          {formData.aadharImageUrl ? (
                            <div className="relative">
                              <img
                                src={formData.aadharImageUrl || "/placeholder.svg"}
                                alt="Aadhar Card"
                                className="mx-auto max-h-40 object-contain"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  updateFormData("aadharImage", null)
                                  updateFormData("aadharImageUrl", "")
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <input
                                id="aadhar-image"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => handleFileUpload("aadharImage", e)}
                              />
                              <Label
                                htmlFor="aadhar-image"
                                className="flex items-center space-x-2 cursor-pointer text-emerald-600"
                              >
                                <Upload className="h-5 w-5" />
                                <span>Upload Aadhar Card</span>
                              </Label>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="pan-image" className="text-sm text-gray-500">
                          PAN Card <span className="text-red-500">*</span>
                        </Label>
                        <div className="border border-gray-300 rounded-lg p-4 mt-1">
                          {formData.panImageUrl ? (
                            <div className="relative">
                              <img
                                src={formData.panImageUrl || "/placeholder.svg"}
                                alt="PAN Card"
                                className="mx-auto max-h-40 object-contain"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  updateFormData("panImage", null)
                                  updateFormData("panImageUrl", "")
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <input
                                id="pan-image"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => handleFileUpload("panImage", e)}
                              />
                              <Label
                                htmlFor="pan-image"
                                className="flex items-center space-x-2 cursor-pointer text-emerald-600"
                              >
                                <Upload className="h-5 w-5" />
                                <span>Upload PAN Card</span>
                              </Label>
                            </div>
                          )}
                        </div>
                      </div>
                        <div>
                        <Label htmlFor="government-id" className="text-sm text-gray-500">
                          Your Government Issued ID
                        </Label>
                        <div className="border border-gray-300 rounded-lg p-4 mt-1">
                          {formData.governmentIdUrl ? (
                            <div className="relative">
                              <img
                                src={formData.governmentIdUrl || "/placeholder.svg"}
                                alt="Government ID"
                                className="mx-auto max-h-40 object-contain"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  updateFormData("governmentId", null)
                                  updateFormData("governmentIdUrl", "")
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <input
                                id="government-id"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => handleFileUpload("governmentId", e)}
                              />
                              <Label
                                htmlFor="government-id"
                                className="flex items-center space-x-2 cursor-pointer text-emerald-600"
                              >
                                <Upload className="h-5 w-5" />
                                <span>Upload File</span>
                              </Label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              
            </div>
          </>
        )}

        {currentStep === 5 && (
          

          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              References
            </h2>
            <p>As part of our verification process, you are requested to submit the following details. Please inform Imam Sahib of the purpose for which you are taking the details.</p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="raising-cause" className="text-base font-medium">
                  Masjid Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.masjidName}
                  onChange={(e) => updateFormData("masjidName", e.target.value)}
                  className="mt-1"
                >
                  
                 
                </Input>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="is-beneficiary-orphan" className="text-base font-medium">
                    Name of Imam Sahab  <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={formData.nameOfImamSahab}
                    onChange={(e) => updateFormData("nameOfImamSahab", e.target.value)}
                    className="mt-1"
                  >
                    
                
                  </Input>
                </div>

                <div>
                  <Label htmlFor="number-of-beneficiaries" className="text-base font-medium">
                    Imam Sahab Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                   
                    type="number"
                    min="0"
                    value={formData.numberOfImamSahab}
                    onChange={(e) => updateFormData("numberOfImamSahab", e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="full-name-aadhar" className="text-base font-medium">
                  Imam Sahab Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="full-name-aadhar"
                  type="email"
                  value={formData.emailOfImamSahab}
                  onChange={(e) => updateFormData("emailOfImamSahab", e.target.value)}
                  placeholder="Full Name (max 100 chars)"
                  maxLength={100}
                  className="mt-1"
                />
              </div>

             </div>
          </>
        )}

        {currentStep === 6 && (
          

          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              Terms and Conditions
            </h2>

            <div className="space-y-8">
              <p className="text-gray-600">By fundraising on LaunchGood, I agree to the following conditions:</p>

              <div className="space-y-4 border rounded-lg p-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="agree-all" checked={formData.agreeAll} onCheckedChange={handleAgreeAllChange} />
                  <Label htmlFor="agree-all" className="text-lg font-bold">
                    Agree to all
                  </Label>
                </div>

                <div className="pl-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree-privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => handleIndividualAgreementChange("agreePrivacy", checked)}
                    />
                    <Label htmlFor="agree-privacy" className="text-base">
                      Privacy Policy
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleIndividualAgreementChange("agreeTerms", checked)}
                    />
                    <Label htmlFor="agree-terms" className="text-base">
                      Terms of Use
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree-payment"
                      checked={formData.agreePayment}
                      onCheckedChange={(checked) => handleIndividualAgreementChange("agreePayment", checked)}
                    />
                    <Label htmlFor="agree-payment" className="text-base">
                      Payment Policy
                    </Label>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Urgent?</h3>
                    <p className="text-gray-600">Submit for an expedited review</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id="urgent-toggle"
                      checked={formData.isUrgent}
                      onChange={(e) => updateFormData("isUrgent", e.target.checked)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="urgent-toggle"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 ${
                        formData.isUrgent ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          formData.isUrgent ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 7 && (
          <>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#f8bb26] bg-clip-text text-transparent mb-12">
              Preview Campaign
            </h2>

            <div className="space-y-8">
              <p className="text-gray-700">Your funds will be paid to the following account:</p>

              <div className="flex justify-center">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-4">
                    {formData.featureImageUrl ? (
                      <img
                        className="rounded-t-lg w-full h-48 object-cover"
                        src={formData.featureImageUrl || "/placeholder.svg"}
                        alt="Campaign feature"
                      />
                    ) : (
                      <div className="rounded-t-lg w-full h-48 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No image uploaded</p>
                      </div>
                    )}
                  </div>
                  <div className="px-5 pb-5">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 mb-2">
                      {formData.campaignTitle || "Campaign Title"}
                    </h5>
                    <p className="text-sm text-gray-600 mb-4">{formData.tagline || "Campaign tagline"}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">₹{formData.goalAmount || "0"}</span>
                      <Button className="text-white bg-[#f8bb26] hover:bg-[#6b9040] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Donate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold">Campaign Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-md">
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{formData.category || "Not specified"}</p>
                  </div>
                  <div className="border p-4 rounded-md">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{formData.location || "Not specified"}</p>
                  </div>
                  <div className="border p-4 rounded-md">
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">
                      {formData.endDate ? format(new Date(formData.endDate), "MMMM d, yyyy") : "Not specified"}
                    </p>
                  </div>
                  <div className="border p-4 rounded-md">
                    <p className="text-sm text-gray-500">Beneficiary</p>
                    <p className="font-medium">{formData.emailOfImamSahab || "Not specified"}</p>
                  </div>
                </div>

                <div className="border p-4 rounded-md mt-4">
                  <h4 className="font-bold mb-2">Story</h4>
                  <div className="prose max-w-none">
                    <p  dangerouslySetInnerHTML={{ __html: formData.story }}></p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-6 text-lg"
        >
          <ArrowLeft className="h-5 w-5" /> Back
        </Button>

        <Button
          onClick={(e) => handleNext(e)}
          disabled={!isStepValid()}
          className={`flex items-center gap-2 px-8 py-6 text-lg ${
            currentStep === totalSteps - 1
              ? "text-white bg-emerald-500 hover:bg-emerald-600"
              : "bg-gray-300 hover:bg-[black] hover:text-white"
          }`}
        >
          {currentStep === totalSteps - 1 ? (
            <>
              Submit for approval <Check className="h-5 w-5" />
            </>
          ) : (
            <>
              Next <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
    </>
  )
}
