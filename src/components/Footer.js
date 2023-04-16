import logo from "../assets/image/logo1.png";
function Footer(prop) {
  const { type } = prop;
  return (
    <div
      className={
        type === null
          ? "h-72 w-full bg-chinh bottom-0"
          : "h-72 w-full bg-chinh absolute bottom-0"
      }
    >
      <div className="w-1360 mx-auto py-10">
        <div className="flex flex-col items-center">
          <img src={logo} alt="logo trang web" width={150} />
          <p className="text-chu1 text-span">-------------</p>
          <p className="text-chu1 text-span italic">Giảng viên hướng dẫn</p>
          <p className="text-chu1 text-span">ThS. Trần Văn Hùng</p>
          <p className="text-chu1 text-span italic">Sinh viên thực hiện</p>
          <p className="text-chu1 text-span">DH51903286 - Dương Nguyên Cơ</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
