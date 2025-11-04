"use client"

import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import {
  Shield,
  Lock,
  CheckCircle,
  Server,
  Globe,
  FileCheck,
  UserCheck,
  AlertTriangle,
  Database,
  Search,
} from "lucide-react"

export default function SecurityCompliance() {
  return (
  <>
  <UpperPage/>
  <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-[#e3be50]/10 to-[#fe9f00]/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#bf6f00] to-[#fe9f00] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Security & Compliance</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Protecting your data and ensuring trust through industry-leading security practices
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-6">
            GiveUmmah's Security and Compliance Process
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At GiveUmmah, we prioritize user security with the utmost seriousness, placing it at the forefront of our
            system and software design and architecture. Each line of code is meticulously crafted to ensure and protect
            the highest levels of security and trust for our donors and beneficiaries.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Likewise, security holds paramount importance in all our business operations. We adopt a comprehensive
            approach to security and compliance, encompassing people, processes, and technology.
          </p>
          <p className="text-gray-700 leading-relaxed">
            GiveUmmah is accessible to every citizen of India, with the goal of addressing economic disparity and
            injustice by supporting the weaker and underprivileged segments of society. Our vision is to foster a united
            and economically robust nation (Ummah).
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">How Does It Work?</h2>
          </div>
          <p className="text-xl text-gray-700 mb-8 italic">The holistic approach</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AppSec */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#e3be50]">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Application Security (AppSec)</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Through this practice, we build security into software applications throughout their lifecycle to
                protect them from threats and vulnerabilities. It involves identifying and mitigating risks, ensuring
                confidentiality, integrity, and availability of the application and its data. Our software is
                meticulously designed and architected by implementing SOA, rendering each software service/module to
                function in isolation, providing the desired functionality with a granular level of security and
                protection of the application and the data.
              </p>
            </div>

            {/* Application Firewall */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#fe9f00]">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Application Firewall</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We implement a specialized security tool that protects web applications from various threats by
                filtering and analyzing traffic at the application layer. It acts as a security intermediary between
                users (donors/beneficiaries) and the application, scrutinizing all communications to ensure only
                authorized actions are allowed.
              </p>
            </div>

            {/* OWASP Top 10 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#e3be50]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">OWASP Top 10</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We mitigate the most common vulnerabilities and threats in our application servers, therefore allowing
                only legitimate traffic to access user data/databases.
              </p>
            </div>

            {/* PCI/DSS */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#fe9f00]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">PCI/DSS Measures</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We are compliant with the PCI/DSS measures and standards to ensure secure payment processing.
              </p>
            </div>

            {/* Anti-fraud */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#e3be50]">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Anti-fraud and Abuse Detection</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We make use of the technology to identify and prevent AML, fraudulent activities across all transactions
                and digital interactions. We check every account signup for legitimacy and screen every campaign.
              </p>
            </div>

            {/* Encryption */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#fe9f00]">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Use of Encryption, HTTPS</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We make explicit use of HTTPS for higher security and encrypt user credentials and data at every
                API/database interaction.
              </p>
            </div>

            {/* Network Security */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#e3be50]">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Network Security</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We have the right measures and practices in place to protect all digital resources against misuse and
                attacks by deploying all our applications in virtual private network in which external traffic goes
                through a firewall. We have restricted the incoming traffic only to India and detect the user IP and
                location.
              </p>
            </div>

            {/* Systems Security */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#fe9f00]">
              <div className="flex items-center gap-3 mb-4">
                <Server className="text-[#bf6f00]" size={24} />
                <h3 className="text-xl font-bold text-[#000000]">Systems Security</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We ensure our systems run on the latest operating system releases with the most updated patches,
                purposed to run specific workloads with the right access controls in place for improved security and
                accountability.
              </p>
            </div>
          </div>
        </div>

        {/* KYC Verification */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">KYC Verification & Campaign Verification</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="md:w-1/3">
              <div className="bg-[#e3be50]/20 p-6 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                <FileCheck size={80} className="text-[#bf6f00]" />
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700 leading-relaxed mb-4">
                GiveUmmah requires campaign organizers to undergo Know Your Customer (KYC) verification, including
                mobile number verification and identification documents (PAN, Aadhaar, Passport, Driving License, Voter
                ID) recognized by the Reserve Bank of India.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each campaign is thoroughly vetted by the backend team for KYC documents and the legitimacy of the
                campaign is established by thoroughly screening the campaign content, images, supporting documents,
                campaign objectives and fund goal.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Besides this an additional layers of background/reference check is conducted to ensure the authenticity
                of the campaign before it's approved for donation collection on the platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                While the KYC and campaign verification is a manual process as of today, GiveUmmah is working on the
                automation of KYC and campaign verification, leveraging AI with the aim to achieve 100% accuracy. The
                most important part of the campaign screening is that the GiveUmmah management is actively involved in
                verifying each campaign to ensure it's legitimate and authentic before approving it.
              </p>
            </div>
          </div>

          <div className="bg-[#fe9f00]/10 p-6 rounded-lg border-l-4 border-[#fe9f00]">
            <p className="text-gray-700 font-medium">
              Every campaign is manually reviewed by our team to make sure it follows our platform guidelines. We do not
              allow any campaigns to incite hate or violence towards any other party.
            </p>
          </div>
        </div>

        {/* Enhanced Due Diligence */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">Enhanced Due Diligence</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#e3be50]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#000000] mb-4">Beneficiary Identity and Verification</h3>
              <p className="text-gray-700 leading-relaxed">
                If the campaign is for a trust, school or any non-profit organisation, GiveUmmah establishes a close
                contact with the organisation and conducts the credibility verification and campaign verification.
              </p>
            </div>

            <div className="bg-[#fe9f00]/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#000000] mb-4">Fund Withdrawal</h3>
              <p className="text-gray-700 leading-relaxed">
                There is a multi-layered business process to ensure funds are allocated to the legitimate individual or
                the institute for the genuine cause upon verification. In many cases GiveUmmah solicits necessary
                supporting campaign documents, impact reports for fund distribution. 100% funds are distributed to
                beneficiaries.
              </p>
            </div>
          </div>
        </div>

        {/* Regular Checks */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">Regular Checks on Risk Transactions</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            With the help of state-of-the-art anti-fraud tools, our team of specialists reviews donations on all
            campaigns to catch any fraudulent behaviors or activities. They also contact donors to confirm donations.
          </p>
        </div>

        {/* Data Protection */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">Data Protection</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We are committed to protecting the privacy of your data through our internal controls. Where required we
            ensure all third party providers have safeguards in place to protect your data in accordance with applicable
            data protection laws.
          </p>
        </div>

        {/* AML, Fraud detection */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-[#bf6f00]" size={32} />
            <h2 className="text-3xl font-bold text-[#000000]">AML, Fraud Detection and Sanctions</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            We leverage the industry standard (Marble and Ballerine) with a custom home grown solution to screen every
            transaction, account, every campaign for fraud, service abuse, sanctions and AML real-time. We also make
            sure to screen beneficiaries for accounts raising funds on behalf of someone else.
          </p>
          <p className="text-gray-700 leading-relaxed">
            GiveUmmah, a donation platform, addresses Anti-Money Laundering (AML) through several measures,
            including verifying organizers and contributors. They require campaign organizers to verify their identity
            through KYC procedures, such as mobile number verification and identification documents. Contributors are
            also restricted to using standard payment methods and may need to provide their PAN for cash payments above
            a certain limit. Furthermore, GiveUmmah ensures compliance with regulations and scrutinises beneficiaries'
            identities.
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#e3be50]/20 p-4 rounded-full">
                <Shield size={48} className="text-[#bf6f00]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#000000] mb-2">Your Security Is Our Priority</h3>
            <p className="text-gray-700">
              GiveUmmah is committed to maintaining the highest standards of security and compliance to protect our
              users and their data.
            </p>
          </div>
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

      {/* Footer */}
    
    </div>
    <Footer/>
  </>
  )
}
