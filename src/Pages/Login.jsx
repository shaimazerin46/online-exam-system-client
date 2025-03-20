import Lottie from 'lottie-react';
import loginImg from '../assets/lottie/register.json'
import WebButton from '../Components/WebButton/WebButton';

const Login = () => {
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
                    <form>
                        
                        <input type="email" placeholder='Enter email' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0'/> <br/><br/>
                        <input type="password" placeholder='Enter password' className='w-full p-3 border-b-[2px] border-[#205781] focus:outline-0'/> <br/><br/>
                        <WebButton text={"Submit"}></WebButton>
                    </form>
                </div>
            </div>
           
        </div>
        </div>
    );
};

export default Login;