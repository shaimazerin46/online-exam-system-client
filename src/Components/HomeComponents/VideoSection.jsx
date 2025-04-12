import bg from '../../assets/video/bg.png'
import { MdSlowMotionVideo } from "react-icons/md";

const VideoSection = () => {
    return (
        <div style={{background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)),url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}} className="my-20 h-[350px] w-full flex justify-center items-center text-white text-9xl">
            <a href="https://youtu.be/xFOG_9Y883c?si=9Ik61_zFhtgMPUq2" target='_blank'>
            <MdSlowMotionVideo />
            </a>
        </div>
    );
};

export default VideoSection;