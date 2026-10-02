"use client";
import Outfit from "../app/outfit/page";
import Pallete from "../app/makeup/page";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Blog from "../components/Blog";
import DemoVideo from "../components/DemoVideo";
import About from "../app/about/page";
import HomePage from "../components/Home";
import FAQ from "./faq/page";

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
 
  <HomePage />
  <DemoVideo />
  <Pallete/>
 <About />
 <Outfit/>
  <Blog />
 <FAQ/>
  
 </div>
  );
}