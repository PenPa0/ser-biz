const TrendingProduct = () => {
  return (
    <div className="productContainer">
      <div className="w-full flex justify-center">
        <div className="highlightHeader"></div>
        <div className="flex items-end h-80 text-[33px] font-normal px-5 text-white-50">
          Trending
        </div>
        <div className="highlightHeader"></div>
      </div>
      <div className="productImageContainer">
        <div id="bigImage" className="bigImageTrend"></div>
        <div className="splitImageContainer">
          <div id="splitImageTop" className="splitFirstTrend"></div>
          <div id="splitImageBottom" className="splitSecondTrend"></div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="productContainer">
  //     <div className="highlightHeader">Trending on the Catalogue</div>
  //     <div className="imageContainer">
  //       <img className="mainImage" src="/CrithitMain.jpg" alt="" />
  //       <img className="leftImage" src="/CrithitLeft.jpg" alt="" />
  //       <img className="rightImage" src="/CrithitRight.jpg" alt="" />
  //     </div>
  //   </div>
  // );
};

export default TrendingProduct;
