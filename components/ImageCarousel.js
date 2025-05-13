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
    <div className="bg-black w-[320px] h-[320px]">
      <Swiper
        modules={[Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Image
            alt="sswt"
            src="/carousel/manBenching.png"
            width={200}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="sswt"
            src="/carousel/barbellSquat.png"
            width={200}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="sswt"
            src="/carousel/curls.png"
            width={200}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
