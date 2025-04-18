import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useUser from '../../hooks/useUser';


const SocialButton = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();
    const [users] = useUser();
    
    
    const handleGoogleLogin = async () => {
        try {
            const res = await googleLogin();
            const userEmail = res.user.email;
            
           
            const userExists = users?.some(u => u.email === userEmail);
            
            if (!userExists) {
                const userInfo = {
                    name: res.user.displayName,
                    email: userEmail,
                    badge: 'none',
                    date: new Date().toUTCString()
                };
                
                await axiosPublic.post('/users', userInfo);
            }
            
            Swal.fire({
                title: "Good job!",
                text: "Successfully signed in!",
                icon: "success"
            });
            
            navigate(from, { replace: true });
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.message,
            });
        }
    };
    return (
        <div>
            <button onClick={handleGoogleLogin}>
                <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='w-7' />
            </button>
        </div>
    );
};

export default SocialButton;