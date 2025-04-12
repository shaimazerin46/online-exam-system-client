import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Headline from "../Headline/Headline";
import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";
import { Parallax } from "react-scroll-parallax";
import bg from '../../assets/subscription/bg.jpg'



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
        

<div className="">
            <Headline text={"Packages"}></Headline>
            <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {packages?.map(p => (
                    <div key={p._id}
                    style={{background: `url(${bg})`}}
                     className="transition-transform duration-300 hover:scale-105 shadow-xl h-full flex flex-col  rounded-2xl ">
                        <div className="py-5 h-full rounded-t-2xl" >
                        <h3 className="py-3 text-xl text-[#4F959D] font-bold text-center">{p?.name}</h3>
                        <h3 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">BDT {p?.price}/Month</h3>

                        <div className="p-5 flex flex-col grow">
                            <ul className="mt-5">
                                {
                                    p?.features.map((feature, idx) => (
                                        <li className="mb-3 text-white border-b-[1px] p-2 text-center text-sm" key={idx}>{feature}
                                        </li>
                                    
                                    )

                                )
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
           
        </div>
      </Parallax>
    );
};

export default Packages;