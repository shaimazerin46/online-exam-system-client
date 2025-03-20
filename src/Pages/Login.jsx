import Lottie from 'lottie-react';
import loginImg from '../assets/lottie/register.json'
import WebButton from '../Components/WebButton/WebButton';
import { Link, useNavigate } from 'react-router';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import SocialButton from '../Components/WebButton/SocialButton';
import FacebookButton from '../Components/WebButton/FacebookButton';
import toast from 'react-hot-toast';



const Login = () => {
    const { login } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    const onSubmit = (data) => {

        const email = data.email;
        const password = data.password;

        login(email, password)

            .then(() => {
                toast('Successfully logged in!!', {
                    duration: 4000,
                    position: 'top-center',
                  
                    // Styling
                    style: {},
                    className: '',
                  
                    // Custom Icon
                    icon: '👏',
                  
                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: '#000',
                      secondary: '#fff',
                    },
                  
                    // Aria
                    ariaProps: {
                      role: 'status',
                      'aria-live': 'polite',
                    },
                  
                    // Additional Configuration
                    removeDelay: 1000,
                  });
                   
                  setTimeout(() => navigate('/'), 2000);
                  reset()
            })


    }
    return (
        <div>
            <div
                style={{ background: "linear-gradient(to right, #205781, #4F959D)" }}
                className='min-h-screen flex items-center'
            >

                <div className='w-[800px] rounded-2xl bg-white  flex items-center mx-auto shadow-2xl p-7'>

                    {/* animation */}

                    <div className='w-[400px] '>
                        <Lottie animationData={loginImg}></Lottie>
                    </div>

                    {/* form */}
                    <div className='w-[400px] '>
                        <h3 className='py-7 text-3xl primary-color font-bold'>Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <input {...register('email', { required: true })}
                                area-invalid={errors.email ? 'true' : 'false'}
                                type="email" placeholder='Enter email' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0' /> <br /><br />
                            {errors.email?.type === "required" && (
                                <p className='text-red-500'>email is required</p>
                            )}
                            <input {...register('password', { required: true })}
                                area-invalid={errors.password ? 'true' : 'false'}
                                type="password" placeholder='Enter password' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0' />
                            {errors.password?.type === "required" && (
                                <p className='text-red-500'>Password is required</p>
                            )}
                            <p className='text-sm py-2'>Don't have an account?<Link className='text-blue-500' to='/auth/register'>Register</Link></p>
                           <div className='flex gap-2 items-center'>
                           <WebButton text={"Submit"}></WebButton>
                           <SocialButton></SocialButton>
                           <FacebookButton></FacebookButton>
                           </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;