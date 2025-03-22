import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/banner/banner1.jpg'
import img2 from '../../assets/banner/banner2.jpg'
import img3 from '../../assets/banner/banner3.jpg'
import img4 from '../../assets/banner/banner4.jpg'
import img5 from '../../assets/banner/banner5.jpg'
import img6 from '../../assets/banner/banner6.jpg'



const Banner = () => {
    return (
      <div>
       <Carousel autoPlay interval={1000} infiniteLoop showArrows={false}>
         <div className="relative">
         <img src={img1} alt=""/>
         <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
         Empower Your Learning Journey — Anytime, Anywhere!
           
         </p>
         </div>

         <div className="relative">
            <img src={img2} alt=""/>
            <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
            Ace Your Exams — Online, Hassle-Free, and Fast!
          
        </p>
         </div>

         <div className="relative"> 
            <img src={img3} alt=""/>
            <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
            An easy, secure, and reliable way to take your tests online.
           
         </p>
         </div>

         <div className="relative">
            <img src={img4} alt=""/>
            <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
            Ready, Set, Succeed — Your Exams, Simplified!
          
        </p>
         </div>

         <div className="relative">
            <img src={img5} alt=""/>
            <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
            Next-Gen Online Exams — Redefining the Way You Test!
           
         </p>
         </div>

         <div className="relative">
            <img src={img6} alt=""/>
            <p className="absolute font-text text-left px-3 bottom-60 w-[700px] text-white text-7xl font-bold">
           
            Empower Your Learning Journey - Anytime, Anywhere
           
         </p>
         </div>
       </Carousel>
      </div>
    );
};

export default Banner;