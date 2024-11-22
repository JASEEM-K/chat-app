import { Camera, Mail, User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

const ProfilePage = () => {
    const { authUser , isUpdatingProfile , updateProfile } = useAuthStore()

    const handleImageUpload = () => {
        updateProfile
    }

  return (

    <div className="h-screen px-20">
        <div className=" max-w-2xl mx-auto p-4 py-8">
            <div className="bg-base-300 rounded-xl p-6 space-y-8">
                <div className=" text-center">
                    <h1 className="text-2xl font-semibold ">Profile</h1>
                    <p className="mt-2">Your Profile Settings</p>
                </div>

                {/* avatar upload section */}

                  <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                          <img src={"/avatar.png" }
                              alt="Profile"
                              className="size-32 rounded-full object-cover border-4" />
                          <label
                              htmlFor="avatar-upload"
                              className={` absolute bottom-0 right-0 
                                bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer
                                transition-all duration-200 
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                              <Camera className="w-5 h-5 text-base-200 " />
                              <input
                                  type="file"
                                  id="avatar-upload"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  disabled={isUpdatingProfile} />
                          </label>
                      </div>
                      <p className="text-sm text-zinc-400">
                          {isUpdatingProfile ? "Uploading..." : "Click the camera icon to to Update your photo"}
                      </p>
                  </div>

                  <div className="space-y-6">
                      <div className="space-y-1.5">
                          <div className="text-sm text-zinc-400 flex items-center gap-2">
                              <User className="w-5 h-5" />
                              Full Name
                          </div>
                          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="space-y-1.5">
                          <div className="text-sm text-zinc-400 flex items-center gap-2">
                              <Mail className="w-5 h-5" />
                                Email Address
                          </div>
                          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                      </div>
                  </div>

                  <div className="mt-6 bg-base-300 rounded-xl p-6">
                    <h2 className="text-lg font-medium mb-4 ">Account Information</h2>
                    <div className="space-y-3 text-sm">

                        <div className="flex items-center justify-between border-b py-2 border-zinc-700">
                            <span>Member Since</span>
                            <span>{authUser.createdAt?.split("T")[0]}</span>
                        </div>

                        <div className="flex items-center justify-between border-b py-2 border-zinc-700 ">
                            <span>Account Status</span>
                            <span className="text-lime-500">Active</span>
                        </div>


                    </div>
                  </div>

            </div>
        </div>
    </div>

  )
}

export default ProfilePage