import React from 'react'
import leaf1 from '../../../assets/leaf1.png'
import leaf2 from '../../../assets/leaf2.png'
import leaf4 from '../../../assets/leaf4.png'
import leaf5 from '../../../assets/leaf5.png'
import BlurText from "../../textMotion/BlurText";
import AnimatedContent from '../../textMotion/AnimatedContent'

function Hero() {
  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  return (
   <>
 
     <div className="relative w-full h-[80vh] md:h-[90vh] bg-[url('./assets/banner-img1.png')] bg-white bg-cover  flex items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
      <div className="absolute w-full h-full">
      <AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  config={{ tension: 80, friction: 20 }}
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
>
  
   <img src={leaf1} alt="" className="hidden md:block absolute top-24 left-60 w-24 h-24  opacity-80" />
        <img src={leaf4} alt="" className="hidden md:block absolute top-50 right-0 w-32 h-32  opacity-80" />
</AnimatedContent>

        <img src={leaf2} alt="" className="hidden md:block absolute bottom-60 left-20 w-20 h-20 -rotate-12 opacity-80" />
        <img src={leaf5} alt="" className="hidden md:block absolute bottom-20 right-100 w-20 h-20 -rotate-12 opacity-80" />
       
        {/* <img src={leaf5} alt="" className="hidden md:block absolute bottom-20 right-20 w-24 h-24 rotate-12 opacity-80" /> */}
      </div>
      
      {/* Subtle background pattern */}
      {/* <div className="absolute inset-0 bg-[url('/pattern.png')] bg-center opacity-10"></div> */}
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl  font-[700] mb-6">
     
           <span className="bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent"> Build the Future</span> <span className="bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent">of Deen</span>
        </h1>
          
        <p className="text-center ">
           <BlurText
  text="Let your voice be heard. It's more than a donation, it's a vote for a better world!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className='text-lg  md:text-[23px] mb-10  '
/>
           {/* <span className="text-amber-700">donation</span> */}
        </p>
        
        <h2 className="text-2xl md:text-3xl font-medium mb-8">Make a Difference Today!</h2>
        
        <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-yellow-500">
          Contribute Now
        </button>
      </div>
    </div>
   </>
  )
}

export default Hero