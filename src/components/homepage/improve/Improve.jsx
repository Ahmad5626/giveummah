// components/DonateSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ImproveRightImg from "../../../assets/Improve-right-img.png";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Improve() {
  const {buttonData}=useContext(AuthContext)
  return (
    <section className=" rounded-md   bg-[url('./assets/Improve-bg.png')] ">
      <div className="flex justify-between flex-wrap md:flex-nowrap gap-8 items-center relative md:h-[500px] my-8 md:my-0">
        {/* Left Section */}
        <div className="pl-12 md:w-1/2 py-8 md:py-0" >
          <h2 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#CF9F3B] to-[#FEE976] text-transparent bg-clip-text">
           Honor Their Knowledge - Uplift Their Lives: Fair Wages for Our Ulama
          </h2>
          <p className="text-[white] text-2xl mb-6">
           While our Ulama dedicate their lives to teaching Quran, many can't afford basic needs. Please help us raise teacher salaries from ₹10,000 to 30,000 today.

          </p>
          <Button className="bg-black text-white hover:bg-gray-800 bg-gradient-to-b from-[#CF9F3B] to-[#FEE976] text-[balck] font-bold font-sans rounded-full  px-8 py-6 mt-6">
            {/* <Link to={buttonData.honorTheirButton}> */}
<Link to="/campaignDetails/6858f205e720a63f47739199">
            Donate Now
            </Link>
          </Button>
        </div>

        {/* Right Section - Placeholder Image */}
        <div className="flex justify-center items-center relative right-0 h-[500px]" >
          <img className="h-full" src="./assets/Improve_the_lives_of_Ulama.jpg"></img>
          <div className="absolute bottom-0 right-0 w-[35%] h-[35%] ">
              <img src="./assets/Alim-Teaching.png" className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
