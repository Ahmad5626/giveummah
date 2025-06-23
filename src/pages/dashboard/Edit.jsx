"use client"

import { useState, useContext } from "react"

import { X, Upload, ImageIcon, Trash, Save, Heart, Share2 } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { AuthContext } from "@/context/auth-context"

export default function FundraiserCampaigns() {
  const { userCampaignData, userData } = useContext(AuthContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [editedItem, setEditedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [givenAmountFormdata, setGivenAmountFormdata] = useState({
    amount: "",
    headline: "",
    subHeadline: "",
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

  const handleDeleteGivenAmount = (campaignId, givenAmountId) => {
    setEditedItem((prev) => ({
      ...prev,
      givenAmount: prev.givenAmount.filter((item) => item._id !== givenAmountId),
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
      const response = await fetch(`http://localhost:9000/v1/api/update-campaigns/${editedItem._id}`, {
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

  return (
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
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "basic"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "campaign"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("campaign")}
              >
                Campaign Details
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "personal"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Info
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "bank"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("bank")}
              >
                Bank Details
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "address"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("address")}
              >
                Address
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "institute"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("institute")}
              >
                Institute Info
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "images"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("images")}
              >
                Images & Documents
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "given"
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("given")}
              >
                Given Amount
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sub Headline</label>
                      <input
                        type="text"
                        name="subHeadline"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={givenAmountFormdata.subHeadline || ""}
                        onChange={(e) => handleChangenGivenAmount("subHeadline", e.target.value)}
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
                            <div>SubHeadline</div>
                            <div>Delete</div>
                          </div>
                          {editedItem.givenAmount && editedItem.givenAmount.length > 0 ? (
                            editedItem.givenAmount.map((givenAmount, index) => (
                              <div key={index} className="flex justify-between gap-10 p-4 border-t">
                                <div className="w-[25%] text-center overflow-auto">{givenAmount.amount}</div>
                                <div className="w-[25%] text-center overflow-auto">{givenAmount.headline}</div>
                                <div className="w-[25%] text-center overflow-auto">{givenAmount.subHeadline}</div>
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
  )
}
