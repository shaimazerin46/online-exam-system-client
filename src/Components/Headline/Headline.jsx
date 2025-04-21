import 'animate.css';

const Headline = ({text}) => {
    return (
        <div>
            <h2 className="md:text-5xl text-2xl text-center animate__animated  animate__flash font-bold font-text text-[#205781] py-7 md:py-20">{text}</h2>
        </div>
    );
};

export default Headline;