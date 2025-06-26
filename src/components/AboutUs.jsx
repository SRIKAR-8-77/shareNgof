// src/components/AboutUs.jsx
import React from "react";

import CustomerCare from "../assets/images/service.jpeg"; 
import groupDiscussion from "../assets/images/discussion.jpeg"; 
import shivaniImg from "../assets/images/person2.jpeg";
import taranjitImg from "../assets/images/person1.jpeg";
import karanImg from "../assets/images/person3.jpeg";

const testimonials = [
  {
    name: "Shivani Sharma",
    role: "Social Media Influencer",
    text: `Boost your product and service's credibility by adding testimonials from your clients. 
           People love recommendations so feedback from others who've tried it is invaluable.`,
    image: shivaniImg,
  },
  {
    name: "Taranjit Singh Gill",
    role: "Rang Panjab Label Founder",
    text: `Boost your product and service's credibility by adding testimonials from your clients. 
           People love recommendations so feedback from others who've tried it is invaluable.`,
    image: taranjitImg,
  },
  {
    name: "Karan Chawla",
    role: "VJ at Green Chilis Radio",
    text: `Boost your product and service's credibility by adding testimonials from your clients. 
           People love recommendations so feedback from others who've tried it is invaluable.`,
    image: karanImg,
  },
];

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Section 1: Work With Us */}
      <section className="bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 py-12">
        <div className="md:w-1/2 flex flex-col justify-center space-y-6 p-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full" />
            <span className="text-sm font-bold tracking-widest">STUDIO AGATHO</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">WORK<br />WITH US</h1>
          <div>
            <p className="text-sm font-semibold text-white">WE DESIGN THE FUTURE</p>
            <p className="text-gray-300 mt-2 text-sm">
              As an award-winning design agency, we enable brands to make their mark in history.
              Begin your story with us.
            </p>
          </div>
          <button className="bg-white text-black rounded-full px-6 py-2 font-semibold w-fit hover:scale-105 transition">
            LEARN MORE
          </button>
        </div>

        <div className="md:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 p-4">
          <img
            src={CustomerCare}
            alt="Customer Care"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <img
            src={groupDiscussion}
            alt="Group Discussion"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 h-40 w-full shadow-lg" />
          <div className="rounded-md bg-gradient-to-br from-pink-400 to-purple-600 h-40 w-full shadow-lg" />
        </div>
      </section>

      {/* Section 2: Our Work */}
      <section className="bg-white text-black py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {/* Optional images or content can go here */}
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">OUR WORK</h2>
            <hr className="border-black w-20 mb-6" />
            <p className="text-gray-800 mb-4">
              Since its founding in the 1980s, Studio Agatho has been the go-to company for various design needs.
            </p>
            <p className="text-gray-800">
              Agatho boasts a global client base and various industry awards. It has set the standard for design studios
              as its clients collaborate with the highest caliber of creatives, engineers and ambassadors.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Testimonials */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">WHAT OUR CLIENTS SAY</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="border-t pt-6">
                <p className="text-sm text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
