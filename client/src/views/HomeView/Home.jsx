import Styles from "./home.module.css";
//
import Posts from "../../components/Posts/Posts";
import LeftBar from "../../components/LeftBar/LeftBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [responsiveMode, setResponsiveMode] = useState(window.innerWidth < 993);

  useEffect(() => {
    function handleResize(e) {
      const responsiveMode = window.innerWidth < 993;
      if (responsiveMode) {
        setResponsiveMode(true);
      } else setResponsiveMode(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={Styles.HomeView}>
      <LeftBar id={Styles.LeftBar} responsiveMode={responsiveMode} />

      <Posts />

       
      
    </div>
  );
}
