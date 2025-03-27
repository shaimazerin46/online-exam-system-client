import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Headline from "../Headline/Headline";
import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";


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
        <div className="max-w-7xl mx-auto p-4">
            <Headline text={"Packages"}></Headline>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages?.map(p => (
                    <div key={p._id} className="w-96 shadow-xl h-full flex flex-col bg-gradient-to-b from-[#98D2C0] rounded-2xl to-[#F6F8D5]">
                        <h3 className="py-3 bg-[#3b997b] rounded-t-2xl text-white text-center">{p?.name}</h3>
                        <div className="p-5 flex flex-col grow ">
                           <div className="flex items-center justify-between">
                           <div className="flex items-center h-25 w-25 rounded-full bg-gradient-to-r text-white from-yellow-500 to-yellow-300 shadow-lg justify-center">
                                <span>BDT {p?.price}</span>
                            </div><span className="ml-3 py-2 px-3 bg-green-200 text-sm border-[1px] border-green-300 rounded-3xl text-black ">Month</span>
                           </div>
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
                ))}
            </div>
        </div>
    );
};

export default Packages;