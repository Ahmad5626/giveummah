// components/DonateSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Improve() {
  return (
    <section className="bg-gray-200 rounded-md p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="md:pl-12">
          <h2 className="text-4xl font-bold mb-4">
            Improve The Lives <br /> of Ulama
          </h2>
          <p className="text-gray-700 mb-6">
            In a world where creativity knows no bounds, the sun rises over the
            horizon, casting a golden glow on the tranquil sea.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            Donate Now
          </Button>
        </div>

        {/* Right Section - Placeholder Image */}
        <div className="flex justify-center items-center">
          <img className=""></img>
        </div>
      </div>
    </section>
  );
}
