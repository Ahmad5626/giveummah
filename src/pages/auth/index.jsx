
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/header/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GoogleLoginButton from "@/components/googlelogin/GoogleLoginButton";


const Authpage = () => {


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
console.log(signUpFormdata);


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
              <span className="text-sm">Facebook</span>
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

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={signInFormdata.password}
                    onChange={handleChangeSignInFormdata}
                  />
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
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={registerHandleSubmit} className="space-y-4">
                <div>
                  <Label>User Name</Label>
                  <Input
                    type="text"
                    name="userName"
                    placeholder="Enter your name"
                    value={signUpFormdata.userName}
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

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={signUpFormdata.password}
                    onChange={handleChangeSignUpFormdata}
                  />
                </div>
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
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Madrasa">Madrasa</SelectItem>

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
