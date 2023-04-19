import { Button, Footer, Input, Nav } from "../../../components";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  createJob,
  getData,
  getCity,
  getWard,
  getDistrict,
  createAddressBusiness,
  createStepPost,
  createPostService,
} from "../../../store/apiRequests";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  faPlusSquare,
  faPenToSquare,
  faRectangleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Post() {
  const init = {
    name: "",
    idTypeJob: "",
    idLanguage: [],
    salary: 0,
    quantity: 0,
    des: "",
    request: "",
    location: [],
  };

  const languages = useSelector((state) => state.language.list);
  const typejobs = useSelector((state) => state.typejob.list);
  const addresses = useSelector((state) => state.address.list);
  const service = useSelector((state) => state.service.list);
  const idBusiness = useSelector((state) => state.business.business?.id);
  const idPost = useSelector((state) => state.post.current?.id);
  const navigate = useNavigate();

  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const emails = [
    {
      value: 0,
      label: "Không gửi email",
    },
    {
      value: 1,
      label: "gửi email 1",
    },
    {
      value: 2,
      label: "gửi email 2",
    },
  ];
  const initStep = {
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
    step5: 0,
  };
  const initAddress = {
    idBusiness: idBusiness,
    street: "",
    ward: "",
    district: "",
    city: "",
  };

  const main = service?.filter((service) => service.type_service === 0);
  const configMain = main.map((a) => {
    const date = new Date(a.expire * 1000);
    const b = {
      id: a.id,
      value: a.name,
      label:
        a.name +
        (a.id === 1
          ? " - Vĩnh Viễn"
          : " - " +
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()),
    };
    return b;
  });

  const plus = service?.filter((service) => service.type_service === 1);
  const configPlus = plus.map((a) => {
    const date = new Date(a.exprire);
    const b = {
      id: a.id,
      value: a.name,
      label:
        a.name +
        " - " +
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear(),
    };
    return b;
  });
  const configCity = city?.map((city) => {
    const newCity = {
      id: city.code,
      value: city.name,
      label: city.name,
    };
    return newCity;
  });
  const configDistrict = district?.map((district) => {
    const newDistrict = {
      id: district.code,
      value: district.name,
      label: district.name,
    };
    return newDistrict;
  });
  const configWard = ward?.map((ward) => {
    const newWard = {
      id: ward.code,
      value: ward.name,
      label: ward.name,
    };
    return newWard;
  });

  const configLanguage = languages?.map((language) => {
    const newLanguages = {
      id: language.id,
      value: language.name,
      label: language.name,
    };
    return newLanguages;
  });

  const configTypeJob = typejobs?.map((typejob) => {
    const newLanguages = {
      id: typejob.id,
      value: typejob.name,
      label: typejob.name,
    };
    return newLanguages;
  });

  const [offset, setOffset] = useState(0);
  const height =
    offset +
    window.innerHeight -
    document.getElementById("job")?.offsetHeight -
    document.getElementById("busi")?.offsetHeight;

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dispatch = useDispatch();

  const [obj, setObj] = useState(init);
  const [address, setAddress] = useState(initAddress);
  const [postStep, setPostStep] = useState(initStep);

  const [step, setStep] = useState(1);
  const [option, setOption] = useState([]);

  const [des, setDes] = useState(14500);
  const [req, setReq] = useState(14500);
  const [countLocation, setCountLocation] = useState([1]);
  const [count, setCount] = useState(2);

  const [listAddress, setListAddress] = useState([]);
  const [location, setLocation] = useState([]);
  const [edit, setEdit] = useState(false);

  const [listService, setListService] = useState([]);
  const handleDeletelistAddress = (key) => {
    const newListAddress = [...listAddress];
    const newArr = [...location];
    const e = newListAddress[key];
    const e1 = newArr[e.index];
    const newE = { ...e1, isDisable: false };
    newArr[e1.index] = newE;
    const a1 = newListAddress.splice(0, key);
    const a2 = newListAddress.splice(key === 0 ? 1 : key);
    setLocation(newArr);
    setListAddress(a1.concat(a2));
    setObj({ ...obj, location: a1.concat(a2) });
  };

  const handleAddLocation = () => {
    setCount(count + 1);
    const newArr = [...countLocation, count];
    setCountLocation(newArr);
  };

  const handleDeleteLocation = (key) => {
    const remove = [...countLocation].filter((location) => location !== key);
    setCountLocation(remove);
  };

  const handleCreateAddress = () => {
    edit ? setEdit(!edit) : setEdit(!edit);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAddress(initAddress);
    getCity(setCity);
  };
  edit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const handleSubmit = () => {
    const a = {
      idPost: idPost,
      listService: listService,
    };
    createPostService(a, dispatch, navigate);
  };

  const [job, setJob] = useState();
  const stepOne = async () => {
    if (
      obj.name !== "" &&
      obj.idLanguage.length > 0 &&
      obj.idTypeJob !== "" &&
      obj.salary !== 0 &&
      obj.quantity !== 0 &&
      obj.des !== "" &&
      obj.request !== "" &&
      obj.location.length > 0
    ) {
      const a = await createJob(obj, dispatch, setJob);
      if (a) {
        setStep(step + 1);
      }
    }
  };

  const stepTwo = async () => {
    const post = { ...postStep, idJob: job.id, idBusiness: idBusiness };
    const a = await createStepPost(post, dispatch);
    if (a) {
      setStep(step + 1);
    }
  };

  const preStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (
      address.city !== "" ||
      address.district !== "" ||
      address.ward !== "" ||
      address.street !== ""
    ) {
      createAddressBusiness(address, dispatch, setEdit);
      getData(dispatch, idBusiness);
    }
  };

  useEffect(() => {
    getData(dispatch, idBusiness);
    // eslint-disable-next-line
  }, [idBusiness]);

  useEffect(() => {
    const configAddress = addresses?.map((address, index) => {
      const newAddress = {
        index: index,
        id: address.id,
        value:
          address.street +
          ", " +
          address.ward +
          ", " +
          address.district +
          ", " +
          address.city,
        label:
          address.street +
          ", " +
          address.ward +
          ", " +
          address.district +
          ", " +
          address.city,
        isDisable: false,
      };
      return newAddress;
    });
    setLocation(configAddress);
  }, [addresses]);
  return (
    <div className="relative">
      <Nav type="business" />
      <div className="w-full bg-phu " id="content">
        <div className="w-1360 mx-auto">
          {edit && (
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-slate-900/50 z-20 flex justify-center items-center">
              <div className="w-2/5 h-4/5 bg-white px-14 py-16 z-30 rounded-md ">
                <div className="w-full h-8">
                  <FontAwesomeIcon
                    icon={faRectangleXmark}
                    className="h-full float-right"
                    onClick={handleCreateAddress}
                  />
                </div>
                <p className="text-center">Tạo địa chỉ làm việc</p>
                <form onSubmit={handleAddNewAddress}>
                  <div className="w-full mb-4">
                    <label className="mb-2 inline-block">Tỉnh Thành phố</label>
                    <Select
                      options={configCity}
                      onChange={(e) => {
                        setDistrict(null);
                        getDistrict(e.id, setDistrict);
                        setAddress({ ...initAddress, city: e.value });
                      }}
                    />
                  </div>
                  {address.city !== "" && configDistrict && (
                    <div className="w-full mb-4">
                      <label className="mb-2 inline-block">Quận Huyện</label>
                      <Select
                        options={configDistrict}
                        onChange={(e) => {
                          setWard(null);
                          getWard(e.id, setWard);
                          setAddress({
                            ...address,
                            district: e.value,
                            ward: "",
                          });
                        }}
                      />
                    </div>
                  )}
                  {address.district !== "" && configWard && (
                    <div className="w-full mb-4">
                      <label className="mb-2 inline-block">Phường xã</label>
                      <Select
                        onChange={(e) => {
                          setAddress({
                            ...address,
                            ward: e.value,
                            street: "",
                          });
                        }}
                        options={configWard}
                      />
                    </div>
                  )}
                  {address.ward !== "" && (
                    <Input
                      label="Đường"
                      className="w-full mb-4"
                      placeholder="Eg: 180 Cao lỗ"
                      id="street"
                      name="street"
                      initValue={address}
                      setValue={setAddress}
                    />
                  )}

                  <div className="w-full mt-8 flex justify-center">
                    <Button
                      text="Thêm"
                      className="h-10 w-1/5 bg-button text-chu2"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="pt-70 w-full ">
            <div className=" h-70 mx-40 py-3 mt-3 bg-chu2">
              <ul className="flex justify-center h-full ">
                <li className="w-3/12 text-center my-auto">
                  <span
                    className={
                      (step === 1 ? "bg-stepActive " : "bg-step ") +
                      "inline-block w-30 h-30 rounded-full leading-30 "
                    }
                  >
                    1
                  </span>
                  <p>Chỉnh sửa việc làm </p>
                </li>
                <li className="w-3/12 text-center my-auto">
                  <span
                    className={
                      (step === 2 ? "bg-stepActive " : "bg-step ") +
                      "inline-block w-30 h-30 rounded-full leading-30 "
                    }
                  >
                    2
                  </span>
                  <p>Thiết lập quy trình tuyển dụng </p>
                </li>
                <li className="w-3/12 text-center my-auto">
                  <span
                    className={
                      (step === 3 ? "bg-stepActive " : "bg-step ") +
                      "inline-block w-30 h-30 rounded-full leading-30 "
                    }
                  >
                    3
                  </span>
                  <p>Đăng tuyển dụng</p>
                </li>
              </ul>
            </div>
            <div className="ralative">
              <div className={step === 1 ? "mt-5 mx-40 " : "hidden"}>
                <div className="flex flex-wrap p-5 bg-chu2" id="job">
                  <p className="mb-3">Mô tả công việc</p>
                  <div className="w-full flex justify-between mb-5">
                    <Input
                      label="Tên Công việc"
                      className="w-full mr-10"
                      placeholder="Eg: Lập Trình viên Back-End"
                      id="name"
                      name="name"
                      setValue={setObj}
                      initValue={obj}
                    />
                    <div className="w-full ml-10">
                      <label className="mb-2 inline-block">Cấp bậc</label>
                      <Select
                        options={configTypeJob}
                        onChange={(e) => {
                          setObj({ ...obj, idTypeJob: e.id });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between mb-5">
                    <div className="w-full mr-10">
                      <label className="mb-2 inline-block">
                        Ngôn ngữ lập trình
                      </label>
                      <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={configLanguage}
                        isOptionDisabled={() => option.length >= 3}
                        onChange={(e) => {
                          const list = e.map((a) => {
                            const b = {
                              id: a.id,
                            };
                            return b;
                          });
                          setObj({ ...obj, idLanguage: list });
                          setOption(e);
                        }}
                      />
                    </div>
                    <Input
                      label="Số lượng ứng tuyển"
                      className="w-full ml-10"
                      placeholder="Số lượng nhân viên tuyển cho công việc"
                      id="quantity"
                      name="quantity"
                      setValue={setObj}
                      initValue={obj}
                    />
                  </div>
                  <div className="w-full ">
                    <label htmlFor="address" className="mb-2 inline-block">
                      Địa chỉ
                    </label>
                    <div className="flex flex-wrap ">
                      {countLocation &&
                        countLocation.map((count, key) => {
                          return (
                            <div
                              key={count}
                              className="w-full max-h-10 flex mb-5"
                            >
                              <div className="w-11/12 ">
                                <Select
                                  options={location}
                                  isOptionDisabled={(option) =>
                                    option.isDisable
                                  }
                                  onChange={(e) => {
                                    const newArr = [
                                      ...listAddress,
                                      { id: e.id, index: e.index },
                                    ];
                                    const newE = { ...e, isDisable: true };
                                    const newArr1 = [...location];
                                    newArr1[e.index] = newE;
                                    setListAddress(newArr);
                                    setLocation(newArr1);
                                    setObj({ ...obj, location: newArr });
                                  }}
                                />
                              </div>
                              <div
                                className="w-1/12 flex h-6 my-auto"
                                onClick={handleCreateAddress}
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="w-full h-full"
                                />
                              </div>
                              <div
                                className="w-1/12 flex h-6 my-auto"
                                onClick={() => {
                                  if (countLocation.length > 1) {
                                    handleDeleteLocation(count);
                                    handleDeletelistAddress(key);
                                  }
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="w-full h-full"
                                />
                              </div>
                            </div>
                          );
                        })}
                      {countLocation && countLocation.length < 3 && (
                        <div
                          className="w-full max-h-10 flex mb-5 border-dotted border-2 border-gray-300 rounded-md"
                          onClick={() => {
                            handleAddLocation();
                          }}
                        >
                          <div className="h-full w-10 flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={faPlusSquare}
                              className="w-5 h-5"
                            />
                          </div>
                          <div className="h-full leading-9">
                            Thêm địa chỉ mới
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full mb-5">
                    <label>Mô Tả</label>
                    <textarea
                      onChange={(e) => {
                        setDes(14500 - e.target.value.length);
                        setObj({
                          ...obj,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      maxLength="14500"
                      rows="5"
                      placeholder="Mô tả về công việc"
                      className="border w-full p-1 mt-2"
                      name="des"
                    ></textarea>
                    <div className="float-right text-mini">
                      ({des}/14500 ký tự)
                    </div>
                  </div>
                  <div className="w-full mb-5">
                    <label className=" ">Yêu cầu</label>
                    <textarea
                      onChange={(e) => {
                        setReq(14500 - e.target.value.length);
                        setObj({
                          ...obj,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      maxLength="14500"
                      rows="5"
                      placeholder="Yêu cầu cho công việc"
                      className="border w-full p-1 mt-2"
                      name="request"
                    ></textarea>
                    <div className="float-right text-mini">
                      ({req}/14500 ký tự)
                    </div>
                  </div>
                  <div className="w-full mb-5">
                    <Input
                      label="Mức lương"
                      placeholder="Mức lương tối thiểu"
                      id="salary"
                      name="salary"
                      setValue={setObj}
                      initValue={obj}
                    />
                  </div>
                </div>
              </div>
              <div className={step === 2 ? "mt-5 mx-40" : "hidden"}>
                <div className="flex flex-wrap p-5 bg-chu2">
                  <div className="w-full flex flex-wrap border mb-2 py-3 px-2 items-center rounded-md">
                    <div className="w-9/12 flex flex-col">
                      <div>Bước 1:</div>
                      <div>Nhận hồ sơ</div>
                    </div>
                    <Select
                      className="w-3/12"
                      name="step1"
                      options={emails}
                      defaultValue={emails[0]}
                      onChange={(e, action) => {
                        setPostStep({ ...postStep, [action.name]: e.value });
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-wrap border mb-2 py-3 px-2 items-center rounded-md">
                    <div className="w-9/12 flex flex-col">
                      <div>Bước 2:</div>
                      <div>Duyệt hồ sơ</div>
                    </div>
                    <Select
                      className="w-3/12"
                      name="step2"
                      options={emails}
                      defaultValue={emails[0]}
                      onChange={(e, action) => {
                        setPostStep({ ...postStep, [action.name]: e.value });
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-wrap border mb-2 py-3 px-2 items-center rounded-md">
                    <div className="w-9/12 flex flex-col">
                      <div>Bước 3:</div>
                      <div>Kiểm tra năng lực</div>
                    </div>
                    <Select
                      className="w-3/12"
                      name="step3"
                      options={emails}
                      defaultValue={emails[0]}
                      onChange={(e, action) => {
                        setPostStep({ ...postStep, [action.name]: e.value });
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-wrap border mb-2 py-3 px-2 items-center rounded-md">
                    <div className="w-9/12 flex flex-col">
                      <div>Bước 4:</div>
                      <div>Đề nghị nhận việc</div>
                    </div>
                    <Select
                      className="w-3/12"
                      name="step4"
                      options={emails}
                      defaultValue={emails[0]}
                      onChange={(e, action) => {
                        setPostStep({ ...postStep, [action.name]: e.value });
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-wrap border mb-2 py-3 px-2 items-center rounded-md">
                    <div className="w-9/12 flex flex-col">
                      <div>Bước 5:</div>
                      <div>Đã tuyển</div>
                    </div>
                    <Select
                      className="w-3/12"
                      name="step5"
                      options={emails}
                      defaultValue={emails[0]}
                      onChange={(e, action) => {
                        setPostStep({ ...postStep, [action.name]: e.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={step === 3 ? "mt-5 mx-40" : "hidden"}>
                <div className="flex flex-wrap p-5 bg-chu2 mb-4">
                  <div className="w-full">
                    <div className="grid grid-cols mb-2 border-b pb-2">
                      <p>Chọn Gói Dịch Vụ Phù Hợp Để Đăng Tuyển</p>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mb-2 pb-2 border-b">
                      <div className="col-span-2">Gói dịch vụ</div>
                      <div className="col-span-2">
                        Tên Dịch vụ - Ngày hết hạng
                      </div>
                      <div className="text-center">Số lượng</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mb-2 border-b py-3">
                      <div className="col-span-2">Dịch vụ đăng tin</div>
                      <div className="col-span-2">
                        <Select
                          options={configMain}
                          onChange={(e) => {
                            setListService([e.id]);
                          }}
                        />
                      </div>
                      <div className="text-center">1</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap p-5 bg-chu2">
                  <div className="w-full">
                    <div className="grid grid-cols mb-2 border-b pb-2">
                      <p>Tùy Chọn Dịch Vụ Thêm</p>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mb-2 pb-2 border-b">
                      <div className="col-span-2">Gói dịch vụ</div>
                      <div className="col-span-2">
                        Tên Dịch vụ - Ngày hết hạng
                      </div>
                      <div className="text-center">Số lượng</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mb-2 border-b py-3">
                      <div className="col-span-2">Dịch vụ hiển thị</div>
                      <div className="col-span-2">
                        <Select
                          options={configPlus}
                          onChange={(e) => {
                            const a = listService.indexOf(e.id);
                            if (a < 0) {
                              setListService([...listService, e.id]);
                            } else {
                              listService[a] = e.id;
                            }
                          }}
                        />
                      </div>
                      <div className="text-center">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  height < 220
                    ? "flex justify-center w-full mt-2 py-2 fixed bottom-0 left-0"
                    : "flex justify-center w-full mt-2 py-2 "
                }
              >
                {step === 1 ? (
                  <div onClick={stepOne}>
                    <Button
                      text="Lưu và tiếp tục"
                      className="h-10 mx-auto bg-button text-chu2 px-2"
                    />
                  </div>
                ) : step === 2 ? (
                  <>
                    <div onClick={preStep} className="mr-3">
                      <Button
                        text="Quay lại"
                        className="h-10 mx-auto bg-button text-chu2 px-2"
                      />
                    </div>
                    <div onClick={stepTwo}>
                      <Button
                        text="Lưu và tiếp tục"
                        className="h-10 mx-auto bg-button text-chu2 px-2"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div onClick={preStep} className="mr-3">
                      <Button
                        text="Quay lại"
                        className="h-10 mx-auto bg-button text-chu2 px-2"
                      />
                    </div>
                    <div onClick={handleSubmit}>
                      <Button
                        text="Hoàn thành"
                        className="h-10 mx-auto bg-button text-chu2 px-2"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer type={null} />
    </div>
  );
}
export default Post;
