import React from "react";

const RandomProduct = () => {
  return (
    <div className="productContainer">
      <div className="highlightHeader">You might like</div>
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
