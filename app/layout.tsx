//#region Global Styling
// Global Style
import "../styles/style.css";
import "../styles/responsive.css";
// Global RTL Style
import "../styles/rtl.css";
// Libary Style
import "../styles/bootstrap.min.css";
import "../styles/animate.css";
import "../styles/icofont.min.css";
import "../styles/meanmenu.css";
import "react-tabs/style/react-tabs.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";
/* styles/global.css */
import '@fortawesome/fontawesome-free/css/all.css';
//#endregion 


import dynamic from "next/dynamic";
const TopHeader = dynamic(() => import("../components/_App/TopHeader"), {
  ssr: false,
  suspense: true,
});

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <TopHeader /> // ? There is bad error throwing atm as shown here https://github.com/vercel/next.js/issues/36636
       // ? Should be fixed in the next stable release. */}

      <body>{children}</body>
    </html>
  );
}
