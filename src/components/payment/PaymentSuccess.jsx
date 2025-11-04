"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, ArrowLeft, Heart } from "lucide-react"
import { baseUrl } from "@/utils/Constant"

const PaymentSuccess = () => {
  const { merchantOrderId } = useParams()
  const navigate = useNavigate()
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`${baseUrl}/v1/api/payments/status/${merchantOrderId}`)
        const data = await response.json()
console.log(data);

        if (data.success && data.data) {
          setPaymentStatus(data.data)
        } else {
          setPaymentStatus({ status: "FAILED" })
        }
      } catch (error) {
        console.error("Error checking payment status:", error)
        setPaymentStatus({ status: "FAILED" })
      } finally {
        setLoading(false)
      }
    }

    if (merchantOrderId) {
      checkPaymentStatus()
    }
  }, [merchantOrderId])

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-16 w-16 text-green-600" />
      case "FAILED":
        return <XCircle className="h-16 w-16 text-red-600" />
      default:
        return <Clock className="h-16 w-16 text-yellow-500" />
    }
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          title: "جزاك اللهُ خيرًا (Jazak Allah Khair)",
          description: "Your donation has been received successfully. May Allah reward you abundantly for your generosity.",
        }
      case "FAILED":
        return {
          title: "Payment Failed",
          description: "Unfortunately, your payment could not be processed. Please try again.",
        }
      default:
        return {
          title: "Payment Pending",
          description: "Your payment is being processed. Please wait for confirmation.",
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            <p className="mt-4 text-lg">Checking payment status...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusInfo = getStatusMessage(paymentStatus.state)


  return (
    <div className="min-h-screen bg-[url('/assets/inspiring.png')] p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-green-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getStatusIcon(paymentStatus?.status)}</div>
          <CardTitle className="text-2xl font-bold text-green-700">{statusInfo.title}</CardTitle>
          <p className="text-base text-gray-600">{statusInfo.description}</p>
        </CardHeader>

        {paymentStatus && (
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
              {paymentStatus.metaInfo.udf1 && (
                <div className="flex justify-between">
                  <span className="font-medium">Donor Name:</span>
                  <span className="text-sm">{paymentStatus.metaInfo.udf1}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="text-sm">{paymentStatus.orderId || merchantOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>₹{(paymentStatus.amount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${
                    paymentStatus.state == "COMPLETED"
                      ? "text-green-600"
                      : paymentStatus.state === "FAILED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {paymentStatus.state}
                </span>
              </div>
              {paymentStatus.transactionId && (
                <div className="flex justify-between">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="text-sm">{paymentStatus.transactionId}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")} className="flex-1 border-green-600 text-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              {paymentStatus.status === "FAILED" && (
                <Button onClick={() => navigate("/donate")} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        )}

        <div className="text-center py-3 text-sm text-green-700 border-t">
          <Heart className="inline h-4 w-4 mr-1 text-red-500" />  
          "Sadaqah extinguishes sins like water extinguishes fire." – Prophet Muhammad ﷺ
        </div>
      </Card>
    </div>
  )
}

export default PaymentSuccess
