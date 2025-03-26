import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Headline from "../Headline/Headline";
import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";
import { GrWaypoint } from "react-icons/gr";


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
                    <div
                        key={p._id}
                        className="relative bg-gradient-to-br from-[#98D2C0] to-[#F6F8D5] p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-center">
                            {p?.name}
                        </h3>
                        <ul className="list-disc text-sm space-y-2 mb-6 pl-5">
                            {p?.features?.length > 0 && (
                                p.features.map((feature, index) => (
                                   <div className="flex gap-3">
                                     <GrWaypoint />
                                    <li key={index} className="flex items-center gap-2">
                                        {feature}
                                    </li>
                                   </div>
                                ))
                            )}
                        </ul>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold ">${p?.price}</span>
                            <Link>
                                <WebButton text={"Buy now"}></WebButton>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;