import { Button, Footer, Nav } from "../../../components";
import hinh from "../../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getBusinessById } from "../../../store/apiRequests";
function Detailjob() {
  const job = useSelector((state) => state.job.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const index = job.post.createdAt.indexOf("T");
  const date = job.post.createdAt.slice(0, index);
  const [like, setLike] = useState(true);
  const handleChoose = (id) => {
    getBusinessById(id, dispatch, navigate);
  };
  const des = job.des.split("\n");
  const request = job.request.split("\n");
  return (
    <div className="relative">
      <Nav />
      <div className="w-full bg-phu pb-72">
        <div className="pt-70 w-1360 mx-auto bg-chu2 ">
          <div className="mt-3 h-auto grid grid-cols-3 gap-4">
            <div className="w-full col-span-2 ">
              <div className="flex flex-wrap px-10 ">
                <p className="w-full mb-2 text-big font-bold">{job.name}</p>
                <div className="flex w-full justify-between border-b py-5">
                  <Link to={path.APPLY} className="w-11/12 mr-3">
                    <Button
                      className="w-full h-9 bg-button text-chu2"
                      text="Ứng tuyển"
                    />
                  </Link>
                  <div
                    onClick={() => {
                      setLike(!like);
                    }}
                    className=" h-9 px-2 rounded"
                  >
                    <Button
                      className="w-full h-full text-center my-auto border-none"
                      text={
                        <FontAwesomeIcon
                          icon={like ? fullHeart : solidHeart}
                          className="w-full h-full "
                          style={{ color: "rgb(234, 30, 48)" }}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-10 mt-3">
                <div className="w-full flex">
                  {job.languages.map((e, i) => {
                    return (
                      <p className="w-20 mr-3 border text-center" key={i}>
                        {e.name}
                      </p>
                    );
                  })}
                </div>
                <div className="w-full">
                  {job.salary.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="w-full">
                  {job.addresses.map((e, i) => {
                    return (
                      <p className="w-full mr-5 " key={i}>
                        {e.street +
                          ", " +
                          e.ward +
                          ", " +
                          e.district +
                          ", " +
                          e.city}
                      </p>
                    );
                  })}
                </div>
                <div className="w-full">{date}</div>
              </div>
              <div className="border-b mx-10 mt-3"></div>
              <div className="flex flex-col px-10 mt-2">
                <div className="mb-3">
                  <b>Mô tả công việc</b>
                  <div className="pl-5">
                    {des.map((e, i) => {
                      return <li key={i}>{e}</li>;
                    })}
                  </div>
                </div>
                <div className="mb-3">
                  <b>Yêu cầu công việc</b>
                  <div className="pl-5">
                    {request.map((e, i) => {
                      return <li key={i}>{e}</li>;
                    })}
                  </div>
                </div>
                <div>
                  <b>Quyền lợi khi vào công ty</b>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className=" flex flex-wrap  m-4">
                <div className="w-full flex flex-col items-center">
                  <div className="h-170 flex items-center">
                    <img src={job.post.business.url} alt="logo" />
                  </div>
                  <div className="my-2">
                    <p>{job.post.business.name}</p>
                  </div>
                </div>
                {/* <div className="w-full my-2 grid grid-cols-2 text-center">
                  <div className="h-8">số lượng nhân sự</div>
                  <div className="">khu vực</div>
                  <div className="h-8">Link Trang web</div>
                  <div className="">bản đồ</div>
                </div> */}
                <div className="w-full my-2 flex justify-center">
                  <div
                    onClick={() => {
                      handleChoose(job.post.business.id);
                    }}
                  >
                    <Button
                      text="Về chúng tôi"
                      className="p-2 bg-button text-chu2 px-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detailjob;
