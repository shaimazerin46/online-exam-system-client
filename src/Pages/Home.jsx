
import About from "../Components/HomeComponents/About";
import Banner from "../Components/HomeComponents/Banner";
import Features from "../Components/HomeComponents/Features";
import MailSection from "../Components/HomeComponents/MailSection";
import Packages from "../Components/HomeComponents/Packages";
import VideoSection from "../Components/HomeComponents/VideoSection";


const Home = () => {
    return (
        <div>
                <Banner />
                <About />
                <Features />
                <Packages />
                <MailSection></MailSection>
                <VideoSection></VideoSection>
          
        </div>
    );
};

export default Home;