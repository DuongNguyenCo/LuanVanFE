import { Link, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import img from "../assets/image/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, registerSuccess } from "../store/userSlice";
import {
  logoutBusiness,
  registerSuccess as registerB,
} from "../store/businessSlice";
import { loading, success } from "../store/checkSilce";
import { useEffect } from "react";

function Nav(prop) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoginC = useSelector((state) => state.user.isLogin);
  const name = useSelector((state) => state.user.candidate?.last_name);
  const isLoginB = useSelector((state) => state.business.isLogin);
  const url = useSelector((state) => state.business?.business.url);

  const a = JSON.parse(localStorage.getItem("user"));
  const b = JSON.parse(localStorage.getItem("business"));

  useEffect(() => {
    if (a) {
      dispatch(registerSuccess({ other: a }));
    }
    if (b) {
      dispatch(registerB({ other: b }));
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    dispatch(loading());
    dispatch(logoutUser());
    localStorage.removeItem("user");
    dispatch(success());
  };
  const handleLogoutB = () => {
    dispatch(loading());
    dispatch(logoutBusiness());
    localStorage.removeItem("business");
    dispatch(success());
    navigate(path.BLOGIN);
  };

  return (
    <div className="w-full flex fixed justify-center bg-chinh z-20">
      <nav className="h-70 w-1360 flex">
        {prop.type === "null" ? (
          <>
            <Link to={path.HOME} className="my-auto">
              <img className="h-60 " src={img} alt="logo cong ty" />
            </Link>
          </>
        ) : prop.type === "business" ? (
          <>
            <Link to={path.BUSINESS} className="my-auto">
              <img className="h-60" src={img} alt="logo cong ty" />
            </Link>
            <div className="flex justify-between w-full ml-2">
              <div className="flex w-6/12">
                <Link to={path.BUSINESS}>
                  <div className="leading-70 px-2 text-chu1">DASHBOARD</div>
                </Link>
                <Link to={path.BJOB}>
                  <div className="leading-70 px-2 text-chu1">VIỆC LÀM</div>
                </Link>
                <Link to={path.BCANDIDATE}>
                  <div className="leading-70 px-2 text-chu1">ỨNG VIÊN</div>
                </Link>
                <Link to={path.BRECEIPT}>
                  <div className="leading-70 px-2 text-chu1">ĐƠN HÀNG</div>
                </Link>
              </div>
              <div className="flex justify-end w-6/12">
                <Link to={path.BPOST}>
                  <div className="leading-70 px-2 text-chu1">
                    ĐĂNG TIN TUYỂN DỤNG
                  </div>
                </Link>
                <Link>
                  <div className="leading-70 px-2 text-chu1">TÌM ỨNG VIÊN</div>
                </Link>
                <div className="leading-70 text-chu1 w-3/12">
                  {isLoginB && (
                    <div className="leading-70 text-center text-chu1 relative group hover:border cursor-pointer w-full">
                      <div className="w-full h-70 grid place-content-center">
                        <div className="w-full grid place-content-center">
                          <img src={url} alt="hing" width="100" height="56" />
                        </div>
                      </div>
                      <div className="absolute w-full text-left hidden group-hover:block">
                        <Link
                          to={path.INFOB}
                          className="block h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p"
                        >
                          Thông tin
                        </Link>
                        <p
                          className="h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p"
                          onClick={handleLogoutB}
                        >
                          Đăng xuất
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to={path.HOME} className="my-auto">
              <img className="h-60 " src={img} alt="logo cong ty" />
            </Link>
            <div className="flex justify-between w-full ml-2">
              <div className="flex w-6/12">
                <Link to={path.FINDJOB}>
                  <div className="leading-70 px-2 text-chu1">TÌM VIỆC LÀM</div>
                </Link>
                <Link to={path.LISTBUSINESS}>
                  <div className="leading-70 px-2 text-chu1">
                    DANH SÁCH CÔNG TY
                  </div>
                </Link>
              </div>
              <div className="flex justify-end w-6/12">
                <Link to={path.BUSINESS}>
                  <div className="leading-70 px-2 text-chu1">
                    DÀNH CHO NHÀ TUYỂN DỤNG
                  </div>
                </Link>
                {isLoginC ? (
                  <div className="leading-70 text-center text-chu1 relative group hover:border cursor-pointer w-3/12">
                    CHÀO {name} !
                    <div className="absolute w-full text-left hidden group-hover:block">
                      <p className="h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p">
                        Thông tin
                      </p>
                      <p className="h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p">
                        Hoạt động
                      </p>
                      <p className="h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p">
                        Quản lý CV
                      </p>
                      <p
                        className="h-14 bg-phu3 pl-4 leading-56 text-chu3 cursor-pointer bg-chu2 hover:text-chu2 hover:text-p"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link to={path.LOGIN} className="leading-70 px-2 text-chu1 ">
                    ĐĂNG NHẬP
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Nav;
