// import Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GroupAccountHistory from "../pages/GroupAccount/GroupAccountHistory";
import GroupAccount from "../pages/GroupAccount/GroupAccount";

const Carousel = () => {
  // 옵션
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <GroupAccount />
        </div>
        <div>
          <GroupAccountHistory />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
