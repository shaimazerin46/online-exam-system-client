import Headline from "../Headline/Headline";
import bg from '../../assets/mail/bg.png'
import mailLottie from '../../assets/lottie/mail.json'
import Lottie from "lottie-react";
import WebButton from "../WebButton/WebButton";
import { useContext, useState } from "react";
import emailjs from '@emailjs/browser';
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";


const MailSection = () => {
    const [message,setMessage] = useState('');
    const {user} = useContext(AuthContext);


    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            
            email: user?.email,
            text: message
        }
        emailjs.send(
            'service_942dfyw',
            'template_m1r9txs',
            data,
            'Q0wGHAYPZtgl_MkzK'
        )
        .then(()=>{
            Swal.fire({
                
                text: "your message is sent!",
                icon: "success"
              });
            setMessage('')
        })
        .catch(err=>{
            Swal.fire({
                icon: "error",
                text: (err.message),
              });
        })
    }
    return (
        <div className="max-w-7xl mx-auto">
            <Headline text={"Contact us"}></Headline>
            <div className="md:flex md:items-center md:justify-center shadow-2xl rounded-3xl">
                <form  style={{background: `url(${bg})`, backgroundRepeat: "no-repeat"}} className="p-10 md:w-[500px] rounded-xl">
                
                   
                   
                    <textarea required name="text" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea h-32 resize-none w-full rounded-l-3xl rounded-r-3xl focus:outline-0 focus:border-0 border-0 shadow-2xl p-5" placeholder="Enter your message"></textarea><br/><br/>

                    <div onClick={handleSubmit} className="flex justify-center">
                    <WebButton text={"Send"}></WebButton>
                    </div>
                </form>
                <div className="md:w-[500px]">
                    <Lottie animationData={mailLottie}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default MailSection;