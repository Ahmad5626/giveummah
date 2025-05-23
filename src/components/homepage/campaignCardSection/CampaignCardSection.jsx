import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AuthContext } from "@/context/auth-context"



export default function FundraisingGrid() {
  // const {allCampaigns} = useContext(AuthContext)
  const [hoveredCard, setHoveredCard] = useState(null)


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
 

  const [progress, setProgress] = useState(3)
    useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 4)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full md:max-w-7xl mx-auto px-4  md:px-20 md:pt-30 pt-40">
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <h2 className="text-5xl text-center font-bold py-4 darkPurpleClr">Featured Fundraisers</h2>
          {/* <p className="text-muted-foreground">Sponsored</p> */}
        </div>
        {/* <Button variant="outline" className="rounded-full px-6 hover:bg-primary/5 transition-all duration-300">
          Discover more
        </Button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCampaigns.map((campaign, index) => (
          
            <Card
              className="h-full overflow-hidden  transition-all duration-300 hover:shadow-lg pt-0 pb-2 rounded-lg border-transparent"
             key={index}
            >
              <div className="relative overflow-hidden h-48">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out "
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
                      Donate
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
    </div>
  )
}
