import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Services = () => {
  const router = useRouter();
  const lang = router.locale == 'en';
  return (
    <>
      <div className="services-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>{lang ? 'Our Services' : 'خدماتنا'}</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-doctor"></i>
                  <Link href="/service-details">
                    {lang ? <h3>Physical Therapy Services</h3>
                      : <h3>خدمات العلاج الطبيعي</h3>}
                  </Link>
                  {lang ? <p>
                    Discover our comprehensive physical therapy programs designed to enhance your mobility, reduce pain, and improve your overall physical well-being. Our expert therapists are here to guide you on your journey to recovery.</p>

                    : <p>
                      اكتشف برامج العلاج الطبيعي الشاملة لدينا والمصممة لتعزيز قدرتك على الحركة وتقليل الألم وتحسين صحتك البدنية بشكل عام. معالجونا الخبراء متواجدون هنا لإرشادك في رحلتك نحو التعافي.
                    </p>}</div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-prescription"></i>
                  <Link href="/service-details">
                    {lang ? <h3>Learning Difficulties Support</h3> :
                      <h3>دعم صعوبات التعلم  </h3>}
                  </Link>
                  {lang ? <p>
                    Our specialized team is dedicated to helping individuals of all ages overcome learning difficulties. We offer assessments, tailored interventions, and expert guidance to unlock your full potential.
                  </p> :
                    <p>
                      فريقنا المتخصص مكرس لمساعدة الأفراد من جميع الأعمار على التغلب على صعوبات التعلم. نحن نقدم التقييمات والتدخلات المخصصة وتوجيهات الخبراء لإطلاق العنان لإمكاناتك الكاملة.

                    </p>}
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-patient-file"></i>
                  <Link href="/service-details">
                    {lang ? <h3>Otolaryngology</h3> :
                      <h3>طب الأنف والأذن والحنجرة  </h3>}
                  </Link>
                  {lang ? <p>
                    Trust our experienced otolaryngologists to diagnose and treat a wide range of ear, nose, and throat conditions. From hearing issues to sinus problems, we've got your ENT health covered.
                  </p> :
                    <p>

                      ثق بأخصائيي الأنف والأذن والحنجرة ذوي الخبرة لدينا لتشخيص وعلاج مجموعة واسعة من أمراض الأذن والأنف والحنجرة. بدءًا من مشكلات السمع وحتى مشكلات الجيوب الأنفية، نوفر لك الرعاية الصحية الخاصة بالأنف والأذن والحنجرة.
                    </p>}
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-tooth"></i>
                  <Link href="/service-details">
                    {lang ? <h3>Speech–Language Pathology Services</h3> :
                      <h3> خدمات أمراض النطق واللغة </h3>}
                  </Link>
                  {lang ? <p>
                    Improve your communication skills with the support of our speech-language pathology experts. We provide personalized therapy to address speech and language disorders for individuals of all ages.
                  </p> :
                    <p>
                      قم بتحسين مهارات التواصل لديك بدعم من خبراء أمراض النطق واللغة لدينا. نحن نقدم العلاج الشخصي لمعالجة اضطرابات النطق واللغة للأفراد من جميع الأعمار.

                    </p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
