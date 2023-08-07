import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import Link from "next/link";

const AboutOurHospital = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="hospital-area pb-70">
        <div className="container-fluid p-0">
          <div className="hospital-shape">
            <img src="/images/home-three/home-three-hart.png" alt="Shape" />
          </div>

          <div className="row m-0 align-items-center">
            <div className="col-lg-6 p-0">
              <div className="hospital-item">
                <div
                  onClick={() => setOpen(true)}
                  className="hospital-play-btn"
                >
                  <i className="icofont-ui-play"></i>
                </div>

                <div className="row m-0">
                  <div className="col-lg-6 p-0">
                    <div className="hospital-left-one">
                      <img
                        src="/images/home-three/home3-about1.jpg"
                        alt="About"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 p-0">
                    <div className="hospital-left-two">
                      <img
                        src="/images/home-three/home3-about2.jpg"
                        alt="About"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hospital-item hospital-right">
                <h2>About Our Hospital</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>

                <ul>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Browse our Website
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Choose Service
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Choose Service
                  </li>
                </ul>

                <Link href="/about" className="hospital-btn">
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* If you want to change the video need to update videoID */}
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="bk7McNUjWgw"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AboutOurHospital;
