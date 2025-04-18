import { Link, useParams } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import Headline from "../Components/Headline/Headline";
import bg from '../assets/subscription/bg.jpg'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/PaymentComponent/CheckoutForm";
import useUser from "../hooks/useUser";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";


const stripePromise = loadStripe(import.meta.env.VITE_PAY_KEY)
const PackageDetail = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const [packages,setPackages] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users] = useUser();
    const {user} = useContext(AuthContext);
    const filtereduser = users?.find(u=>u.email===user.email)


    useEffect(()=>{
        axiosPublic.get('/allPackages')
        .then(res=>setPackages(res.data))
    },[])

    const filteredPackage = packages?.find(p=>p._id===id);

    const openModal = () => {
        if(filtereduser?.badge && filtereduser?.badge != 'none'){
            Swal.fire({
                icon: 'info',
                title: 'Package Already Purchased',
                text: 'You have already purchased a package.',
            });
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    
    return (
        <div className="py-20">
            <Headline text={filteredPackage?.name}></Headline>

            <div>
            {
                    <div key={filteredPackage?._id}
                    style={{background: `url(${bg})`}}
                     className=" shadow-xl h-full flex flex-col  rounded-2xl w-1/2 mx-auto">
                        <div className="py-5 h-full rounded-t-2xl" >
                        <h3 className="py-3 text-xl text-[#4F959D] font-bold text-center">{filteredPackage?.name}</h3>
                        <h3 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">BDT {filteredPackage?.price}/Month</h3>

                        <div className="p-5 flex flex-col grow">
                            <ul className="mt-5">
                                {
                                    filteredPackage?.features.map((feature, idx) => (
                                        <li className="mb-3 text-white border-b-[1px] p-2 text-center text-sm" key={idx}>{feature}
                                        </li>
                                    
                                    )

                                )
                                }
                            </ul>

                        </div>
                        <div className="text-center">
                               <button className="btn bg-[#4F959D] border-0 rounded-xl text-white" onClick={openModal}>Purchase</button>
                            </div>
                        </div>
                        </div>
                      
                       
                   
                }
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        
                    {/* Payment */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={filteredPackage?.price} name={filteredPackage?.name}></CheckoutForm>
                    </Elements>
                        
                        <div className="flex justify-end space-x-4 mt-10">
                            <button 
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageDetail;