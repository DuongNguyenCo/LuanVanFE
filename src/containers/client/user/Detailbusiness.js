import { Button, DivFindJ, Footer, Nav } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getJobById } from "../../../store/apiRequests";
import { useNavigate } from "react-router-dom";
function Detailbusiness() {
  const business = useSelector((state) => state.business.choose);
  console.log("business: ", business);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChoose = (id) => {
    getJobById(id, dispatch, navigate);
  };
  return (
    <div className="relative">
      <Nav />
      <div className="w-full bg-phu">
        <div className="w-1024 pb-72 pt-70 mx-auto bg-chu2">
          <div className=" h-200 border mt-3 flex p-2">
            <div className="w-3/12 mr-2 flex items-center">
              <img src={business.url} alt="logo" />
            </div>
            <div className="w-9/12  pl-4">
              <div className="my-2  font-bold">{business?.name}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>Số lượng nhân sự</div>
                <div>Khu vực</div>
                <div>Link trang web</div>
                <div>bản đồ</div>
              </div>
            </div>
            <div className="w-3/12 flex flex-col justify-center">
              <Button text="Viết đánh giá" className="mb-2 h-8" />
              <Button text="Theo dõi" className="h-8" />
            </div>
          </div>
          <div className="mt-2 flex">
            <div className="w-28 text-center p-2 mr-2 hover:border-b-2 hover:border-indigo-500">
              Tuyển dụng
            </div>
            <div className="w-28 text-center p-2 hover:border-b-2 hover:border-indigo-500">
              Review
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-3">
            <div className="col-span-2 p-4">
              <div className="w-full mb-2">{business?.name} Tuyển Dụng</div>
              <div className="w-full grid gap-2">
                {business?.posts?.map((e) => {
                  return (
                    <DivFindJ
                      key={e.id}
                      id={e.id}
                      url={business.url}
                      nameJob={e.job.name}
                      create={e.createdAt}
                      salary={e.job.salary}
                      listLanguage={e.job.languages}
                      listLocation={e.job.addresses}
                      onClick={handleChoose}
                    />
                  );
                })}
              </div>
            </div>
            <div className=""> review</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detailbusiness;
