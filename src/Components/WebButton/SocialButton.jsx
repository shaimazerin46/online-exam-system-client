import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';

const SocialButton = () => {
    const {googleLogin} = useContext(AuthContext);
    const navigate=useNavigate()
    const handleGoogleLogin=()=>{
        googleLogin()
        .then(()=>{
            console.log('google')
            navigate('/')
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