import Headline from "../Headline/Headline";
import bg from '../../assets/mail/bg.png'
import mailLottie from '../../assets/lottie/mail.json'
import Lottie from "lottie-react";
import WebButton from "../WebButton/WebButton";


const MailSection = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Headline text={"Contact us"}></Headline>
            <div className="flex items-center justify-center shadow-2xl rounded-3xl">
                <div style={{background: `url(${bg})`, backgroundRepeat: "no-repeat"}} className="p-10 w-[500px] rounded-xl">
                
                    <input type="text" placeholder="Type your name" className="input w-full rounded-l-3xl rounded-r-3xl focus:outline-0 focus:border-0 border-0 shadow-2xl"  /> <br/><br/>
                   
                    <textarea className="textarea resize-none w-full rounded-l-3xl rounded-r-3xl focus:outline-0 focus:border-0 border-0 shadow-2xl" placeholder="Enter your message"></textarea><br/><br/>

                    <div className="flex justify-center">
                    <WebButton text={"Send"}></WebButton>
                    </div>
                </div>
                <div className="w-[500px]">
                    <Lottie animationData={mailLottie}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default MailSection;