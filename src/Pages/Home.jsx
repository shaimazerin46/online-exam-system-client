import About from "../Components/HomeComponents/About";
import Banner from "../Components/HomeComponents/Banner";
import Features from "../Components/HomeComponents/Features";
import Packages from "../Components/HomeComponents/Packages";


const Home = () => {
    return (
        <div>
            <div >
                <Banner />
            </div>

            
            <div> 
                <About />
                <Features />
                <Packages />
            </div>
        </div>
    );
};

export default Home;