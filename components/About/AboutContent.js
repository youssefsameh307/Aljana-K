'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const AboutContent = () => {
  const router = useRouter();
  const { locale: lang } = router;
  return (
    <>
      <div className="about-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-item">
                <div className="about-left">
                  <img src="/images/about1.jpg" alt="About" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-item about-right">
                <img src="/images/about-shape1.png" alt="About" />
                {lang == 'en' ?
                  <>
                    <h2>About Our Medical Center</h2>
                    <p>
                      Al Jana Center was established in 1999 AD; A center for communication only, in the form of sessions conducted by specialists. The idea emerged from the necessity of having a full-day nursery in 2002 AD, and with it began skills development sessions, occupational, motor, and cognitive therapy, then the sensory room.</p>
                    <p>
                      2007 AD The idea expanded and it was necessary to establish a physical therapy unit for children, so the Al-Janna Center for Physical Therapy was established for children who frequented the center.</p>
                    <p>
                      Then we started providing physical therapy sessions for adults, men and women, in 2008. In parallel, a special department for learning difficulties, a neurology clinic, and various rehabilitation clinics were established. Then the Al-Jana Center began training university graduates in the fields, Providing behavioral therapy, applying various linguistic, psychological, ability tests and behavioral tests and rehabilitating children in the pre-school stage.
                      Providing family consultations regarding children and their relationships with parents.
                      The center provides counseling and behavioral therapy for various behavioral disorders in children and youth.
                    </p>
                  </>
                  :
                  <>
                    <h2>عن مركز الجنا</h2>
                    <p> تاسس مركز الجنا عام 1999م ؛ مركز خاص بالتخاطب فقط علي هيئة جلسات يقوم عليها متخصصون ؛ انبثقه عن الفكره ضرورة وجود حضانه بنظام اليوم الكامل عام 2002م و بدأ معها  جلسات تنمية المهارات ، العلاج الوظيفي ، الحركي ، الادراكي ثم غرفه الحواس .
                    </p>
                    <p>2007م اتسعت الفكره و كان من الضروري انشاء وحد للعلاج طبيعي للاطفال فتم انشاء مركز الجنا للعلاج الطبيعي للاطفال المترددين علي المركز .</p>
                    <p>ثم بدانا في عمل جلسات علاج طبيعي للكبار رجال و سيدات ذلك في عام 2008م ؛ و علي التوازي تم انشاء قسم خاص لصعوبات التعلم ، عيادة للاعصاب ، التأهيل المختلفه ؛ ثم بداأ المركز الجنا في تدريب خريجي الجامعات في المجالات .</p>

                    <p>و تقديم العلاج السلوكي ، تطبيق الاختبارات المختلفه اللغويه ، النفسيه ، و اختبارات القدرات و الاختبارات السلوكيه و تأهيل الاطفال في مرحلة ما قبل المدارس
                      و تقديم الاستشارات للاسره الخاصه بالاطفال و علاقاتهم بالاهل .
                      و يقدم المركز الاستشارات و العلاج السلوكي للاضطراب السلوكية المختلفه للاطفال و الشباب.</p>

                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
