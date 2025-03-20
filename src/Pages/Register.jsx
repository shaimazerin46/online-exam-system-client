import Lottie from 'lottie-react';
import regiImg from '../assets/lottie/login.json'
import { useForm } from "react-hook-form"
import WebButton from '../Components/WebButton/WebButton';
import { GoEye } from "react-icons/go";
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';



const Register = () => {
    const {createUser,updateProfileUser} = useContext(AuthContext)
    
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [showPassword,setShowPassword] = useState(false)
    const onSubmit = (data) => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photo = data.photo
        createUser(email,password)
        .then(()=>
            {
                updateProfileUser(name,photo)
                .then(()=>{
                    toast('Successfully registered!', {
                        duration: 4000,
                        position: 'top-center',
                      
                        style: {color: 'green'},
                        icon: '👏',
                      
                        // Aria
                        ariaProps: {
                          role: 'status',
                          'aria-live': 'polite',
                        },
                        removeDelay: 1000,
                      });
                })
                
            }
        )
    }
    return (
        <div
            style={{ background: "linear-gradient(to right, #205781, #4F959D)" }}
            className='min-h-screen flex items-center'
        >

            <div className='w-[800px] rounded-2xl bg-white  flex items-center mx-auto shadow-2xl p-7'>

                {/* animation */}

                <div className='w-[400px] '>
                    <Lottie animationData={regiImg}></Lottie>
                </div>

                {/* form */}
                <div className='w-[400px] '>
                    <h3 className='py-7 text-3xl primary-color font-bold'>Register</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* name */}
                        <input
                            {...register('name', { required: true })}
                            area-invalid={errors.name ? 'true' : 'false'}
                            type="text"
                            placeholder='Enter your name'
                            className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0'
                        />
                        <br /><br />
                        {errors.name?.type === "required" && (
                            <p className='text-red-500'>Name is required</p>
                        )}

                        {/* photo */}
                        <input {...register('photo', { required: true })}
                            area-invalid={errors.photo ? 'true' : 'false'} type="url" placeholder='Enter photo url' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0' /> <br /><br />
                        {errors.photo?.type === "required" && (
                            <p className='text-red-500'>Photo url is required</p>
                        )}

                        {/* email */}
                        <input {...register('email', { required: true })}
                            area-invalid={errors.email ? 'true' : 'false'} type="email" placeholder='Enter email' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0' /> <br /><br />
                        {errors.email?.type === "required" && (
                            <p className='text-red-500'>Email is required</p>
                        )}

                        {/* password */}
                        <div className="relative w-full">
                            <input
                                {...register("password", {
                                    required: true,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                        message:
                                            "Password must contain at least one uppercase, one lowercase, one number, and be at least 6 characters long",
                                    },
                                })}
                                aria-invalid={errors.password ? "true" : "false"}
                                type={showPassword?'text':'password'}
                                placeholder="Enter password"
                                className="w-full p-3 border-b-[2px] border-[#205781] focus:outline-0"
                            />
                            <button
                            onClick={()=>setShowPassword(!showPassword)}
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                            >
                               {
                                showPassword?  <PiEyeSlash size={20}/>:<PiEyeLight size={20}/>
                               }
                            </button>
                        </div>
                       
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                        <p className='text-sm py-2'>Alrady have an accont?<Link to='/auth' className='text-blue-500'>Login</Link></p>

                       <div className='flex gap-2'>
                       <WebButton text={"Submit"}></WebButton>
                       <button>
                        <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='w-7'/>
                       </button>
                       <button>
                        <img src="https://img.icons8.com/?size=48&id=uLWV5A9vXIPu&format=png" alt="" className='w-7'/>
                       </button>
                       </div>
                        
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Register;