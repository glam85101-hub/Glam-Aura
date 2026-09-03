"use client";
import Outfit from "../app/component/outfit/page";
import Pallete from "../app/component/makeup/page";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Blog from "../app/component/blog";
import About from "../app/component/about/page";
import ColorAnalysis from "./component/ColorAnalysis";
import FAQ from "./component/faq/page";
import DemoVideo from "./component/DemoVideo";

export default function Home() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-back",
      duration: 1200,
      delay: 100,
      mirror: true,
      anchorPlacement: "bottom-bottom",
      offset: 160,
    });
  }, []);

 
  return (
    <div> 
 
  <ColorAnalysis />
  <DemoVideo />
  <Pallete/>
 <About />
 <Outfit/>
  <Blog />
 <FAQ/>
  
 </div>
  );
}