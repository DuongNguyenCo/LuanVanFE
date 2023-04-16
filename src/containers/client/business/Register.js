import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Nav } from "../../../components";
import { registerBusiness } from "../../../store/apiRequests";
import { path } from "../../../utils/constant";

function Register() {
  const init = {
    email: "",
    pass: "",
    rePassword: "",
    name: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(init);
  const [err, setErr] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (
      values.email !== "" &&
      values.pass !== "" &&
      values.name !== "" &&
      values.rePassword !== ""
    )
      if (values.pass === values.rePassword) {
        registerBusiness(values, dispatch, navigate, setErr);
        // console.log(err);
      } else setErr("Incorrect password");
    else setErr("Missing information");
  };

  return (
    <>
      <Nav type="null" />

      <div className="w-1360 h-screen flex mx-auto">
        <div className="w-6/12 p-32 mx-auto">
          <p className="mb-5 text-p">Chào mừng đến với DNCJOB</p>
          <form onSubmit={register}>
            <Input
              request={true}
              label="Tên doanh nghiệp"
              id="name"
              name="name"
              placeholder="Tên doanh nghiệp"
              setValue={setValues}
              initValue={values}
            />
            <Input
              request={true}
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              setValue={setValues}
              initValue={values}
            />
            <Input
              request={true}
              label="Mật khẩu"
              id="password"
              name="pass"
              type="password"
              placeholder="Mật khẩu"
              setValue={setValues}
              initValue={values}
            />
            <Input
              request={true}
              label="Xác nhận mật khẩu"
              id="rePassword"
              name="rePassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              setValue={setValues}
              initValue={values}
            />
            <p className="text-right text-red-600">{err}</p>
            <Button
              text="Đăng Ký"
              className="w-full h-10 my-3 bg-button text-chu2"
            />
          </form>
          <p className="float-right italic text-span">
            bạn đã có tài khoản?{" "}
            <Link to={path.BLOGIN} className="text-link">
              Đăng nhập!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
