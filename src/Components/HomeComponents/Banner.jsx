import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/banner/banner1.jpg';
import img2 from '../../assets/banner/banner2.jpg';
import img3 from '../../assets/banner/banner3.jpg';
import img4 from '../../assets/banner/banner4.jpg';
import img5 from '../../assets/banner/banner5.jpg';
import img6 from '../../assets/banner/banner6.jpg';

const Banner = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="w-full  mt-20">
      <Slider {...settings}>
        {slides.map((img, index) => (
          <div key={index}>
            <div
              className="relative banner-div h-[550px]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              {/* Bottom Border & Text Content */}
              <div className="absolute bottom-0 w-full  banner-box ">
                <div className="">
                  <div className="bg-black opacity-50 h-[300px] text-center py-6 flex items-center">
                    <div className="text-white space-y-7 w-[90%] md:w-[600px] mx-auto">
                      <h3 className="font-bold">Ace Your Exams Anytime, Anywhere</h3>
                      <p className="text-sm">
                        Join our secure and user-friendly platform to take exams online with ease and confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
