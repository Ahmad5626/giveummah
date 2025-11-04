
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../context/auth-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/header/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GoogleLoginButton from "@/components/googlelogin/GoogleLoginButton";
import FacebookLoginBtn from "@/components/facebookLoginBtn/FacebookLoginBtn";
import { Link, Navigate } from "react-router-dom";


const Authpage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const {
    signInFormdata,
    setSignInFormdata,
    signUpFormdata,
    setSignUpFormdata,
    handleChangeSignUpFormdata,
    handleChangeSignInFormdata,
    checkIfSignInFormIsValid,
    checkIfSignUpFormIsValid,
    registerHandleSubmit,
    loginHandleSubmit,
    Toaster,
    activeTab,
    setActiveTab

  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }



  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5] px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">


          {/* Social buttons */}
          <div className="flex justify-between gap-4 mb-4">


            <span className="text-sm"><GoogleLoginButton /></span>

            <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-full py-2">
              <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" className="w-5 h-5 mr-2" />
              <span className="text-sm"><FacebookLoginBtn /></span>
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t" />
            <span className="mx-2 text-gray-500 text-sm">or {activeTab} in with</span>
            <hr className="flex-grow border-t" />
          </div>

          <Tabs value={activeTab} defaultValue="signin" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 bg-[#f3f3f3] mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={loginHandleSubmit} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="userEmail"
                    placeholder="Enter your email"
                    value={signInFormdata.userEmail}
                    onChange={handleChangeSignInFormdata}
                  />
                </div>

                <div className="relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={signInFormdata.password}
                    onChange={handleChangeSignInFormdata}
                    className="pr-10" // padding-right for icon space
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
                  Forgot your password?
                </Link>
              </div> */}

                <Button
                  type="submit"
                  className="w-full bg-black text-white rounded-full"
                  disabled={!checkIfSignInFormIsValid()}
                >
                  Log in
                </Button>
                <div className="text-right" >
                  <Link to="/forgot-password" className="text-right text-sm text-gray-500 hover:underline cursor-pointer"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={registerHandleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    value={signUpFormdata.fullName}
                    onChange={handleChangeSignUpFormdata}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="userEmail"
                    placeholder="Enter your email"
                    value={signUpFormdata.userEmail}
                    onChange={handleChangeSignUpFormdata}
                  />
                </div>

                <div className="relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={signUpFormdata.password}
                    onChange={handleChangeSignUpFormdata}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>


                <div className="relative">
                  <Label>Confirm Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confromPassword"
                    placeholder="Confirm your password"
                    value={signUpFormdata.confromPassword}
                    onChange={handleChangeSignUpFormdata}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">Password must be 8+ characters, include uppercase, number, and special character.</p>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Registered Type </Label>
                  <Select defaultValue=""
                    name="RegisteredType"
                    value={signUpFormdata.RegisteredType}
                    onValueChange={(value) =>
                      setSignUpFormdata({ ...signUpFormdata, RegisteredType: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Individual" className="bg-white hover:bg-gray-200">Individual</SelectItem>
                      <SelectItem value="Institute" className="bg-white hover:bg-gray-200"> Institute</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white rounded-full"
                  disabled={!checkIfSignUpFormIsValid()}
                >
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => setActiveTab("signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authpage;
