import * as React from "react";
import { useState, useEffect } from "react";
// import Carousel from "../../common/Carousel";
import { Carousel } from "react-responsive-carousel";
import GroupAccountHistory from "../../pages/GroupAccount/GroupAccountHistory";
import GroupAccount from "../../pages/GroupAccount/GroupAccount";
const GroupAccountContainer = () => {
  const [selectedBtn, setSelectedBtn] = useState("btn1");
  const handleButtonClick = (btn) => {
    setSelectedBtn(btn);
  };
  const handleCarouselChange = (selectedIndex) => {
    // selectedIndex는 Carousel의 현재 선택된 슬라이드 인덱스입니다.
    // 이 인덱스를 기반으로 selectedBtn 값을 변경합니다.
    if (selectedIndex === 0) {
      setSelectedBtn("btn1");
    } else if (selectedIndex === 1) {
      setSelectedBtn("btn2");
    } 
  };
  return (
    <div>
      <div>
          <button
            style={{
              borderRadius: "100%",
              width: "10px",
              height: "10px",
              backgroundColor: selectedBtn == "btn1" ? "#7165E3" : "#E3E3E3",
              padding: "0",
              marginRight: "10px",
            }}
            onClick={() => handleButtonClick("btn1")}
          ></button>
          <button
            style={{
              borderRadius: "100%",
              width: "10px",
              height: "10px",
              backgroundColor: selectedBtn == "btn2" ? "#7165E3" : "#E3E3E3",
              padding: "0",
              marginRight: "10px",
            }}
            onClick={() => handleButtonClick("btn2")}
          ></button>
        </div>
      <Carousel
      selectedItem={
        selectedBtn === "btn1" ? 0 :1
      }
      showThumbs={false}
      infiniteLoop={false}
      showIndicators={false}
      swipeable={true}
      showArrows={false}
      showStatus={false}
      onChange={handleCarouselChange}
      >
        <div>
        <GroupAccount />
        </div>
        <div>
        <GroupAccountHistory />
        </div>
      </Carousel>
    </div>
  );
};

export default GroupAccountContainer;
