"use client"

import { useState, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AuthContext } from "@/context/auth-context"
import { Link } from "react-router-dom"
import { baseUrl } from "@/utils/Constant"
export default function FundraisingGrid() {
  const { allCampaigns, allUserData, loading, userData } = useContext(AuthContext)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [HeartUserData, setHeartUserData] = useState([])
  const [sharePopup, setSharePopup] = useState({ open: false, campaign: null })
  const [copySuccess, setCopySuccess] = useState(false)
  const [likedCampaigns, setLikedCampaigns] = useState(new Set())

  const funded = 1000

  // Load user's liked campaigns on component mount
  console.log(allCampaigns.map((campaign) => campaign.donerAmount.map((item) => item.amount)).flat().reduce((total, amount) => total + amount, 0));




  const handleHeartClick = async (campaign) => {
    if (!userData?._id) {
      alert("Please login to like campaigns")
      return
    }

    const isLiked = likedCampaigns.has(campaign._id)

    try {
      if (isLiked) {
        // Remove like
        const response = await fetch(`${baseUrl}/api/hearts`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData._id,
            campaignId: campaign._id,
          }),
        })

        if (response.ok) {
          setLikedCampaigns((prev) => {
            const newSet = new Set(prev)
            newSet.delete(campaign._id)
            return newSet
          })
          console.log("Like removed successfully")
        }
      } else {
        // Add like
        const heartData = {
          userId: userData._id,
          campaignId: campaign._id,
          userData,
          campaignData: campaign,
          timestamp: new Date().toISOString(),
        }

        const response = await fetch(`${baseUrl}/api/hearts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(heartData),
        })

        if (response.ok) {
          setLikedCampaigns((prev) => new Set([...prev, campaign._id]))
          setHeartUserData((prev) => [...prev, heartData])
          console.log("Heart clicked - Data stored:", heartData)
        }
      }
    } catch (error) {
      console.error("Error handling heart click:", error)
      alert("Error updating like status")
    }
  }

  const handleShareClick = (campaign) => {
    setSharePopup({ open: true, campaign })
  }

  const generateShareUrl = (campaign) => {
    return `${window.location.origin}/campaignDetails/${campaign._id}`
  }

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnWhatsApp = (url, title) => {
    const text = `Check out this fundraising campaign: ${title}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
  }

  const shareOnFacebook = (url) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnTwitter = (url, title) => {
    const text = `Check out this fundraising campaign: ${title}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  return (
    <div className="w-full  mx-auto px-4  md:px-20 md:pt-10 pt-40">
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <h2 className="text-5xl text-center font-bold py-4 darkPurpleClr">Featured Fundraisers</h2>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 mx-auto  w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCampaigns
              .filter((campaign) => campaign.status === "Active")
              .sort((a, b) => a.ranking - b.ranking)
              .slice(0, 12)
              .map((campaign, index) => (



                <Card
                  className="new-card h-full overflow-hidden  transition-all duration-300 pt-0 pb-2 rounded-lg border-transparent cursor-pointer"
                  key={index}
                >
                  <Link to={`/campaignDetails/${campaign._id}`}>
                    <div className="relative overflow-hidden h-70">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out " />
                      <img
                        src={campaign.featureImageUrl || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover  "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                    </div>
                  </Link>
                  <CardContent className="">
                    <div className="flex items-center gap-2  ">
                      {allUserData
                        .filter((user) => user._id === campaign.createdBy)
                        .map((user, userIndex) => {
                          return (
                            <span key={userIndex} className="text-sm  mb-2">
                              {user.instituteName ? user.instituteName : user.fullName}
                            </span>
                          )
                        })}
                    </div>
                    <Link to={`/campaignDetails/${campaign._id}`} className="Hover:text-primary">
                      <h3 className="text-lg font-semibold  line-clamp-2 h-14">{campaign.campaignTitle}</h3>
                    </Link>
                    <div className="flex justify-between text-sm text-muted-foreground py-2 ">

                      <p className="text-xl font-bold">
                        ₹ {
                          Math.round(
                            campaign.donerAmount
                              .map((item) => item.amount)
                              .flat()
                              .reduce((total, amount) => total + amount, 0)
                          )
                        } Raised
                      </p>
                      <p className="text-sm text-muted-foreground"> ₹ {campaign.goalAmount} Goal</p>

                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                      <div
                        className="bg-gradient-to-r from-[#000000] to-[#f8bb26] h-2 rounded-full"
                        style={{ width: `${Math.min((campaign.donerAmount.map((item) => item.amount).flat().reduce((total, amount) => total + amount, 0) / campaign.goalAmount) * 100, 100)}%` }}
                      ></div>
                    </div>

                    <div className=" justify-between items-end ">
                      <div className="flex gap-2 justify-between my-4">
                        <span>{campaign.donerAmount.length} Donors</span>
                        <span>
                          {Math.max(Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0)} days
                          left
                        </span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          to={`/donation/${campaign._id}`}
                          className="rounded-full px-10 py-2 text-xl text-white my-2 bg-[#fea000] hover:bg-green-600 transition-all duration-300"
                        >
                          Donate
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0 ">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted/50 transition-all"
                        onClick={(e) => {
                          e.preventDefault()
                          handleHeartClick(campaign)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className={`w-6 h-6 transition-colors duration-200 ${likedCampaigns.has(campaign._id)
                              ? "fill-red-600 text-red-600"
                              : "fill-transparent stroke-neutral-600 stroke-2"
                            }`}
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted/50 transition-all"
                        onClick={(e) => {
                          e.preventDefault()
                          handleShareClick(campaign)
                        }}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    {campaign.zakatVerified && (
                      <Badge variant="outline" className="text-[#fea000] border-green-200 bg-green-50 gap-1 mt-2">
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

      {/* Share Popup Dialog */}
      <Dialog open={sharePopup.open} onOpenChange={(open) => setSharePopup({ open, campaign: null })}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Share Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {sharePopup.campaign && (
              <>
                <div className="flex items-center space-x-2">
                  <Input value={generateShareUrl(sharePopup.campaign)} readOnly className="flex-1" />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(generateShareUrl(sharePopup.campaign))}
                    className="shrink-0"
                  >
                    {copySuccess ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={() =>
                      shareOnWhatsApp(generateShareUrl(sharePopup.campaign), sharePopup.campaign.campaignTitle)
                    }
                  >
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span className="text-xs">WhatsApp</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-blue-50 hover:bg-blue-100 border-blue-200"
                    onClick={() => shareOnFacebook(generateShareUrl(sharePopup.campaign))}
                  >
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-xs">Facebook</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-sky-50 hover:bg-sky-100 border-sky-200"
                    onClick={() =>
                      shareOnTwitter(generateShareUrl(sharePopup.campaign), sharePopup.campaign.campaignTitle)
                    }
                  >
                    <svg className="w-6 h-6 text-sky-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="text-xs">Twitter</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
