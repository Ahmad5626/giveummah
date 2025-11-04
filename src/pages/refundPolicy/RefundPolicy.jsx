"use client"

import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import { FileText, AlertTriangle, CreditCard, Scale, Mail } from "lucide-react"

export default function RefundPolicy() {
  return (
    <>
      <UpperPage />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#e3be50]/10 to-[#fe9f00]/10">
        {/* Header */}
        <div className="pages-bg text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <FileText size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
            <p className="text-lg opacity-90">Last Updated On: 30/05/2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 py-12 max-w-7xl mx-auto">
          {/* Intro */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">General Policy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              At GiveUmmah Foundation, we value the trust of our donors and supporters. This Refund Policy explains the
              circumstances under which donations and contributions may be refunded. By donating through
              www.giveummah.com, you agree to the terms outlined in this policy.
            </p>
          </div>

          {/* Eligibility for Refund */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">Eligibility for Refund</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                Refunds will only be considered in cases where a donation was made due to a technical error, duplicate
                transaction, or unauthorized payment.
              </li>
              <li>
                Donations once used for a project or disbursed to beneficiaries cannot be refunded under any
                circumstances.
              </li>
              <li>
                All refund requests must be submitted within <span className="font-semibold">7 working days</span> from
                the date of the transaction.
              </li>
            </ol>
          </div>

          {/* Non-Refundable Cases */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">Non-Refundable Donations</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Please note that donations made voluntarily to support a cause are generally non-refundable. Once the funds
              have been allocated to a project or beneficiary, they cannot be returned. Donors are encouraged to review
              all details carefully before proceeding with their contributions.
            </p>
          </div> */}

          {/* Process for Requesting Refund */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">Refund Request Process</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>Send a written request to our official email with transaction details and reason for refund.</li>
              <li>
                Our finance team will verify the details of your request and confirm eligibility as per this policy.
              </li>
              <li>
                Approved refunds will be processed within <span className="font-semibold">10–15 working days</span> and
                credited back to the original payment method.
              </li>
            </ol>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">Dispute Resolution</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Any disputes regarding refunds shall be resolved in accordance with the laws of India. The courts in Jammu
              & Kashmir shall have exclusive jurisdiction in case of any legal proceedings.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-[#bf6f00]" size={28} />
              <h2 className="text-2xl font-bold text-[#000000]">Contact Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Refund Policy is issued by GiveUmmah Foundation, Dangiwacha, Rafiabad, District Baramulla, Jammu and
              Kashmir, 193303 India.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For refund requests or queries, please contact us at:{" "}
              <span className="font-semibold text-[#bf6f00]">tariq@giveummah.com</span>
            </p>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#bf6f00] hover:bg-[#fe9f00] text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
