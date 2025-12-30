import { Carousel } from "antd";

const SliderHome = () => {
  const bannerSlides = [
    {
      image: "https://dgpsd.ir/wp-content/uploads/edd/2022/05/sardar-843.jpg",
    },
    {
      image:
        "https://zhivano.com/wp-content/uploads/2023/08/2052_67131.jpg",
    },
    {
      image:
        "https://zhivano.com/wp-content/uploads/2025/02/Banner_site-men-cologne_33080.jpg",
    },
  ];

  return (
    <Carousel autoplay effect="fade" style={{ marginBottom: 16 }}>
      {bannerSlides.map((slide, index) => (
        <div key={index}>
          <div
            style={{
              height: "180px",
              background: `url(${slide.image}) center/cover no-repeat`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>
      ))}
    </Carousel>
  );
};

export default SliderHome;
