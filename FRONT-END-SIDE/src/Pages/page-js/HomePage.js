import React from "react";

import "../page-css/HomePage.css";

import About from "./About2";
import Contact from "./Contact2";

import FakeMenu from "./Menu2";
import Header from "../../components/components-js/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="homePage">
        <div className="textAndImage">
          <div />
          <div className="text1">Discover The Delicious Dish Around You</div>
        </div>
        <div className="additionalText">
          Order now and enjoy the finest dishes delivered to your doorsteps!
        </div>
      </div>
      <div className="SecondHomePage">
        <div className="SecondHomePageText">
          <h1>SELL FOOD ONLINE</h1>
          <p>
            At DBU LOUNGE, we make it easy for you to enjoy your favorite meals
            from the comfort of your home. Discover a wide variety of cuisines,
            order with just a few clicks, and savor the taste of convenience. No
            matter how much your business grows, you will always be able to take
            free unlimited orders with zero costs. Power your business with our
            
          </p>
        </div>
        <div className="SecondHomePageImage"></div>
      </div>

      <FakeMenu />

      <About />
      <Contact />
    </>
  );
}
