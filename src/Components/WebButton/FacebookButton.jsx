import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router';

const FacebookButton = () => {
    const {facebookLogin} = useContext(AuthContext);
    const navigate=useNavigate()
    const handleFacebookLogin = ()=>{
        facebookLogin()
        .then(()=>{
            console.log('facebook');
            navigate('/')
        })
    }
    return (
        <div>
            <button onClick={handleFacebookLogin}>
                <img src="https://img.icons8.com/?size=48&id=uLWV5A9vXIPu&format=png" alt="" className='w-7' />
            </button>
        </div>
    );
};

export default FacebookButton;