import { Link } from 'react-router';
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <div className='  bg-gray-200  text-black'>
            <footer className="footer max-w-7xl mx-auto sm:footer-horizontal  items-center p-4">
  <aside className="grid-flow-col items-center">
    <img src={logo} alt="" className='w-15'/>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
   
   <Link to='https://www.facebook.com/shaimazerinrichi' target='_blank'>
   <img src='https://img.icons8.com/?size=48&id=118497&format=png' className='w-8' alt=""/>
   </Link>

   <Link to='https://www.linkedin.com/in/shaima-zerin-23bb59204/'>
   <img className='w-8' src='https://img.icons8.com/?size=48&id=xuvGCOXi8Wyg&format=png' alt=""/>
   </Link>

   <Link to='https://x.com/i/flow/login' target='_blank'>
   <img className='w-8' src='https://img.icons8.com/?size=50&id=A4DsujzAX4rw&format=png' alt=""/>
   </Link>
    
  </nav>
</footer>
        </div>
    );
};

export default Footer;