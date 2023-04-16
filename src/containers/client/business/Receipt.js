import { Footer, Nav } from "../../../components";

function Receipt() {
  return (
    <div className="relative">
      <Nav type="business" />
      <div className="w-full h-screen  bg-phu pb-72">
        <div className="w-1360 mx-auto">
          <div className="w-full pt-70">Trang đơn hàng</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Receipt;
