import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const SocialButton = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
        const from = location.state?.from?.pathname || '/';
    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully sign in!",
                    icon: "success"
                });

                navigate(from, { replace: true });
            })
    }
    return (
        <div>
            <button onClick={handleGoogleLogin}>
                <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className='w-7' />
            </button>
        </div>
    );
};

export default SocialButton;