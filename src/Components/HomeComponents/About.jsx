import Lottie from 'lottie-react';
import aboutlottie from '../../assets/lottie/about.json'
import Headline from '../Headline/Headline';
import about1 from '../../assets/about/about1.jpg'
import about2 from '../../assets/about/about2.jpg'


const About = () => {
    return (
      
         <div className='bg-white'>
       
        <div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl  mx-auto ">
           {/* text */}
           <div>
               <Headline text={"Story of EduQuest"}></Headline>
               <p>Welcome to our Online Examination System — a modern, efficient, and user-friendly platform</p>
           </div>

           {/* lottie animation */}
           <div className='w-96 mx-auto'>
               <Lottie animationData={aboutlottie} className='w-full'></Lottie>
           </div>

           {/* images */}

           <div className='relative animate-pulse animation-delay-500 h-[400px] mx-auto w-[400px] rounded-full border-[1px] border-[#4F959D]'>
               <div className='absolute animate-pulse transform translate-x-4/5 -translate-y-1/4 animation-delay-1000'>
                   <img src={about1} alt="" className='w-[300px] object-cover rounded-3xl'/>
               </div>
               <div className='absolute animate-pulse animation-delay-2000 transform translate-y-[200px] translate-x-[100px]'>
               <img src={about2} alt="" className='w-[350px]  object-cover rounded-3xl'/>
               </div>
           </div>

           {/* text */}
           <div>
               <Headline text={"Our mission"}></Headline>
               <p className='text-sm text-justify'>
               Our mission is to make assessments accessible, secure, and hassle-free for both educators and students. With advanced features like automated grading, real-time monitoring, and detailed performance analytics, we empower institutions to streamline their evaluation processes while ensuring a fair and transparent testing environment. Whether you’re an academic institution, a training center, or a business conducting skill assessments, our platform offers the flexibility and reliability you need to succeed.
               </p>
           </div>
           
       </div>
        </div>
        
       </div>
       
    );
};

export default About;
