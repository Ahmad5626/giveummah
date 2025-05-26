const DonationCard = ({ donation }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      {/* Amount and Time */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-2xl font-bold text-gray-800">${donation.amount}</span>
        <span className="text-sm text-gray-500">{donation.time}</span>
      </div>

      {/* Donor Information */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">{donation.donor}</p>
        <p className="text-sm text-gray-600">{donation.location}</p>
        <p className="text-sm text-gray-600">{donation.destination}</p>
      </div>
    </div>
  )
}

export default DonationCard
