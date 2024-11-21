import { Eye, EyeClosed, KeyRound, LoaderIcon, Mail, MessageSquare, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthImagePattern } from "../components/AuthImagePattern"

const SignUpPage = () => {
    const [showPassword ,setShowPassword ] = useState(false)
    const [ formData, setFormData ] = useState({
        fullName: "",
        email: "",
        password: "",
    })
  return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* left side - Form  */}
            <div className=" flex flex-col justify-center items-center px-6 sm:p-12">
                <div className=" w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center  mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                        <div className=" w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                        <p className=" text-base-content/60">Get started with new account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={e => e.preventDefault()} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className=" label-text font-medium">Full Name</span>
                            </label>
                            <div className=" relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData,fullName: e.target.value})} />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className=" label-text font-medium">Email</span>
                            </label>
                            <div className=" relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className=" label-text font-medium">Password</span>
                            </label>
                            <div className=" relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword? "text":"password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Enter Your Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword?
                                    <Eye className="h-5 w-5 text-base-content/40" /> :
                                    <EyeClosed className="h-5 w-5 text-base-content/40" />
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            onClick={""}
                        >
                            <LoaderIcon className="h-5 w-5 animate-spin" />
                            Loading...
                        </button>
                    </form>

                    <div className=" text-center">
                        <p className=" text-base-content/60">
                            Already have an account?{" "}
                            <Link to='/login' className="link link-primary">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side - Image */}
            <AuthImagePattern
            title={"Join Our Community"}
            subtitle={"Connect with friends, share moments, and stay in touch with your loved ones."} 
            /> 
        </div>
    )

}

export default SignUpPage