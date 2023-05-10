import React from "react";

const RandomProduct = () => {
  return (
    <div className="productContainer">
      <div className="w-full flex justify-center">
        <div className="highlightHeader"></div>
        <div className="flex items-end h-80 text-[33px] font-normal px-5 text-white-50">
          Something You Might Like
        </div>
        <div className="highlightHeader"></div>
      </div>
      <div className="productImageContainer">
        <div id="bigImage" className="bigImageRandom"></div>
        <div className="splitImageContainer">
          <div id="splitImageTop" className="splitFirstRandom"></div>
          <div id="splitImageBottom" className="splitSecondRandom"></div>
        </div>
      </div>
    </div>
  );
};

export default RandomProduct;
