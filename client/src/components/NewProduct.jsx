import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="productContainer">
      <div className="highlightHeader">Newest on the Catalogue</div>
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
