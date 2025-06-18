"use client"

import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import { Shield, Lock, Eye, AlertCircle, FileText, Mail } from "lucide-react"

export default function PrivacyPolicy() {
  return (
   <>

   <Navbar/>
   <UpperPage/>
     <div className="min-h-screen bg-gradient-to-br from-[#e3be50]/10 to-[#fe9f00]/10">
      {/* Header */}
      <div className="pages-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last updated on: 30.05.2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container  px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            This Privacy Policy explains how GiveUmmah or "we" use personal and other types of information collected
            from you when you visit the www.giveummah.com website (the "Site"). This policy does not apply to the
            practices of companies not owned or controlled by GiveUmmah or to people whom GiveUmmah does not employ or
            manage. If you do not agree with our practices, please do not use our Site and/or the Services. Your access
            for using the Site and Services is also subject to the Terms of Use. Anything that is not defined here can
            be found in our Terms of Use Policy.
          </p>
        </div>

        {/* Types of Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Types of Information We Collect</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#bf6f00] mb-3">1. Personal Information</h3>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-[#fe9f00]/30">
              We collect personal information that you provide us when you create your user account. Such personal
              information consists of: your full name, username, email address, your address, country of residence and
              age. This is required for any online transactions you make from the Site ("Personal Information"). We also
              collect your PAN, Aadhar for KYC verification and supporting documents for your campaigns. The platform
              also collects the institute information and supporting documents for institute registration and campaigns.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#bf6f00] mb-3">2. Aggregate and Anonymous Data</h3>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-[#fe9f00]/30">
              Aggregate and anonymous data is information that does not identify you specifically, including data
              collected automatically when you enter our Site ("Non-Personal Data"). This may include cookies, pixel
              tags, web beacons, browser analysis tools and web server logs. This also includes information from the
              devices you use to access our Site on mobile platform, your operating system type or mobile device model,
              browser type, domain, and other system settings, as well as the language your system uses and the country
              and time zone of your device. Our server logs may also record the IP addresses of the devices you use to
              interact with the Site. We may also collect information about a website you were visiting before you came
              to our Site and any website you visit after you leave our Site, if this information is supplied to us by
              your browser. We may also use software tools, such as JavaScript, to measure and collect session
              information, including page response times, download errors, and methods used to browse away from the
              page. Non-Personal Data also includes some data collected by location services.
            </p>
          </div>
        </div>

        {/* Authenticity */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Authenticity of Information provided</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            You hereby represent to us that, the information you provide is and shall be authentic, correct, current,
            and you have all the rights, permissions and consents as may be required to provide such information to us.
            Further, you providing the information to us and our consequent storage, collection, usage, transfer, access
            or processing of the same, shall not be in violation of any third party agreement, laws, charter documents,
            judgments, orders and decrees.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            We and each of our entities officers, directors, contractors or agents shall not be responsible for the
            authenticity of the information that you provide to us.
          </p>

          <p className="text-gray-700 leading-relaxed">
            You shall indemnify and hold us harmless and each of our entities, officers, directors, contractors or
            agents and any third party relying on the information provided by you in the event you are in breach of this
            Privacy Policy.
          </p>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">How We Use Personal Information and Non-Personal Data</h2>
          </div>

          <p className="text-gray-700 mb-4">We use Personal Information and Non-Personal Data to:</p>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Build, operate and improve our Site and the Services;</li>
            <li>Perform user analytics;</li>
            <li>Provide customer support;</li>
            <li>
              Communicate with you and provide additional information that may be of interest to you such as, for
              example, Sending causes that we believe may be of interest to you based on your geographic location and
              previous use of the Service;
            </li>
            <li>Send you reminders, technical notices, updates, security alerts and support, and</li>
            <li>
              Manage our everyday business needs such as Site administration, analytics, fraud prevention, or to comply
              with the law.
            </li>
          </ol>
        </div>

        {/* Credit/Debit Card Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Use of your Credit/Debit Card Details</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Your credit and debit card details submitted while making a donation on the Site goes through the safe and
            secure transaction process provided by our payment gateway partners, which only include the most trusted
            payment gateways in India. Furthermore, you will also be taken through a 3D secure verification such as
            "Verified by Visa" or "Master Card 3D Secure" password protected process to prevent any misuse of your
            debit/credit cards. Your credit/debit card details (card numbers, passwords, CVV numbers, etc.) are not
            stored by GiveUmmah or the website. Such information is only used by certified payment gateway to complete
            the payment transaction.
          </p>
        </div>

        {/* When and Why We Disclose */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">
              When and Why We Disclose Personal Information and Non-Personal Data
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Except as provided herein, we will not display on the Site, or otherwise disclose your Personal Information
            to any third parties unless it is necessary to provide the Services, when required by law, or if we have
            good faith belief that such action is reasonably necessary to:
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>comply with current judicial proceedings, a court order or legal process served on us;</li>
            <li>
              protect and defend our rights, property and interests, including by enforcing our agreements, policies and
              Terms of Use;
            </li>
            <li>respond to claims that any submitted content violates the rights of third parties;</li>
            <li>respond to your requests for customer service;</li>
            <li>protect the rights, property or personal safety of giveummah.com, its users and the public;</li>
            <li>
              in connection with, or during negotiations of, any merger, sale of company assets, financing or
              acquisition of all or a portion of our business by another company, or
            </li>
            <li>with your consent to share the information.</li>
          </ol>

          <p className="text-gray-700 leading-relaxed mb-4">
            If you have created an account on the Site, some information about you will be publicly available, such as:
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>your account name;</li>
            <li>any information you choose to add to your profile (such as a picture, bio, your location);</li>
            <li>Causes you've backed;</li>
            <li>Causes you've launched / posted / created;</li>
            <li>any comments you have posted on the Site.</li>
          </ol>

          <p className="text-gray-700 leading-relaxed mb-4">
            If you are a Donor, we will share your account name and the amount of your donation and your payment
            information with our third-party payment processor.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We may share Non-Personal Data with analytics companies to learn information about how our users interact
            with the Site. This enables us to optimize the Service and improve our efforts. See also "Third Party
            Analytics" below. We will never sell your Personal Information or Non-Personal Data.
          </p>
        </div>

        {/* Anonymity */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Anonymity</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            The Site allows any Donor to make an "anonymous" donation to a Cause. By choosing to be anonymous, the Site
            does not publish your name or image in the cause donor information.
          </p>
        </div>

        {/* Your Choices */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Your Choices</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            You can opt-out of receiving our emails by following the unsubscribe instructions included in each such
            email or by contacting us at tariq@giveummah.com. You can modify or delete the Personal Information you have
            provided to us by logging in and updating your profile. We will retain your information only for as long as
            needed to provide you the Services or as long as necessary to comply with our legal obligations, resolve
            disputes, and enforce our agreements.
          </p>
        </div>

        {/* Third Party Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Third Party Analytics</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy only addresses the use and disclosure of information by GiveUmmah. We may use analytics
            services to help us analyze the information we have collected from you. These analytics services may use
            cookies, web beacons and other devices and technologies to track traffic data. Data that they collect
            typically includes, but is not limited to, your IP address, your ISP, the browser you use to visit our Site.
            This Privacy Policy does not apply to, and we are not responsible for, such technologies placed by third
            party analytics services.
          </p>
        </div>

        {/* Children */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Children</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            The Site is not directed at children under the age of 18, and does not consciously collect any Personal
            Information from children under the age of 18. We request that all users be at least 18 years old (or a
            legal age in the respective jurisdiction) or have received parental consent and supervision when using the
            Service.
          </p>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Security</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            The Site has adopted reasonable security practices and procedure to ensure that the personal information
            collected is secure. Your personal information is held on secure servers. You agree that such measures are
            secured and adequate when you register with us/create an account. While it is our endeavor to take all
            reasonable and appropriate steps to keep secure any information which we hold about you and prevent
            unauthorized access, you acknowledge that the internet is not 100% secure, and that we cannot provide any
            absolute assurance regarding the security of your personal information.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We will not be liable in any way in relation to any breach of security or unintended loss or disclosure of
            information caused by us in relation to your personal information. Notwithstanding anything contained in
            this Privacy Policy or elsewhere, we shall not be held responsible for any loss, damage or misuse of your
            personal information, if such loss, damage or misuse is attributable to a Force Majeure Event. "Force
            Majeure Event" shall mean any event that is beyond the reasonable control of us and shall include, without
            limitation, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of
            any kind, riots, insurrection, war, acts of government, computer hacking, unauthorized access to computer,
            computer system or computer network, computer crashes, breach of security and encryption (provided beyond
            reasonable control of us), power or electricity failure or unavailability of adequate power or electricity.
          </p>
        </div>

        {/* Consent */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Consent</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            By using the Site and/ or by providing your information, you consent to the collection and use of the
            information you disclose on the Site in accordance with this Privacy Policy, including but not limited to
            your consent for sharing your information as per this Privacy Policy.
          </p>
        </div>

        {/* Modifications */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Modifications</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            We may occasionally modify the Privacy Policy. All changes will be effective upon posting on the Site. You
            can determine when the Privacy Policy was last revised by referring to the "Last Updated" legend at the top
            of the page. You agree to be bound by any such changes if you continue to use the Site after such changes
            have been posted. We may change, restrict access to, suspend or discontinue the Site or the Service, or any
            portion thereof, at any time.
          </p>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Questions about Our Privacy Policy</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy, you may contact us by e-mail at
            tariq@giveummah.com
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

      {/* Footer */}
    
    </div>
    <Footer/>
   </>
  )
}
