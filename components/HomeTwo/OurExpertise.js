import { useRouter } from "next/router";
import React from "react";

const OurExpertise = () => {
  const router = useRouter();
  const lang = router.locale == 'en';
  return (
    <>
      <div className="speciality-area pb-100">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col-lg-7">
              <div className="speciality-left">
                <div className="section-title-two">
                  <span>Speciality</span>
                  <h2>Our Expertise</h2>
                </div>

                <div className="speciality-item">
                  <div className="row m-0">
                    <div className="col-sm-6 col-lg-6">
                      <div className="speciality-inner">
                        <i className="icofont-check-circled"></i>
                        <h3>{lang ? 'Treatment of Bone Problems' : 'علاج مشاكل العظام'}</h3>
                        <p>
                          {lang ? 'We specialize in advanced non-surgical treatments for bone problems, ensuring a swift recovery without the need for surgery.'
                            : 'نحن متخصصون في العلاجات غير الجراحية المتقدمة لمشاكل العظام، مما يضمن الشفاء السريع دون الحاجة إلى إجراء عملية جراحية.'}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                      <div className="speciality-inner">
                        <i className="icofont-check-circled"></i>
                        <h3>{lang ? 'Pediatric Excellence' : 'التميز في طب الأطفال'}</h3>
                        <p>
                          {lang ? "Our dedicated pediatric experts provide high-quality care tailored to your child's unique needs, all without surgical procedures."
                            : 'يقدم خبراؤنا المتخصصون في طب الأطفال رعاية عالية الجودة مصممة خصيصًا لتلبية احتياجات طفلك الفريدة، كل ذلك بدون إجراءات جراحية.'}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                      <div className="speciality-inner">
                        <i className="icofont-check-circled"></i>
                        <h3>{lang ? 'Brain and Nervous System Care' : 'رعاية الدماغ والجهاز العصبي'}</h3>
                        <p>
                          {lang ? 'Trust our board-certified neurologists for non-surgical solutions to complex brain and nervous system conditions.'
                            : 'ثق بأطباء الأعصاب المعتمدين لدينا للحصول على حلول غير جراحية لحالات الدماغ والجهاز العصبي المعقدة.'}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                      <div className="speciality-inner">
                        <i className="icofont-check-circled"></i>
                        <h3>{lang ? 'Upper Respiratory System' : 'الجهاز التنفسي العلوي'}</h3>
                        <p>
                          {lang ? 'Breathe easy with our non-surgical treatments for upper respiratory issues, from allergies to lung conditions.'
                            : 'تنفس بسهولة مع علاجاتنا غير الجراحية لمشاكل الجهاز التنفسي العلوي، بدءًا من الحساسية وحتى أمراض الرئة.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 pr-0">
              <div className="speciality-item speciality-right">
                <img src="/images/about4.jpg" alt="Speciality" />

                <div className="speciality-emergency">
                  <div className="speciality-icon">
                    <i className="icofont-ui-call"></i>
                  </div>
                  <h3>{lang ? 'Call us on:' : 'اتصل بنا'}</h3>
                  <p>+07 554 332 322</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurExpertise;
