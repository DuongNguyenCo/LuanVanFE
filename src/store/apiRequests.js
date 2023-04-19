import { registerSuccess } from "./userSlice";
import { registerSuccess as registerB, setBusiness } from "./businessSlice";
import { loading, error, success } from "./checkSilce";
import { setListLanguage } from "./LanguageSlice";
import { setTypejob } from "./typejobSlice";
import { listAddressBusiness, setListAddress } from "./addressSlice";
import { setListService } from "./serviceSlice";
import { setPost } from "./postSlice";
import { setJob } from "./jobSlice";
import axios from "axios";
import { path } from "../utils/constant";
export const getCity = async (setCity) => {
  try {
    const res = await axios.get("https://provinces.open-api.vn/api/p/");
    setCity(res.data);
  } catch (err) {}
};
export const getDistrict = async (idCity, setDistrict) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setDistrict(res.data.districts);
  } catch (err) {}
};
export const getWard = async (idDistrict, setWard) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setWard(res.data.wards);
  } catch (err) {}
};
export const registerUser = async (user, dispatch, navigate, setErr) => {
  try {
    dispatch(loading());
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/user/create`,
      user
    );
    console.log("res.data.errCode: ", res.data);
    if (res.data.errCode === 0) {
      localStorage.setItem("user", JSON.stringify(res.data.data.other));
      dispatch(success());
      dispatch(registerSuccess(res.data.data));
      navigate(path.HOME);
    } else {
      setErr(res.data.errMessage);
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const createAddressBusiness = async (address, dispatch, setEdit) => {
  try {
    dispatch(loading());
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/address/create`,
      address
    );
    if (res.data.errCode === 0) {
      dispatch(success());
      setEdit(false);
    } else {
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const loginUSer = async (user, dispatch, navigate, setErr) => {
  try {
    dispatch(loading());
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/user/login`,
      user
    );
    if (res.data.errCode === 0) {
      localStorage.setItem("user", JSON.stringify(res.data.data.other));
      dispatch(success());
      dispatch(registerSuccess(res.data.data));
      navigate(path.HOME);
    } else {
      setErr(res.data.errMessage);
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const registerBusiness = async (busi, dispatch, navigate, setErr) => {
  try {
    dispatch(loading());
    const location = await axios.post("http://ip-api.com/json/?fields=61439");
    const a = { ...busi, city: location.data.city };
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/business/create`,
      a
    );
    if (res.data.errCode === 0) {
      dispatch(success());
      localStorage.setItem("business", JSON.stringify(res.data.data.other));
      dispatch(registerB(res.data.data));
      navigate(path.BUSINESS);
    } else {
      setErr(res.data.errMessage);
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const loginBusiness = async (business, dispatch, navigate, setErr) => {
  try {
    dispatch(loading());
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/business/login`,
      business
    );
    if (res.data.errCode === 0) {
      dispatch(success());
      localStorage.setItem("business", JSON.stringify(res.data.data.other));
      dispatch(registerB(res.data.data));
      navigate(path.BUSINESS);
    } else {
      setErr(res.data.errMessage);
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const createAddressJob = async (address, dispatch, setErr) => {
  try {
    dispatch(loading());
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/business/create`,
      address
    );
    if (res.data.errCode === 0) {
    } else {
      setErr(res.data.errMessage);
      dispatch(success());
    }
  } catch (err) {
    dispatch(error());
  }
};
export const getBusiness = async (setData, page, limit) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/business/get-all?page=${page}&limit=${limit}`
    );
    if (data.data.errCode === 0) {
      setData(data.data.data);
    }
  } catch (err) {}
};
export const getJob = async (setJob, pageJob = 1, limit) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/job/get-all?page=${pageJob}&limit=${limit}`
    );
    if (data.data.errCode === 0) {
      setJob(data.data.data);
    }
  } catch (err) {}
};
export const getData = async (dispatch, idBusiness) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/type-job/get-all`
    );
    const data1 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/address/get-all/${idBusiness}`
    );
    const data2 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/language/get-all`
    );
    const data3 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/business/get-all-service/${idBusiness}`
    );
    if (data3.data.errCode === 0) {
      dispatch(setListService(data3.data.data));
    }
    if (data2.data.errCode === 0) {
      dispatch(setListLanguage(data2.data.data));
    }
    if (data1.data.errCode === 0) {
      dispatch(setListAddress(data1.data.data));
    }
    if (data.data.errCode === 0) {
      dispatch(setTypejob(data.data.data));
    }
  } catch (err) {
    dispatch(error());
  }
};
export const createJob = async (job, dispatch, setJob) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/job/create`,
      job
    );
    if (data.data.errCode === 0 || data.data.errCode === 1) {
      setJob(data.data.data);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    dispatch(error());
  }
};
export const createStepPost = async (step, dispatch) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/post/create`,
      step
    );
    if (data.data.errCode === 0) {
      dispatch(setPost(data.data.data));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    dispatch(error());
  }
};
export const createPostService = async (postService, dispatch, navigate) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/post/create/post-service`,
      postService
    );
    if (data.data.errCode === 0) {
      dispatch(setPost(data.data.data));
      navigate(path.BJOB);
    }
  } catch (err) {
    dispatch(error());
  }
};
export const getJobById = async (idjob, dispatch, navigate) => {
  try {
    dispatch(loading());
    const data = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/job/get-by-id/${idjob}`
    );
    if (data.data.errCode === 0) {
      dispatch(success());
      dispatch(setJob(data.data.data));
      navigate(path.DETAILJ);
    }
  } catch (err) {
    dispatch(error());
  }
};

export const getBusinessById = async (idBusiness, dispatch, navigate) => {
  try {
    dispatch(loading());
    const data = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/business/get-by-id/${idBusiness}`
    );
    console.log("data: ", data);
    if (data.data.errCode === 0) {
      dispatch(success());
      dispatch(setBusiness(data.data.data));
      navigate(path.DETAILB);
    }
  } catch (err) {
    dispatch(error());
  }
};

export const updateBusiness = async (business, dispatch) => {
  try {
    dispatch(loading());
    const data = await axios.put(
      `${process.env.REACT_APP_URL_SERVER}/api/business/update `,
      business
    );
    if (data.data.errCode === 0) {
      dispatch(success());
      localStorage.setItem("business", JSON.stringify(data.data.data));
    }
  } catch (err) {}
};

export const getAddress = async (idBusiness, dispatch) => {
  try {
    const data1 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/address/get-all/${idBusiness}`
    );
    if (data1.data.errCode === 0) {
      dispatch(listAddressBusiness(data1.data.data));
    }
  } catch (err) {}
};

export const updateAddress = async (address, dispatch) => {
  try {
    const data1 = await axios.put(
      `${process.env.REACT_APP_URL_SERVER}/api/address/update`,
      address
    );
    if (data1.data.errCode === 0) {
      dispatch(listAddressBusiness(data1.data.data));
    }
  } catch (err) {}
};

export const getAllJob = async (id, setData) => {
  try {
    const data1 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/job/get-job-by-business/${id}`
    );
    if (data1.data.errCode === 0) {
      setData(data1.data.data);
    }
  } catch (err) {}
};

export const getJobByName = async (name, setJob) => {
  try {
    const data1 = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/post/find?name=${name}`
    );
    if (data1.data.errCode === 0) {
      setJob(data1.data.data);
    }
  } catch (err) {}
};
