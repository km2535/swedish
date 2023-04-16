import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import parse from "html-react-parser";
import styles from "./ManagerDetail.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { v4 as uuid } from "uuid";

export default function ManagerDetail() {
  const { state } = useLocation();
  const [imgUrl, setImgUrl] = useState([]);
  useEffect(() => {
    const regexp = /<img[^>]*src=["']?([^>"']+)["']?[^>]*>/gi;
    setImgUrl(state.content.match(regexp));
  }, [state.content]);

  return (
    <div className={styles.container}>
      <div className={styles.descLint}>
        <div className={styles.descTitle}>매니저프로필</div>
      </div>
      <div className={styles.main}>
        <div className={styles.title}>{state.title}</div>
        <div className={styles.imgSlide}>
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1000}
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {imgUrl?.map((img) => (
              <div className={styles.content} key={uuid()}>
                <SwiperSlide key={uuid()}>
                  <div className={styles.img}>{parse(img)}</div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
