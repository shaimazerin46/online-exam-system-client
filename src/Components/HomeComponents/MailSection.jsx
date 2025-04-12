import Headline from "../Headline/Headline";
import bg from '../../assets/mail/bg.png'
import mailLottie from '../../assets/lottie/mail.json'
import Lottie from "lottie-react";
import WebButton from "../WebButton/WebButton";
import { useContext, useState } from "react";
import emailjs from '@emailjs/browser';
import { AuthContext } from "../../Context/AuthProvider";


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
        .then(res=>console.log(res.text))
        .catch(err=>console.log(err.text))
    }
    return (
        <div className="max-w-7xl mx-auto">
            <Headline text={"Contact us"}></Headline>
            <div className="flex items-center justify-center shadow-2xl rounded-3xl">
                <form  style={{background: `url(${bg})`, backgroundRepeat: "no-repeat"}} className="p-10 w-[500px] rounded-xl">
                
                   
                   
                    <textarea required name="text" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea resize-none w-full rounded-l-3xl rounded-r-3xl focus:outline-0 focus:border-0 border-0 shadow-2xl" placeholder="Enter your message"></textarea><br/><br/>

                    <div onClick={handleSubmit} className="flex justify-center">
                    <WebButton text={"Send"}></WebButton>
                    </div>
                </form>
                <div className="w-[500px]">
                    <Lottie animationData={mailLottie}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default MailSection;