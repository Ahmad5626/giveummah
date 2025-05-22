import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function FundraisingSection() {
  return (
    <div className="min-h-screen  max-w-7xl mx-auto">
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-6 p-6 bg-[#f7f2f2]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Fundraise with a community that believes in giving
            </h1>
            <p className="text-gray-700 text-lg">
              LaunchGood is built for Muslim fundraisers, offering{" "}
              <span className="font-bold">0% platform fees</span> and a network
              of generous donors. Your cause deserves the best chance—start
              fundraising now.
            </p>
            <div className="pt-4">
              <Button className="rounded-full px-8 py-6 text-base bg-gray-900 hover:bg-gray-800 text-white">
                Start fundraising today
              </Button>
            </div>
            <div className="pt-6">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Fundraising dashboard illustration"
                width={400}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-gradient-to-r from-[#f7d2f5] to-[#f0c7ed]  p-8 rounded-3xl flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-purple-600">Easy.</h2>
              <h2 className="text-4xl font-bold text-purple-600">Trusted.</h2>
              <h2 className="text-4xl font-bold text-purple-600">Inspiring.</h2>
            </div>

            <p className="text-gray-700 text-lg">
              Give with confidence—every fundraiser is vetted, and making an
              impact is just a tap away.{" "}
              <a href="#" className="text-purple-600 underline font-medium">
                Learn more.
              </a>
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Trusted by those you trust
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white overflow-hidden border-2 border-white shadow-sm"
                  >
                    <img
                      src={`/placeholder.svg?height=100&width=100`}
                      alt={`Trusted community member ${i}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
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
