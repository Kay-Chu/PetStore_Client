import React from "react";
import bannerImg from "../assets/homepage/banner.png";
import contentBG from "../assets/about/contentBG_1.png";
import storyImg from "../assets/about/storyImg_2.jpg";
import employeeImg from "../assets/about/employee3.jpg";
import { DecorationCircle } from "../components/DecorationCircle";

const About = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={bannerImg}
          alt="About Banner"
          className="w-full h-full object-cover object-right-top"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div
        className="relative p-8 md:px-12 bg-contain bg-center"
        style={{ backgroundImage: `url(${contentBG})` }}
      >
        <div className="absolute inset-0 bg-gray-200/10 -z-11"></div>
        <div className="relative max-w-7xl mx-auto space-y-8">
          {/* Our Story */}
          <section className="flex flex-col md:flex-row items-center md:space-x-12 bg-white rounded-xl shadow-lg p-6 md:p-12">
            <div className="md:w-1/4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Max arrived at our shelter six months ago, timid and unsure. Rescued from a stressful environment, he initially hid from staff and visitors. It took patience, gentle care, and daily encouragement for Max to start trusting humans again.
                Through playtime, training, and socialization, Max gradually opened up. Our volunteers celebrated every milestone: first tail wag, first fetch, first joyful bark. Max’s transformation reminded everyone that every animal, no matter how scared, can thrive with love.
              </p>
            </div>
            <div className="md:w-3/4 pl-24 mt-6 mm:mt-0">
              <img
                src={storyImg}
                alt="Our Story"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-start overflow-hidden">
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-700  z-10">
                To provide the best services and make a positive impact
                in our community through dedication and innovation.
              </p>
              <DecorationCircle
                size={192}
                color="border-fire-bush-400"
                className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 pointer-events-none"
              />
            </div>
            <div className="relative bg-white  rounded-xl shadow-lg p-6 flex flex-col items-start overflow-hidden">
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-700  z-10">
                To become a globally recognized organization known for
                excellence, compassion, and sustainable growth.
              </p>
              <DecorationCircle
                size={192}
                color="border-fire-bush-400"
                className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 pointer-events-none"
              />
            </div>

          </section>

          {/* Team Section */}
          <section className="border-4 rounded-md p-6 border-fire-bush-500">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center ">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {["Alice", "Bob", "Charlie", "Diana"].map((name) => (
                <div
                  key={name}
                  className="bg-white/90 rounded-xl shadow-lg overflow-hidden text-center p-4"
                >
                  <img
                    src={employeeImg}
                    alt={name}
                    className="w-full h-68 object-cover mb-4 rounded-lg"
                  />
                  <h4 className="font-bold text-lg">{name}</h4>
                  <p className="text-gray-600 text-sm">Position</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
