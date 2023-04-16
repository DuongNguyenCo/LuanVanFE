import { useEffect } from "react";
import { Footer, Nav } from "../../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";
function Home() {
  const busienss = useSelector((state) => state.business.business?.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!busienss) {
      navigate(path.BLOGIN);
    }
  }, [busienss, navigate]);
  return (
    <>
      <Nav type="business" />
      <div className="w-full bg-phu">
        <div className="w-1360 mx-auto">
          <div className="w-full h-screen pt-70">Trang dashboard</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
