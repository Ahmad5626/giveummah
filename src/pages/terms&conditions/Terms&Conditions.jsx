"use client"

import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import { FileText, Shield, AlertTriangle, Users, CreditCard, Scale, Eye, Lock, Globe, Mail } from "lucide-react"

export default function TermsConditions() {
  return (
   <>
   <UpperPage/>
   <Navbar/>
     <div className="min-h-screen bg-gradient-to-br from-[#e3be50]/10 to-[#fe9f00]/10">
      {/* Header */}
      <div className="pages-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <FileText size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg opacity-90">Last Updated On: 30/05/2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container  px-4 py-12 max-w-7xl mx-auto">
        {/* Disclaimer */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Disclaimer for Acceptance</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Please read these Terms of Use of website and Terms and Conditions carefully before using www.giveummah.com
            (hereafter referred as 'website' or the 'Site' or the 'Platform').The Website is owned and operated by GiveUmmah Foundation. By using the
            service/services in any manner, including, but not limited to, visiting or browsing the site or contributing
            content, information, or other materials or services to the site, payments, you agree to be bound by this
            agreement. These Terms of Use and associated Terms and Conditions apply to all who access this website,
            including but not limited to, Cause Creators and Donors. These Terms of Use apply to you even if you are a
            guest and not a registered user of the Website. If you do not agree to these Terms of Use or Terms and
            Conditions or the Privacy Policy, you must not access or use the Website.
          </p>
        </div>

        {/* General Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">General Terms of Use</h2>
          </div>

          {/* Revision/Modification */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#bf6f00] mb-3">1. REVISION/MODIFICATION OF TERMS OF USE</h3>
            <p className="text-gray-700 leading-relaxed pl-4 border-l-2 border-[#fe9f00]/30">
              GiveUmmah reserves the right, at its sole discretion, to modify or replace these Terms of Use, or change,
              suspend, or discontinue the Site and its services (including, but not limited to, the availability of any
              feature, database, or Content) at any time for any reason. GiveUmmah may also impose limits on certain
              features and services or restrict your access to parts or all the website without notice or liability. It
              is your responsibility to check the Terms of Use periodically for changes. Your continued use of the
              website following the posting of any changes to the Terms of Use constitutes acceptance of those changes.
            </p>
          </div>

          {/* Eligibility */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#bf6f00] mb-3">2. ELIGIBILITY TO USE THE SITE</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once you successfully register on www.giveummah.com or perform any activity which includes but not limited
              to browsing site content, filling forms, cause creation, payments or usage of any other native or third
              party services linked to this site, you:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>You have the authority to enter into this agreement.</li>
              <li>
                Your decision to enter into this agreement and your use of the Platform will not violate any applicable
                law, regulation, or ordinance.
              </li>
              <li>
                Your decision to enter into this agreement and your use of the Platform will not infringe the rights of
                any third parties.
              </li>
              <li>
                All information you submit is truthful, current, complete and accurate and you will not misrepresent
                yourself to the public through your use of the Platform.
              </li>
              <li>
                You will never use the Platform, or any services we provide to you, in a manner that violates the law or
                the legal rights of a third party.
              </li>
              <li>
                You are over the age of majority in the jurisdiction in which you live (i.e. at least 18, and in some
                cases 19) or, if you are a minor over the age of 13, you may only use the Platform with the permission
                and supervision of your parent or legal guardian.
              </li>
              <li>You are not using another member's account without her/his permission.</li>
              <li>Any other legal compliances that may arise from time to time in your jurisdiction.</li>
              <li>You have not been previously restricted, suspended or terminated by us.</li>
            </ol>
          </div>

          {/* Password Security */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#bf6f00] mb-3">3. PASSWORD AND ACCOUNT SECURITY</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are solely responsible for maintaining the confidentiality of your password associated with your
              account. Accordingly, you understand and agree that you are solely responsible for any and all activities
              that occur under your account.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">You agree to:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>
                immediately notify us at via tariq@giveummah.com of any unauthorized use of account or any other breach
                of security, and
              </li>
              <li>
                ensure that you log off and exit from your account at the end of each session when accessing the
                Services.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              GiveUmmah will not be liable for any loss or damage arising from your failure to comply with this section.
            </p>
          </div>
        </div>

        {/* Prohibited Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Prohibited Activities</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using the Site, you agree that you will not use the Site and the Service for any unlawful
            or prohibited purpose. You may not attempt, through any means, to gain unauthorized access to any part of
            the Site or the Service, other account, computer system or network connected to our server.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Without limiting the foregoing, you will not use the Site and the Services to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              post or otherwise transmit any User Content that is unlawful, false, misleading, inaccurate, harmful,
              threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic,
              libellous, invasive of another's privacy, hateful racially, ethnically or that encourages conduct that
              would be considered a criminal offense
            </li>
            <li>depicts or advocates the use of illicit drugs</li>
            <li>makes use of offensive language or images</li>
            <li>violate any applicable local, state, national, international or other law or regulation</li>
            <li>interfere with, disrupt or damage the Services or servers or networks connected to the Services</li>
            <li>harvest or collect email addresses or other contact information of other Users</li>
            <li>impersonate any person or entity, or falsify or otherwise misrepresent yourself</li>
            <li>use automated scripts to access, search collect information or otherwise interact with the Services</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Intellectual Property</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Site contains trademarks, service marks and domain names owned by GiveUmmah. Unless specifically noted
            that such trademarks, service marks or domain names belong to a third party, GiveUmmah owns all trademarks,
            service marks and domain names displayed on the Site, whether registered or unregistered, including but not
            limited to, the name (GiveUmmah), our logo, our design patterns and our other graphics.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">You must not:</p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Modify copies of any materials from this site</li>
            <li>
              Use any illustrations, photographs, video or audio sequences, or any graphics separately from the
              accompanying text
            </li>
            <li>
              Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials
              from this site
            </li>
          </ol>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Payment Processing</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Payment processing services for this are provided by payment provider(s) and are subject to their Account
            Agreement which includes the Service Agreement. Where applicable, the payment provider(s) may facilitate
            money transmission services. By agreeing to these Terms, you agree to be bound by their Connected Account
            Agreement, Services Agreement, and any other Terms and Condition introduced by them that may be modified
            and/or amended from time to time. GiveUmmah is not responsible for the performance of payment provider(s) at
            any given point of time.
          </p>
        </div>

        {/* User Rights */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">User Rights</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            GiveUmmah and its associated partners will endeavour to the best of its ability to conduct background checks
            and due diligence on Beneficiaries and if circumstances warrant it, on Fundraisers as well. However, as a
            Member you are solely responsible for asking questions and conducting your own background check to the
            extent you feel is necessary before you make a Donation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You agree and understand that all Donations are made voluntarily and at your sole discretion and risk.
            GiveUmmah doesn't guarantee that Donations will be used as promised, that the Cause Owner will deliver what
            was promised or that the Cause/Fundraising Page will achieve its goals and/or is not fraudulent in nature
            and/or created for illegal activity.
          </p>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Security</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The Site has adopted reasonable security practices and procedure to ensure that the personal information
            collected is secure. Your personal information is held on secure servers. You agree that such measures are
            secured and adequate when you register with us/create an account. While it is our endeavor to take all
            reasonable and appropriate steps to keep secure any information which we hold about you and prevent
            unauthorized access, you acknowledge that the internet is not 100% secure, and that we cannot provide any
            absolute assurance regarding the security of your personal information.
          </p>
        </div>

        {/* Disclaimer of Warranties */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Disclaimer of Warranties</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed font-medium">
              ALL INFORMATION AVAILABLE AT OUR SITE IS PROVIDED ON "AS IS," "WITH ALL FAULTS" AND "AS AVAILABLE" BASIS
              AND, TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, GIVEUMMAH DISCLAIMS ALL WARRANTIES,
              EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
            </p>
          </div>
        </div>

        {/* Terms for Donors */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#fe9f00]">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Terms for Donors/Contributors</h2>
          </div>
          <h3 className="text-lg font-semibold text-[#bf6f00] mb-3">General Terms</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              I understand that "www.giveummah.com" is a technology platform provider and not the fund collector by
              itself except the proprietary causes created by www.giveummah.com if any.
            </li>
            <li>
              I have clearly understood the project and the Purpose, which the cause creator has clearly declared on the
              fund-raising page and am giving funds on my own responsibility.
            </li>
            <li>
              My donations will go to the Beneficiary via cause creator and will be utilized by the Beneficiary. The
              site is only facilitating the collection of donations and is not responsible in any way for the end
              utilization of the donations.
            </li>
            <li>
              The site owner and the payment gateway will deduct their fees and applicable taxes before providing the
              funds to the Recipient.
            </li>
            <li>
              My donation is voluntarily made to a cause listed on the Site for the purpose of raising funds. The
              donation has not been made for any monetary returns like equity or profit share, neither it is to be
              considered as loan to the cause creator.
            </li>
            <li>
              Tip usage: Giveummah charges no platform fee and 100% of your donation goes to the cause. The platform provide users with the option to provide a tip. This payment is voluntary and is not required to use the core services of GiveUmmah. All tips are final and non-refundable, and are received by GiveUmmah to support the maintenance and development of the platform.
            </li>
            <li>
              “Beneficiary” means the individual, family, group, charity or other recipient identified in a Campaign as the party for whose benefit the donations are sought through the Services. The Beneficiary may be the Campaign Organizer itself, or it may be a third party, as identified in the Campaign.


            </li>
            <li>
              “Campaign / fundraiser” means a cause, goal, or event for which a Campaign Organizer seeks donations through the Services.

            </li>
            <li>
              “Campaign Organizer” means an individual or organization who creates, launches or manages a Campaign. The Campaign Organizer may be the Beneficiary itself, or it may be a third party, as identified in the Campaign.

            </li>
            <li>“Donor” means an individual or organization who donates to a Campaign.</li>
          </ol>
        </div>

        {/* Terms for Cause Creators */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Terms for Cause Creators/Fund Raisers</h2>
          </div>
          <h3 className="text-lg font-semibold text-[#bf6f00] mb-3">General Conditions</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              The Cause creator agrees that he knows the meaning of the term "Zakat" and has the full understanding of
              the underlying principles of Zakat collection and disbursement. www.giveummah.com is only a platform
              provider and would not be responsible for any deviation from these principles except what is mentioned in
              our FAQs.
            </li>
            <li>
              Cause Creators are solely responsible for utilizing the funds for the Purpose mentioned in our
              fund-raising page. The platform is not responsible in any way whatsoever towards the end utilization of
              funds for any beneficiary.
            </li>
            <li>
              This fund-raising page on the Platform will be available to the general public for donations only after
              the review and due diligence from the platform Therefore, you agree that the site owner has full rights to
              ask you for required documentation or further information.
            </li>
            <li>
              You also agree that it is the sole discretion of the platform provider to approve, hold or reject the
              cause without any notice or clarifications.
            </li>
            <li>
              You understand that the platform accepts donations only from banks in India and it is to be used only for
              donation purposes towards the cause.
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
            This Agreement shall be governed by and construed in accordance with the laws of India. In the event of a
            dispute, the courts of India shall have absolute and exclusive jurisdiction. If any term or provision of
            this Agreement where the User originates from is found by a court of competent jurisdiction to be invalid,
            illegal, or otherwise unenforceable, that term or provision will be deemed modified to the extent necessary
            to render such term or provision enforceable.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-[#e3be50]">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-[#bf6f00]" size={28} />
            <h2 className="text-2xl font-bold text-[#000000]">Contact Information</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            This Website is operated by (GiveUmmah Foundation ) Dangiwacha, Rafiabad, district Baramulla, Jammu and Kashmir, 193303
            India.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All notices should be sent to: <span className="font-semibold text-[#bf6f00]">tariq@giveummah.com</span> via
            email. All other feedback, comments, requests for technical support, and other communications relating to
            the Website should be directed to: <span className="font-semibold text-[#bf6f00]">tariq@giveummah.com</span>
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

