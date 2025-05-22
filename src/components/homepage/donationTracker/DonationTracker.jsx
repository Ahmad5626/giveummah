import { Card, CardContent } from "@/components/ui/card"

export default function DonationTracker() {
  const donations = [
    {
      amount: "₹2,000",
      time: "just now",
      location: "Mumbai, Maharashtra, India",
      cause: "Suroth's Destination Dreams",
    },
    {
      amount: "₹12,000",
      time: "1 minute ago",
      location: "Delhi, Delhi, India",
      cause: "Meals for Gaza: Feed a Family",
    },
    {
      amount: "₹5,500",
      time: "1 minute ago",
      location: "Hyderabad, Telangana, India",
      cause: "Sustainable Support for Refugees",
    },
    {
      amount: "₹500",
      time: "2 minutes ago",
      location: "Bengaluru, Karnataka, India",
      cause: "Sponsor Orphans in Gaza",
    },
    {
      amount: "₹2,000",
      time: "2 minutes ago",
      location: "Chennai, Tamil Nadu, India",
      cause: "SISTERS' PROJECT: Emergency Relief",
    },
    {
      amount: "₹1,000",
      time: "2 minutes ago",
      location: "Kolkata, West Bengal, India",
      cause: "Sponsor an Orphan Today",
    },
    {
      amount: "₹10,000",
      time: "2 minutes ago",
      location: "Pune, Maharashtra, India",
      cause: "Suroth's Destination Dreams",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pulse of the Ummah</h2>
        <div className="text-4xl md:text-5xl font-bold text-[#fea000] mb-2">₹2,43,800</div>
        <p className="text-gray-600">raised in the past hour</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {donations.map((donation, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xl font-bold text-gray-900">{donation.amount}</div>
                <div className="text-xs text-gray-500">{donation.time}</div>
              </div>
              <div className="text-sm text-gray-700 mb-1">Anonymous kind soul</div>
              <div className="text-xs text-gray-500 mb-2">{donation.location}</div>
              <div className="text-xs font-medium text-gray-800 truncate">{donation.cause}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
