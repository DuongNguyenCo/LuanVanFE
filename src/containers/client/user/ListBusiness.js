import { Nav, Input, Button, DivFindB, Footer } from "../../../components";
import { useEffect, useState } from "react";
import { getBusiness, getBusinessById } from "../../../store/apiRequests";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Listbusiness() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChoose = (id) => {
    getBusinessById(id, dispatch, navigate);
  };
  useEffect(() => {
    getBusiness(setData, page, 12);
  }, [page]);
  return (
    <div className="relative">
      <Nav />
      <div className="w-full bg-phu">
        <div className="w-1360 h-screen mx-auto pb-72 pt-70 bg-chu2 px-4">
          <div className="w-8/12 mx-auto flex py-5 px-2 justify-around">
            <Input placeholder="Nhập tên công ty" className="w-9/12 " />
            <Button text="Tìm kiếm" className="w-2/12 bg-button text-chu2" />
          </div>
          <div className=" grid grid-cols-3 gap-4">
            {data?.map((e) => {
              console.log("e: ", e);

              return (
                <DivFindB
                  key={e.id}
                  url={e.url}
                  nameBusiness={e.name}
                  id={e.id}
                  address={e.addresses[0]?.city}
                  count={e.posts.length}
                  onClick={handleChoose}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Listbusiness;
