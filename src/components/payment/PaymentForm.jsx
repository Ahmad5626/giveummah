"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Heart, Users, BookOpen } from "lucide-react"
import {baseUrl} from "@/utils/Constant"
const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: 100,
    tipAmount: 0,
    fundType: "",
    compaignName: "",
  })

  const [selectedGivingType, setSelectedGivingType] = useState("one-time")
  const [tipPercentage, setTipPercentage] = useState(0)
  const [loading, setLoading] = useState(false)

  const tipOptions = [0, 5, 10, 15, 20]
  const fundTypes = [
    { value: "education", label: "Education", icon: BookOpen },
    { value: "healthcare", label: "Healthcare", icon: Heart },
    { value: "community", label: "Community", icon: Users },
  ]

  const campaigns = [
    "Help Children Education",
    "Medical Emergency Fund",
    "Community Development",
    "Disaster Relief Fund",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTipChange = (percentage) => {
    setTipPercentage(percentage)
    const tipAmount = (formData.amount * percentage) / 100
    setFormData((prev) => ({
      ...prev,
      tipAmount: tipAmount,
    }))
  }

  const getDisplayAmount = () => formData.amount
  const getCurrentTipAmount = () => formData.tipAmount
  const getTipPercentage = () => tipPercentage
  const getTotal = () => formData.amount + formData.tipAmount

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
    //   console.log("Total Amount:", getTotal())
    //   console.log("Base Amount:", getDisplayAmount())
    //   console.log("Tip Amount:", getCurrentTipAmount())
    //   console.log("Tip Percentage:", getTipPercentage().toFixed(2) + "%")
    //   console.log("Given Type:", selectedGivingType)

      const response = await fetch(`${baseUrl}v1/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData
          
        }),
      })

      const data = await response.json()

      if (data.success && data.data.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.data.redirectUrl
      } else {
        alert("Payment initiation failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Make a Donation
          </CardTitle>
          <CardDescription>Support our cause with your generous contribution</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  type="tel"
                  required
                />
              </div>
            </div>

            {/* Giving Type */}
            <div className="space-y-3">
              <Label>Giving Type</Label>
              <RadioGroup
                value={selectedGivingType}
                onValueChange={setSelectedGivingType}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="one-time" id="one-time" className="peer sr-only" />
                  <Label
                    htmlFor="one-time"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    One-time
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                  <Label
                    htmlFor="monthly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    Monthly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Fund Type */}
            <div className="space-y-2">
              <Label htmlFor="fundType">Fund Type</Label>
              <Select
                value={formData.fundType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, fundType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fund type" />
                </SelectTrigger>
                <SelectContent>
                  {fundTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campaign */}
            <div className="space-y-2">
              <Label htmlFor="compaignName">Campaign</Label>
              <Select
                value={formData.compaignName}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, compaignName: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign} value={campaign}>
                      {campaign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (₹)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            {/* Tip Section */}
            <div className="space-y-3">
              <Label>Add a tip to support our platform</Label>
              <div className="grid grid-cols-5 gap-2">
                {tipOptions.map((tip) => (
                  <Button
                    key={tip}
                    type="button"
                    variant={tipPercentage === tip ? "default" : "outline"}
                    onClick={() => handleTipChange(tip)}
                    className="text-sm"
                  >
                    {tip}%
                  </Button>
                ))}
              </div>
              {tipPercentage > 0 && (
                <p className="text-sm text-muted-foreground">Tip amount: ₹{getCurrentTipAmount().toFixed(2)}</p>
              )}
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Donation Amount:</span>
                <span>₹{getDisplayAmount()}</span>
              </div>
              {getCurrentTipAmount() > 0 && (
                <div className="flex justify-between">
                  <span>Platform Tip ({getTipPercentage()}%):</span>
                  <span>₹{getCurrentTipAmount().toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading || !formData.name || !formData.mobile || !formData.fundType || !formData.compaignName}
            >
              {loading ? "Processing..." : `Donate ₹${getTotal().toFixed(2)} via PhonePe`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default PaymentForm
