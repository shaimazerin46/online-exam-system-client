import About from "../Components/HomeComponents/About";
import Banner from "../Components/HomeComponents/Banner";
import Features from "../Components/HomeComponents/Features";
import Packages from "../Components/HomeComponents/Packages";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Features></Features>
            <Packages></Packages>
        </div>
    );
};

export default Home;