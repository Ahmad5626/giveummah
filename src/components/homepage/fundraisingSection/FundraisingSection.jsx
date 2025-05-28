import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { ArrowUpRight } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
const features = [
  {
    img:"./assets/Ulama1.jpg",
  },
  {
    img:"./assets/Ulama2.jpg",
  },
  {
    img:"./assets/Ulama3.jpg",
  },
  {
    img:"./assets/Ulama4.jpg",
  }
]
export default function FundraisingSection() {
  const {buttonData}=useContext(AuthContext)
  return (
    <div className="min-h-screen  max-w-7xl mx-auto">
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-6 p-10  bg-[#F4F4F4]">
            <h1 className="text-4xl md:text-4xl  font-bold text-gray-900 leading-tight">
              Fundraise with Faith, Give with Impact – For the Ummah, By the Ummah!

            </h1>
            <p className="text-gray-700 text-lg">
             GiveUmmah is the free crowdfunding platform for Muslims worldwide for students, mosques, madrasas, emergencies or personal need with *no platform fees*. Launch your campaign in minutes and receive 100% donations directly. Start today!

            </p>
            <h4>Your Cause, Our Ummah’s Responsibility.</h4>
            <div className="pt-4">
              <Button className="rounded-full px-8 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                <Link to={buttonData.fundraiseWithFaithButton}>

                Start fundraising today
                </Link>
              </Button>
              
            </div>
            <div className="pt-6">
              <img
                src="./assets/image-1.png"
                alt="Fundraising dashboard illustration"
               
               
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-gradient-to-r from-[#FDEDFC] to-[#E0E4F3]  p-8 rounded-3xl flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-purple-600">Together We Give</h2>
              <h2 className="text-4xl font-bold text-purple-600"> Together We Thrive—Trusted</h2>
              <h2 className="text-4xl font-bold text-purple-600"> Transparent, United.
</h2>
            </div>

            <p className="text-gray-700 text-lg">
             When the Ummah unites, miracles happen. GiveUmmah brings us closer—ensuring **every donation is verified, every need is genuine, and every contribution makes a difference. Your generosity uplifts sacred institutions worldwide. Compliance ( url to compliance )
            
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 font-sans">
                Trusted by esteemed Ulama. 

              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {features.map((i, index) => (
                  <div
                    key={index}
                    className=" rounded-full bg-white overflow-hidden border-2 border-white shadow-sm"
                  >
                    <img
                      src={i.img}
                      alt={`Trusted community member ${i}`}
                     
                      className="object-cover w-30 h-40 "
                    />
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
}
