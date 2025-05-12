// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ImageCarousel() {
  return (
    <div className="w-full max-w-3xs my-5">
      <Swiper
  modules={[ Pagination, Scrollbar, A11y]}
  spaceBetween={50}
  slidesPerView={1}
  pagination={{ clickable: true }}
  onSwiper={(swiper) => console.log(swiper)}
  onSlideChange={() => console.log("slide change")}
>
  {[...Array(4)].map((_, i) => (
    <SwiperSlide key={i}>
      <Image
        alt="sswt"
        src="/SSWT.png"
        width={200}
        height={100}
        style={{ width: "100%", height: "auto" }}
      />
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
}
