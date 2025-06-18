"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Info, Coins, TrendingUp, Home, Heart } from "lucide-react"
import { Navbar } from "@/components/header/Navbar"
import Footer from "@/components/footer/Footer"

export default function ZakatCalculator() {
  const [wealth, setWealth] = useState({
    cash: 0,
    bankSavings: 0,
    gold: 0,
    silver: 0,
    businessAssets: 0,
    investments: 0,
    propertyInvestment: 0,
    debtsOwed: 0,
    loans: 0,
    expenses: 0,
  })

  const [goldPrice, setGoldPrice] = useState(6500) // Price per gram in your currency
  const [silverPrice, setSilverPrice] = useState(85) // Price per gram in your currency
  const [zakatAmount, setZakatAmount] = useState(0)
  const [nisabAmount, setNisabAmount] = useState(0)
  const [isEligible, setIsEligible] = useState(false)

  // Nisab thresholds
  const GOLD_NISAB_GRAMS = 87.48 // 7.5 tola
  const SILVER_NISAB_GRAMS = 612.36 // 52.5 tola
  const ZAKAT_RATE = 0.025 // 2.5%

  useEffect(() => {
    calculateZakat()
  }, [wealth, goldPrice, silverPrice])

  const calculateZakat = () => {
    // Calculate Nisab (minimum threshold)
    const goldNisab = GOLD_NISAB_GRAMS * goldPrice
    const silverNisab = SILVER_NISAB_GRAMS * silverPrice
    const currentNisab = Math.min(goldNisab, silverNisab) // Use lower of the two

    setNisabAmount(currentNisab)

    // Calculate total zakatable wealth
    const totalAssets =
      wealth.cash +
      wealth.bankSavings +
      wealth.gold +
      wealth.silver +
      wealth.businessAssets +
      wealth.investments +
      wealth.propertyInvestment

    const totalLiabilities = wealth.loans + wealth.expenses

    const netWealth = totalAssets - totalLiabilities

    // Check if eligible for Zakat
    if (netWealth >= currentNisab) {
      setIsEligible(true)
      setZakatAmount(netWealth * ZAKAT_RATE)
    } else {
      setIsEligible(false)
      setZakatAmount(0)
    }
  }

  const handleInputChange = (field, value) => {
    setWealth((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const resetCalculator = () => {
    setWealth({
      cash: 0,
      bankSavings: 0,
      gold: 0,
      silver: 0,
      businessAssets: 0,
      investments: 0,
      propertyInvestment: 0,
      debtsOwed: 0,
      loans: 0,
      expenses: 0,
    })
  }

  const totalAssets =
    wealth.cash +
    wealth.bankSavings +
    wealth.gold +
    wealth.silver +
    wealth.businessAssets +
    wealth.investments +
    wealth.propertyInvestment
  const totalLiabilities = wealth.loans + wealth.expenses
  const netWealth = totalAssets - totalLiabilities

  return (
    <>
    <Navbar/>
        <div className="min-h-screen  f p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-darkBrownClr rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-darkBrownClr">Zakat Calculator</h1>
          </div>
          <p className="text-lightYollowClr text-lg max-w-2xl mx-auto">
            Calculate your Zakat obligation according to Islamic principles. Zakat is 2.5% of your qualifying wealth
            held for one lunar year.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cash & Savings */}
            <Card className="border-lightYollowClr">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="flex items-center gap-2 text-darkYollowClr">
                  <Coins className="h-5 w-5" />
                  Cash & Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cash">Cash in Hand (₹)</Label>
                    <Input
                      id="cash"
                      type="number"
                      placeholder="0"
                      value={wealth.cash || ""}
                      onChange={(e) => handleInputChange("cash", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankSavings">Bank Savings (₹)</Label>
                    <Input
                      id="bankSavings"
                      type="number"
                      placeholder="0"
                      value={wealth.bankSavings || ""}
                      onChange={(e) => handleInputChange("bankSavings", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Precious Metals */}
            <Card className="border-amber-200">
              <CardHeader className="bg-amber-50">
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Heart className="h-5 w-5" />
                  Gold & Silver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="goldPrice">Gold Price per gram (₹)</Label>
                    <Input
                      id="goldPrice"
                      type="number"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silverPrice">Silver Price per gram (₹)</Label>
                    <Input
                      id="silverPrice"
                      type="number"
                      value={silverPrice}
                      onChange={(e) => setSilverPrice(Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gold">Gold Value (₹)</Label>
                    <Input
                      id="gold"
                      type="number"
                      placeholder="0"
                      value={wealth.gold || ""}
                      onChange={(e) => handleInputChange("gold", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silver">Silver Value (₹)</Label>
                    <Input
                      id="silver"
                      type="number"
                      placeholder="0"
                      value={wealth.silver || ""}
                      onChange={(e) => handleInputChange("silver", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business & Investments */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <TrendingUp className="h-5 w-5" />
                  Business & Investments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessAssets">Business Assets/Inventory (₹)</Label>
                    <Input
                      id="businessAssets"
                      type="number"
                      placeholder="0"
                      value={wealth.businessAssets || ""}
                      onChange={(e) => handleInputChange("businessAssets", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investments">Stocks/Investments (₹)</Label>
                    <Input
                      id="investments"
                      type="number"
                      placeholder="0"
                      value={wealth.investments || ""}
                      onChange={(e) => handleInputChange("investments", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="propertyInvestment">Investment Property Value (₹)</Label>
                  <Input
                    id="propertyInvestment"
                    type="number"
                    placeholder="0"
                    value={wealth.propertyInvestment || ""}
                    onChange={(e) => handleInputChange("propertyInvestment", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Property held for investment purposes only (not personal residence)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liabilities */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <Home className="h-5 w-5" />
                  Liabilities & Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loans">Outstanding Loans (₹)</Label>
                    <Input
                      id="loans"
                      type="number"
                      placeholder="0"
                      value={wealth.loans || ""}
                      onChange={(e) => handleInputChange("loans", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expenses">Essential Monthly Expenses × 12 (₹)</Label>
                    <Input
                      id="expenses"
                      type="number"
                      placeholder="0"
                      value={wealth.expenses || ""}
                      onChange={(e) => handleInputChange("expenses", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Zakat Result */}
            <Card className="border-darkYollowClr  to-emerald-100">
              <CardHeader>
                <CardTitle className="text-center text-darkYollowClr">Zakat Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-darkYollowClr mb-2">
                    ₹{zakatAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </div>
                  <Badge variant={isEligible ? "default" : "secondary"} className="mb-4">
                    {isEligible ? "Zakat Due" : "Below Nisab"}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Assets:</span>
                    <span className="font-semibold">₹{totalAssets.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Liabilities:</span>
                    <span className="font-semibold">₹{totalLiabilities.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Net Zakatable Wealth:</span>
                    <span className="font-bold">₹{netWealth.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Nisab:</span>
                    <span className="font-semibold">₹{nisabAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Button onClick={resetCalculator} variant="outline" className="w-full mt-4">
                  Reset Calculator
                </Button>
              </CardContent>
            </Card>

            {/* Information Card */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="h-5 w-5" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Nisab:</strong> The minimum amount of wealth required before Zakat becomes obligatory.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 text-gray-700">
                  <p>• Zakat is 2.5% of qualifying wealth</p>
                  <p>• Wealth must be held for one full lunar year</p>
                  <p>• Personal residence is not subject to Zakat</p>
                  <p>• Debts and essential expenses are deductible</p>
                  <p>• Consult a scholar for complex situations</p>
                </div>
              </CardContent>
            </Card>

            {/* Nisab Information */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Current Nisab Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gold Nisab (87.48g):</span>
                  <span className="font-semibold">₹{(GOLD_NISAB_GRAMS * goldPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Silver Nisab (612.36g):</span>
                  <span className="font-semibold">₹{(SILVER_NISAB_GRAMS * silverPrice).toLocaleString("en-IN")}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Applied Nisab:</span>
                  <span>₹{nisabAmount.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">*Lower of gold or silver nisab is used</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg border border-emerald-200">
          <p className="text-darkYollowClr mb-2">
            "And establish prayer and give Zakat, and whatever good you put forward for yourselves - you will find it
            with Allah."
          </p>
          <p className="text-sm text-darkBrownClr">- Quran 2:110</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
