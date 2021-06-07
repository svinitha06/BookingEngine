import React, { Component } from "react";
import bookingEngine from "../../asset/bookingEngine.mp4";
import "./aboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="about-full">
        <div className="d-flex">
          <div className="video-content">
            <video src={bookingEngine} controls width="100%" autoPlay></video>
          </div>
          <div className="about-content">
            <h1>About us</h1>
            <p>
              We attribute trivago's success to our company culture built on
              human learning and emotional intelligence. This balance continues
              to attract the best talents from every corner of the globe.Our
              team of creative and driven entrepreneurs come together to build a
              hotel search that is fast, intuitive and unbiased, with the
              longstanding mission…As we provide a search website, users do not
              book directly on our platform. When they click on an offer for a
              hotel room or other accommodation at a certain price, they are
              referred to our advertisers’ websites where they can complete
              their booking. Users can search our platform on desktop and mobile
              devices, and benefit from a familiar user interface, resulting in
              a consistent user experience.
            </p>
          </div>
        </div>
        <section className="services">
          <div className="about-container">
            <h1>Our Services</h1>
            <div className="service-cards-wrapIt">
              <div className="service-content">
                <div className="icon-contain">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <h2>Comfy Stay</h2>
                <p>Enjoy your staycation.providing best hotels,etc</p>
                
              </div>
              <div className="service-content">
                <div className="icon-contain">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <h2>Make it easy</h2>
                <p>Enjoy your staycation.providing best hotels,etc</p>
               
              </div>
              <div className="service-content">
                <div className="icon-contain">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <h2>24/7</h2>
                <p>Enjoy your staycation.providing best hotels,etc</p>
               
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutUs;
