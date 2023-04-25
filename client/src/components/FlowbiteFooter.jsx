import { Footer } from "flowbite-react";

const FlowbiteFooter = () => {
  return (
    <Footer container={true} className="mt-80">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="#"
            src="/SerBizMainLogo.png"
            alt=""
            name="SerBiz"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="SerBiz" year={2023} />
      </div>
    </Footer>
  );
};

export default FlowbiteFooter;
