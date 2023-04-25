import { Footer } from "flowbite-react";
import Navbar from "../components/Navbar";
import FlowbiteFooter from "../components/FlowbiteFooter";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="aboutPageContainer">
        <div className="aboutTextContainer">
          <div>
            <h1>ABOUT</h1>
            <p>
              SerBiz aims to provide up-to-date information about Local
              Businesses and allow for a preview of the business aesthetic,
              location, price points via Catalogue Images along with the
              provided information. It's Mission is to aim for a hassle free
              decision-making and security that the Business you plan to go to
              actually exist or is still in the location that it's meant to be
              before you head out.
            </p>
          </div>
        </div>
        <div className="aboutFounderContainer">
          <div className="aboutFounderImage"></div>
          <div className="aboutTextContainer">
            <h1>FOUNDER</h1>
            Hi! I'm Paolo Pendon, I was born in Iloilo City the so called
            Philippine's <span className="italic">City of Love</span>. I'm a
            career shifter and currently a bootcamper at StackTrek. Doing my
            best to become a significant FullStack Developer. I made this webapp
            (SerBiz)......🚧Working on it at the moment👷‍♂️🚧
          </div>
        </div>
      </div>
      <FlowbiteFooter />
    </div>
  );
};

export default AboutPage;
