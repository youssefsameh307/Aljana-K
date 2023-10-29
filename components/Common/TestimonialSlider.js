import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const TestimonialSlider = () => {
  return (
    <>
      <div className="review-area ptb-100">
        <h1 className="tw-text-3xl tw-relative tw-text-white tw-font-bold tw-text-center">Our customer reviews</h1>
        <div className="container">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="feedback-slider"
          >
            <SwiperSlide>
              <div style={{ margin: "100px 0px 0px 0px" }} className="tw-w-full tw-flex tw-justify-center">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02CNewn5SzYcsinaaCEFYSKpHHRxVbvgH1hRNGDhghhYULmAiJxsUDkinGr5Mfak5Gl%26id%3D100039375920898&show_text=true&width=500"
                  width="80%" style={{ border: 'none', overflow: 'show' }} height="200" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div></SwiperSlide>

            <SwiperSlide><div style={{ margin: "100px 0px 0px 0px" }} className="tw-w-full tw-flex tw-justify-center">
              <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Foya.mohamed.7758%2Fposts%2Fpfbid031tgVfqaaioPZcpQDpxde4rEW7hRBVD2Gk9LE5WHBxGdKiPj4J1UUa758cyBgmaPwl&show_text=true"
                width="80%" style={{ border: 'none', overflow: 'show' }} height="300" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

            </div> </SwiperSlide>
            <SwiperSlide>
              <div style={{ margin: "100px 0px 0px 0px" }} className="tw-w-full tw-flex tw-justify-center">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazza.wahsh%2Fposts%2Fpfbid022Qw8BCYKK32KkZyNKsJq5CW8EvamPqUNivMJwKdJof61ww8bDTtw2XHybdcTMXMcl&show_text=true&width=500"
                  width="80%" style={{ border: 'none', overflow: 'show' }} height="300" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ margin: "100px 0px 0px 0px" }} className="tw-w-full tw-flex tw-justify-center">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Flola.loulo.75%2Fposts%2Fpfbid02QBjKYeYL3iowKsFZmkKGk3ThwZcYSALEg8duKe37xefUJtpQbbmQiepe42ZNg5iUl&show_text=true&width=500"
                  width="80%" style={{ border: 'none', overflow: 'show' }} height="200" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TestimonialSlider;
