import { useDispatch, useSelector } from "react-redux";
import { Button, Footer, Input, Nav } from "../../../components";
import { useEffect, useState } from "react";
import { getAllJob } from "../../../store/apiRequests";

function Job() {
  const idBusiness = useSelector((state) => state.business.business?.id);
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllJob(idBusiness, setData);
    // eslint-disable-next-line
  }, [idBusiness]);
  return (
    <div className="relative">
      <Nav type="business" />
      <div className="w-full bg-phu pb-72">
        <div className="w-1360 mx-auto pt-70">
          <div className=" w-full bg-chu2 mt-3">
            <div className="flex pl-5 mb-3 ">
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
                  <div className="w-3/5">
                    <Input
                      className="w-full"
                      placeholder="Nhập tên tin tìm việc"
                    />
                  </div>
                  <div className="flex w-2/12">
                    <div className="w-3/4 flex justify-center">
                      <Button
                        text="Xuất file excel"
                        className="bg-button h-full w-full text-chu2"
                      />
                    </div>
                    <div className=" w-1/4 flex justify-center">
                      <Button
                        text="Lọc"
                        className="bg-button h-full w-10 text-chu2"
                      />
                    </div>
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
                  {data?.map((e) => {
                    const index = e.expire.indexOf("T");
                    const date = e.expire.slice(0, index);
                    return (
                      <div
                        className="grid grid-cols-5 gap-4 mb-2 border-b"
                        key={e.id}
                      >
                        <div className="flex flex-col">
                          <div>{e.job.name}</div>
                          <div>{e.id}</div>
                          {e.job.addresses.map((address, i) => {
                            return <div key={i}>{address.city}</div>;
                          })}
                          <div>{e.business.email}</div>
                          <div>action</div>
                        </div>
                        <div className=" text-center">
                          {e.services.map((e, i) => {
                            return <p key={i}>{e.name}</p>;
                          })}
                        </div>
                        <div className=" text-center">{date}</div>
                        <div className=" text-center">
                          {e.cvs.length + "/" + e.cvs.length}
                        </div>
                        <div className=" text-center">
                          <Button
                            text="Làm mới"
                            className="bg-button h-10 w-20 text-chu2"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="grid grid-cols-5 gap-4 mb-2 border-b">
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
                  </div> */}
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
