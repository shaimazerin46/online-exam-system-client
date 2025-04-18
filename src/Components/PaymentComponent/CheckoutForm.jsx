import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";


const CheckoutForm = ({price,name}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [err, setErr] = useState();
    const axiosSecure = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState();
    const {user} = useContext(AuthContext);
    

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price:price})
        .then((res)=>{
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure,price])

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);

        if(card==null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log(error);
            setErr(error.message)
        }
        if(paymentMethod){
            console.log("paymentmethod: ",paymentMethod);
            setErr('')
        }
        // confirm payment
        const {paymentIntent, confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                   
                } 
            }
        })
        if(confirmError){
            Swal.fire({
                icon: "error",
                
                text: (confirmError.message),
               
              });
        }
        else{
            
            if(paymentIntent.status==='succeeded'){
                // save payment into the database
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price: price,
                    Package_name: name,
                    date: new Date().toUTCString(),

                }
                const badge = {
                    badge: name
                }
                axiosSecure.post('/payment',payment)
                .then(()=>{
                    axiosSecure.patch(`/users/${user.email}`,badge)
                    .then(res=>{
                        console.log(res.data);
                        Swal.fire({
                            title: "Good job!",
                            text: "Payment successfull!",
                            icon: "success"
                          });
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                   
                })
                .catch(err=>{
                    Swal.fire({
                        icon: "error",
                        
                        text: (err.message),
                       
                      });
                })
                
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                 
                >
                   
                </CardElement>
                <button className="btn bg-[#4F959D] border-0 rounded-xl mt-5 text-white" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{err}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;