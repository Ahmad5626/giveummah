import { Navbar } from '@/components/header/Navbar';
import { AuthContext } from '@/context/auth-context';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Profile = () => {
      const {allUserData} = useContext(AuthContext)
      const [profileData, setProfileData] = useState({});
      const {id}=useParams()
      useEffect(() => {
            allUserData.map( (data) => {
              if (data._id === id) {
                
                setProfileData(data);
              }
            });
      })

      console.log(profileData);
      
  return (
    <div>
       <>
       <Navbar/>
              

              

              
              <div className="max-w-4xl flex items-center   flex-wrap mx-auto my-32 lg:my-10 ">

      
        <div id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

                {profileData.RegisteredType == "Institute" ?
               <>
                  <div className="p-4 md:p-12 text-center lg:text-left">
               
                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                     style={{backgroundImage:` ${profileData.profileImage? `url(${profileData.profileImage})` : "url(./assets/user.jpg)"}`}}></div>

                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profileData.instituteName? profileData.instituteName : "Institute Name"}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg> {profileData.instituteCategory? profileData.instituteCategory : "Institute Category"}
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg> {profileData.Address? profileData.Address : "Address"}
                </p>
                <p className="pt-8 text-sm">{profileData.instituteBio? profileData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>


               

                

            </div>
                </>
                :
                <>
                  <div className="p-4 md:p-12 text-center lg:text-left">
               
                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                     style={{backgroundImage:` ${profileData.profileImage? `url(${profileData.profileImage})` : "url(./assets/user.jpg)"}`}}></div>

                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profileData.fullName? profileData.fullName : "Institute Name"}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
               
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg> {profileData.Address? profileData.Address : "Address"}
                </p>
                <p className="pt-8 text-sm">{profileData.instituteBio? profileData.instituteBio : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"}</p>

               

            </div>
                </>
                }
            

        </div>

    
        <div className="w-full lg:w-[300px] h-[340px]">
          {/*  */}
            <img src={`${profileData.profileImage? profileData.profileImage : './assets/user.jpg'} `} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-full"/>
           

        </div>
        </div>
        

             

              {/* No Donations Message */}
              {/* <div className="text-center py-12">
                <h3 className="text-xl font-semibold">No donations in the last 30 days</h3>
              </div> */}

              {/* User Summary */}
             
            </>
    </div>
  )
}

export default Profile
