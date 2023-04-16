import { useDispatch, useSelector } from "react-redux";
import { Footer, Nav } from "../../../components";
import { useEffect } from "react";
import { getAllJob } from "../../../store/apiRequests";

function Job() {
  const idBusiness = useSelector((state) => state.business.business?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllJob(idBusiness, dispatch);
    // eslint-disable-next-line
  }, [idBusiness]);
  return (
    <div className="relative">
      <Nav type="business" />
      <div className="w-full h-screen bg-phu pb-72">
        <div className="w-1360 mx-auto">
          <div className="pt-70 w-full">
            <div className="flex pl-5 mb-3">
              <div className="h-8 leading-10 font-bold text-sm mr-10 hover:border-b-2 hover:border-indigo-500">
                Đăng hiển thị
              </div>
              <div className="h-8 leading-10 font-bold text-sm mr-10 hover:border-b-2 hover:border-indigo-500">
                Đang ẩn
              </div>
              <div className="h-8 leading-10 font-bold text-sm mr-10 hover:border-b-2 hover:border-indigo-500">
                Sắp hết hạn
              </div>
              <div className="h-8 leading-10 font-bold text-sm mr-10 hover:border-b-2 hover:border-indigo-500">
                Đã hết hạn
              </div>
              <div className="h-8 leading-10 font-bold text-sm mr-10 hover:border-b-2 hover:border-indigo-500">
                Nháp
              </div>
            </div>
            <div>
              <div className="w-full px-5">
                <div className="w-full flex justify-between pb-4 pt-2">
                  <div className="w-20">tìm kiếm</div>
                  <div className="flex">
                    <div className=" w-20">xuất file ex</div>
                    <div className=" w-20">lọc</div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-5 gap-4 mb-2 border-b pb-2">
                    <p>Tên Công việc</p>
                    <p className=" text-center">Dịch vụ</p>
                    <p className=" text-center">Hết hạn</p>
                    <p className=" text-center">Hồ sơ ứng tuyển</p>
                    <p className=" text-center">Làm mới</p>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mb-2 border-b">
                    <div className="flex flex-col">
                      <div>tên bài post</div>
                      <div>mã bài post</div>
                      <div>Nơi làm việc</div>
                      <div>người đăng</div>
                      <div>action</div>
                    </div>
                    <div className=" text-center">tên dịch vụ</div>
                    <div className=" text-center">ngày hết hạn</div>
                    <div className=" text-center">số lượng hồ sơ</div>
                    <div className=" text-center">làm mới bài đăng</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mb-2 border-b">
                    <div className="flex flex-col">
                      <div>tên bài post</div>
                      <div>mã bài post</div>
                      <div>Nơi làm việc</div>
                      <div>người đăng</div>
                      <div>action</div>
                    </div>
                    <div className=" text-center">tên dịch vụ</div>
                    <div className=" text-center">ngày hết hạn</div>
                    <div className=" text-center">số lượng hồ sơ</div>
                    <div className=" text-center">làm mới bài đăng</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mb-2 border-b">
                    <div className="flex flex-col">
                      <div>tên bài post</div>
                      <div>mã bài post</div>
                      <div>Nơi làm việc</div>
                      <div>người đăng</div>
                      <div>action</div>
                    </div>
                    <div className=" text-center">tên dịch vụ</div>
                    <div className=" text-center">ngày hết hạn</div>
                    <div className=" text-center">số lượng hồ sơ</div>
                    <div className=" text-center">làm mới bài đăng</div>
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

export default Job;
<div></div>;
