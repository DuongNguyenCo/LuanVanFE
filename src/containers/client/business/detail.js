import { useEffect, useState } from "react";
import { Button, Footer, Input, Nav } from "../../../components";
import {
  getAddress,
  getCity,
  getDistrict,
  getWard,
  updateAddress,
  updateBusiness,
} from "../../../store/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

function Detail() {
  const business = useSelector((state) => state.business.business);
  const address = useSelector((state) => state.address.listB);
  const dispatch = useDispatch();
  const init = {
    name: "",
    phone: "",
    email: "",
    des: "",
    benefit: "",
    url: "",
  };
  const initAddress = {
    idBusiness: business.id,
    idAddress: 0,
    street: "",
    ward: "",
    district: "",
    city: "",
  };
  const [data, setData] = useState(init);
  const [image, setImage] = useState(null);
  const [display1, setDisplay1] = useState(false);
  const [display2, setDisplay2] = useState(true);
  const [display3, setDisplay3] = useState(true);
  const [edit, setEdit] = useState(false);
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [addresss, setAddress] = useState(initAddress);

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

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    updateBusiness(data, dispatch);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImage(fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleChoose1 = () => {
    setDisplay1(false);
    setDisplay2(true);
    setDisplay3(true);
  };
  const handleChoose2 = () => {
    setDisplay1(true);
    setDisplay2(false);
    setDisplay3(true);
    getAddress(business.id, dispatch);
  };
  const handleChoose3 = () => {
    setDisplay1(true);
    setDisplay2(true);
    setDisplay3(false);
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    await updateAddress(addresss);
    setEdit(!edit);
    getAddress(business.id, dispatch);
  };
  const handleUpdate = (e) => {
    edit ? setEdit(!edit) : setEdit(!edit);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAddress({ ...addresss, idAddress: e });
    getCity(setCity);
  };
  edit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const handleDelete = () => {};

  useEffect(() => {
    const a = {
      name: business.name,
      phone: business.phone,
      email: business.email,
      des: business.des,
      benefit: business.benefit,
      url: business.url,
    };
    setData(a);
  }, [business]);

  return (
    <>
      <Nav type="business" />
      <div className="w-full bg-phu ">
        {edit && (
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-slate-900/50 z-20 flex justify-center items-center">
            <div className="w-2/5 h-4/5 bg-white px-14 py-16 z-30 rounded-md ">
              <div className="w-full h-8">
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  className="h-full float-right"
                  onClick={handleUpdate}
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
                      setAddress({
                        ...addresss,
                        city: e.value,
                        district: "",
                        ward: "",
                      });
                    }}
                  />
                </div>
                {addresss.city !== "" && configDistrict && (
                  <div className="w-full mb-4">
                    <label className="mb-2 inline-block">Quận Huyện</label>
                    <Select
                      options={configDistrict}
                      onChange={(e) => {
                        setWard(null);
                        getWard(e.id, setWard);
                        setAddress({
                          ...addresss,
                          district: e.value,
                          ward: "",
                        });
                      }}
                    />
                  </div>
                )}
                {addresss.district !== "" && configWard && (
                  <div className="w-full mb-4">
                    <label className="mb-2 inline-block">Phường xã</label>
                    <Select
                      onChange={(e) => {
                        setAddress({
                          ...addresss,
                          ward: e.value,
                          street: "",
                        });
                      }}
                      options={configWard}
                    />
                  </div>
                )}
                {addresss.ward !== "" && (
                  <Input
                    label="Đường"
                    className="w-full mb-4"
                    placeholder="Eg: 180 Cao lỗ"
                    id="street"
                    name="street"
                    initValue={addresss}
                    setValue={setAddress}
                  />
                )}
                <div className="w-full mt-8 flex justify-center">
                  <Button
                    text="Lưu"
                    className="h-10 w-1/5 bg-button text-chu2"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="w-1360 mx-auto py-7 flex gap-8">
          <div className="w-1/5 pt-70">
            <div className="bg-chu2">
              <div className="pl-3 py-2 border" onClick={handleChoose1}>
                Thông tin doanh nghiệp
              </div>
              <div className="pl-3 py-2 border" onClick={handleChoose2}>
                Địa chỉ làm việc
              </div>
              <div className="pl-3 py-2 border" onClick={handleChoose3}>
                Mẫu email
              </div>
            </div>
          </div>
          <div className="w-4/5 pt-70">
            <div className="bg-chu2 py-5 px-4">
              <form
                className={(display1 && "hidden") || ""}
                onSubmit={handleSubmitInfo}
              >
                <div className="flex flex-wrap mb-5">
                  <div className="w-full pb-1  mb-2 border-b border-b-black">
                    Thông tin doanh nghiệp
                  </div>
                  <div className="w-full flex flex-wrap">
                    <div className="flex gap-5 w-full">
                      <Input
                        label="Tên doanh nghiệp"
                        placeholder="Tên doanh nghiệp"
                        name="name"
                        initValue={data}
                        setValue={setData}
                        value={data.name || ""}
                      />
                    </div>
                    <div className="flex gap-5 w-full">
                      <Input
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        name="phone"
                        initValue={data}
                        setValue={setData}
                        value={data.phone || ""}
                      />
                      <Input
                        label="Email"
                        placeholder="Email"
                        name="emai"
                        initValue={data}
                        setValue={setData}
                        value={data.email || ""}
                      />
                    </div>
                    <div className=" w-full">
                      <label>Mô tả doanh nghiệp</label>
                      <textarea
                        name="des"
                        onChange={(e) => {
                          setData({
                            ...data,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        maxLength="14500"
                        rows="5"
                        placeholder="Mô tả về doanh nghiệp"
                        className="border w-full p-1 mt-2"
                        defaultValue={data?.des}
                      ></textarea>
                    </div>
                    <div className=" w-full">
                      <label>Quyền lợi khi vào công ty</label>
                      <textarea
                        name="benefit"
                        onChange={(e) => {
                          setData({
                            ...data,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        maxLength="14500"
                        rows="5"
                        placeholder="Quyền lợi khi vào doanh nghiệp"
                        className="border w-full p-1 mt-2"
                        defaultValue={data?.benefit}
                      ></textarea>
                    </div>
                    <div className="flex flex-wrap w-full">
                      <div className="w-full mb-2 ">Logo doanh nghiệp</div>
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center w-full h-70 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
                      >
                        {!data.url && !image ? (
                          <div className="flex flex-col items-center justify-center ">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <img
                              src={image || data.url}
                              alt=""
                              width="150"
                              height="80"
                            />
                          </div>
                        )}
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          name="url"
                          onChange={async (e) => {
                            const a = await convertBase64(e.target.files[0]);
                            setData({
                              ...data,
                              [e.target.name]: a,
                            });
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    text="Lưu"
                    className="bg-button text-chu2 w-1/5 h-10"
                  />
                </div>
              </form>
              <div className={(display2 && "hidden") || ""}>
                <div className="mb-5 h-screen">
                  <div className="w-full pb-1 mb-2 border-b border-b-black">
                    Địa chỉ làm việc
                  </div>
                  <div className="w-full flex flex-wrap pb-1 mb-2 border-b border-b-gray-500">
                    <div className="w-11/12 flex flex-wrap">
                      <div className="w-1/4">Đường</div>
                      <div className="w-1/4">Phường xã</div>
                      <div className="w-1/4">Quận huyện</div>
                      <div className="w-1/4">Tỉnh thành</div>
                    </div>
                    <div className="w-1/12 text-center">Thao tác</div>
                  </div>
                  {address?.map((e) => {
                    return (
                      <div className="w-full flex flex-wrap" key={e.id}>
                        <div className="w-11/12 flex flex-wrap">
                          <div className="w-1/4">{e.street}</div>
                          <div className="w-1/4">{e.ward}</div>
                          <div className="w-1/4">{e.district}</div>
                          <div className="w-1/4">{e.city}</div>
                        </div>
                        <div className="w-1/12 flex">
                          <div
                            className="w-6/12 grid place-content-center h-6 my-auto"
                            onClick={() => {
                              handleUpdate(e.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </div>
                          <div
                            className="w-6/12 grid place-content-center h-6 my-auto"
                            onClick={handleDelete}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    text="Lưu"
                    className="bg-button text-chu2 w-1/5 h-10"
                  />
                </div>
              </div>
              <div className={(display3 && "hidden") || ""}>Mẫu email</div>
            </div>
          </div>
        </div>
      </div>
      <Footer type={null} />
    </>
  );
}

export default Detail;
