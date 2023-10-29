import { useRouter } from "next/router";
import React from "react";

const FunFacts = () => {

  const router = useRouter();
  const lang = router.locale == 'en';
  return (
    <>
      <div className="counter-area counter-bg counter-area-four">
        <div className="container">
          <div className="row justify-content-center">
            {/* <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-patient-bed"></i>
                <h3 className="counter">+24</h3>
                <p>Years of operational experience</p>
              </div>
            </div> */}
            {lang ? <>
              <div className="col-sm-6 col-lg-3">
                <div className="counter-item">
                  <i className="icofont-people"></i>
                  <h3>
                    <span className="counter">2000</span>+
                  </h3>
                  <p>Happy Patients</p>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="counter-item">
                  <i className="icofont-doctor-alt"></i>
                  <h3 className="counter">35</h3>
                  <p>professional Team members</p>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="counter-item">
                  <i className="icofont-badge"></i>
                  <h3 className="counter">24</h3>
                  <p>Year Experience</p>
                </div>
              </div>
            </>
              :
              <>
                <div className="col-sm-6 col-lg-3">
                  <div className="counter-item">
                    <i className="icofont-people"></i>
                    <h3>
                      <span className="counter">2000</span>+
                    </h3>
                    <p>مرضى سعداء</p>
                  </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                  <div className="counter-item">
                    <i className="icofont-doctor-alt"></i>
                    <h3 className="counter">35</h3>
                    <p>أعضاء الفريق المحترفين</p>
                  </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                  <div className="counter-item">
                    <i className="icofont-badge"></i>
                    <h3 className="counter">24</h3>
                    <p>سنين خبرة</p>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default FunFacts;
