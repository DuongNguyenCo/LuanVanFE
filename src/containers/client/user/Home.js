import { useEffect, useState } from "react";
import { Nav, Header, Divbusiness, Divjob, Footer } from "../../../components";
import {
  getBusiness,
  getJob,
  getJobById,
  getBusinessById,
} from "../../../store/apiRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [job, setJob] = useState([]);
  const [page, setPage] = useState(1);
  const [pageJob, setPageJob] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChoose = (id) => {
    getJobById(id, dispatch, navigate);
  };
  const handleChoose1 = (id) => {
    getBusinessById(id, dispatch, navigate);
  };

  const handleIncrease = () => {
    if (data.length > 0 && data.length === 5) {
      setPage(page + 1);
      console.log(1);
    }
  };
  const handleDeincrease = () => {
    if (page >= 2) setPage(page - 1);
  };

  useEffect(() => {
    getBusiness(setData, page, 5);
  }, [page]);

  useEffect(() => {
    getJob(setJob, pageJob, 9);
  }, [pageJob]);

  return (
    <div className="relative">
      <Nav />
      <div className="w-full bg-chinh ">
        <div className="w-1360 mx-auto">
          <Header />
        </div>
      </div>
      <div className="w-full bg-phu pb-72">
        <div className="w-1360 mx-auto">
          <div className="flex flex-wrap w-1360">
            <div className="flex flex-wrap items-center justify-between w-1360 mx-2 mt-5 mb-2 ">
              <p className="text-h1 font-bold">Nhà Tuyển Dụng Hàng Đầu</p>
              <div className="text-span ">
                <p className="uppercase text-link cursor-pointer">Xem Tất cả</p>
              </div>
            </div>
            <div className="flex w-full">
              <div className="my-auto ml-5 h-full" onClick={handleDeincrease}>
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-full" />
              </div>
              <div className="w-full flex">
                {data?.map((data) => {
                  const b = data.posts.length;
                  let a = data.addresses[0]?.city.split(" ");
                  if (a && a[0] === "Tỉnh") {
                    a = a?.slice(1);
                    a = a?.join(" ");
                  } else if (a && a[0] === "Thành") {
                    a = a?.slice(2);
                    a = a?.join(" ");
                  } else {
                    a = a?.slice(0, -1);
                    a = a?.join(" ");
                  }
                  return (
                    <Divbusiness
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      city={a}
                      count={b}
                      url={data.url}
                      onClick={handleChoose1}
                    />
                  );
                })}
              </div>
              <div className="my-auto mr-5 h-full" onClick={handleIncrease}>
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-full" />
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap w-1360 ">
            <div className="flex flex-wrap items-center justify-between w-1360 mx-2 mt-5 mb-2 ">
              <p className="text-h1 font-bold">Công việc mới nhất</p>
              <div className="text-span ">
                <p className="uppercase text-link cursor-pointer">Xem Tất cả</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              {job &&
                job.map((data) => {
                  return (
                    <Divjob
                      key={data.id}
                      id={data.id}
                      url={data.business.url}
                      nameBusiness={data.business.name}
                      nameJob={data.job.name}
                      listLanguage={data.job.languages}
                      onClick={handleChoose}
                    />
                  );
                })}
            </div>

            {/* <div className="mx-auto bg-chu2 mb-2">1,2,3,4,5,6,7</div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
