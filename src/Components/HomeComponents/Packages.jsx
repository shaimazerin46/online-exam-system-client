import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Headline from "../Headline/Headline";
import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";
import { Parallax } from "react-scroll-parallax";



const Packages = () => {
    const axiosPublic = useAxiosPublic();
    const [packages, setapackages] = useState();

    useEffect(() => {
        axiosPublic.get('/allPackages')
            .then(res => {
                setapackages(res.data);
                console.log(packages)
            })
    }, [])
    return (
      <Parallax  translateY={[-20, 20]} speed={-5} className="mt-30">
        

<div className=" bg-[#98d2c0]">
            <Headline text={"Packages"}></Headline>
            <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {packages?.map(p => (
                    <div key={p._id} className=" transition-transform duration-300 hover:scale-105 shadow-xl h-full flex flex-col  rounded-2xl bg-white">
                        <div className="py-5 h-full rounded-t-2xl" style={{background: 'url(./card.svg)', backgroundRepeat: 'no-repeat', }}>
                        <h3 className="py-3 font-bold text-center">{p?.name}</h3>
                        <h3 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">BDT {p?.price}/Month</h3>

                        <div className="p-5 flex flex-col grow">
                            <ul className="mt-5">
                                {
                                    p?.features.map((feature, idx) => <li className="mb-3 flex items-center gap-2" key={idx}><span className="w-2 h-2 bg-[#3b997b] rounded-full"></span>{feature}</li>)
                                }
                            </ul>

                        </div>
                        <Link className="text-center pb-5">
                            <WebButton text={"Subscribe"}></WebButton>
                        </Link>
                        </div>
                      
                       
                    </div>
                ))}
            </div>
            <div class="wave">
            
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white" fillRule="evenodd"></path>
    </svg>

</div>
        </div>
      </Parallax>
    );
};

export default Packages;