import React, { Component } from "react";
import bookingEngine from "../../asset/bookingEngine.mp4";
import "./aboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <div className="d-flex">
          <div className="video-content">
            <video src={bookingEngine} controls width="100%" autoPlay></video>
          </div>
          <div className="about-content">
            <h1>About us</h1>
            <p>
              Empty characters, blank characters, invisible characters and
              whitespace characters. They look like a space, but are in fact a
              different (unicode) character. They can be used if you want to
              represent an empty space without using space. Let's say you want
              to use an empty value in a website or application, but spaces are
              not accepted. For this situation you can use one of the characters
              on this site. For example, sending an empty message, or setting a
              form value to blank. If the application filters out other unicode
              characters then the characters on this site might not work.
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
                <button>Read More</button>
              </div>
              <div className="service-content">
                <div className="icon-contain">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <h2>Make it easy</h2>
                <p>Enjoy your staycation.providing best hotels,etc</p>
                <button>Read More</button>
              </div>
              <div className="service-content">
                <div className="icon-contain">
                  <i class="fas fa-paint-brush"></i>
                </div>
                <h2>24/7</h2>
                <p>Enjoy your staycation.providing best hotels,etc</p>
                <button>Read More</button>
              </div>
            </div>
            
          </div>
        </section>
      </div>
    );
  }
}

export default AboutUs;
