import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="productContainer">
      <div className="w-full flex justify-center">
        <div className="highlightHeader"></div>
        <div className="flex items-end h-80 text-[33px] font-normal px-5 text-white-50">
          Newest on the Catalogue
        </div>
        <div className="highlightHeader"></div>
      </div>
      <div className="productImageContainer">
        <div
          id="bigImage"
          className="bigImageNew"
          onClick={() => navigate("/Business")}
        >
          {/* <img src="/DakadaMain.jpg" alt="" /> */}
        </div>
        <div className="splitImageContainer">
          <div id="splitImageTop" className="splitFirstNew">
            {/* <img src="/DakadaRight.jpg" alt="" /> */}
          </div>
          <div id="splitImageBottom" className="splitSecondNew">
            {/* <img src="/DakadaLeft.jpg" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
