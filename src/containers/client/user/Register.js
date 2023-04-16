import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Nav } from "../../../components";
import { registerUser } from "../../../store/apiRequests";
import { path } from "../../../utils/constant";

function Register() {
  const init = {
    email: "",
    pass: "",
    rePassword: "",
    first_name: "",
    last_name: "",
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
      values.first_name !== "" &&
      values.last_name !== "" &&
      values.rePassword !== ""
    )
      if (values.pass === values.rePassword) {
        registerUser(values, dispatch, navigate, setErr);
      } else setErr("Incorrect password");
    else setErr("Missing information");
  };

  return (
    <div className="w-1360 h-screen mx-auto flex justify-center">
      <Nav type="null" />
      <div className="w-full flex">
        <div className="w-6/12 pt-28 px-32">
          <p className="mb-5 text-p">Chào mừng đến với DNCJOB</p>
          <Button
            className="w-full h-10 bg-button text-chu2"
            text="Đăng nhập với google"
          />
          <div className="align-center flex items-center mt-3 mb-1">
            <div className="h-1px w-full bg-slate-400"></div>
            <div className="mx-2 ">Hoặc</div>
            <div className="h-px w-full bg-slate-400"></div>
          </div>
          <form onSubmit={register}>
            <Input
              request={true}
              label="Họ"
              id="first_name"
              name="first_name"
              placeholder="Họ"
              setValue={setValues}
              initValue={values}
            />
            <Input
              request={true}
              label="Tên"
              id="last_name"
              name="last_name"
              placeholder="Tên"
              setValue={setValues}
              initValue={values}
            />
            <Input
              request={true}
              label="Email"
              id="email"
              name="email"
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
              className="w-full h-10 mt-3 bg-button text-chu2"
            />
          </form>
          <small className="float-right mt-1 text-span italic">
            Bạn đã có tài khoản?{" "}
            <Link to={path.LOGIN} className="text-link">
              Đăng nhập!
            </Link>
          </small>
        </div>
        <div className=" w-6/12 pt-40">
          <p>
            Sign in to get instant access to thousands of reviews and salary
            information
          </p>
          <p>View salary to help you negotiate your offer or pay rise</p>
          <p>Find out about benefits, interview, company culture via reviews</p>
          <p>Easy apply with only 1 click</p>
          <p>Manage your own profile & privacy</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
