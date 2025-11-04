import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { baseUrl } from "@/utils/Constant";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/header/Navbar";
import UpperPage from "@/components/upperpage/UpperPage";
const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/send-otp`, { userEmail: email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password`, {
        userEmail: email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
   <>
    <UpperPage/>
   <Navbar/>
     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md my-10">
      {step === 1 && (
        <>
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          <Button className="w-full mt-3  bg-black text-white rounded-full" onClick={handleSendOtp}>
            Send OTP
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Label>OTP</Label>
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <Label>New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <Button className="w-full mt-3  bg-black text-white rounded-full" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}

      {step === 3 && (
        <p className="text-green-600 text-center font-semibold">Password reset successful! You can now log in.</p>
      )}

      {message && <p className="text-center text-sm mt-3 text-gray-600">{message}</p>}
    </div>
    <Footer/>
   </>
  );
};

export default ForgetPassword;
