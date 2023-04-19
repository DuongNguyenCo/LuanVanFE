function Divfindjob(prop) {
  const {
    nameBusiness,
    id,
    nameJob,
    create,
    listLanguage,
    listLocation,
    salary,
    onClick,
    url,
  } = prop;
  const a = new Date(create);
  const b = new Date();
  const c = b.getTime() - a.getTime();
  return (
    <div
      className="w-full"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="w-full  border p-4 ">
        <div className="w-full flex mb-2">
          <div className="w-2/12">
            <div className="w-full h-48 flex items-center">
              <img src={url} alt="hinh" className="w-auto h-fit mx-auto" />
            </div>
          </div>
          <div className="w-9/12 ml-3 ">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              {nameJob}
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              {nameBusiness}
            </div>
          </div>
          <div className="w-1/12 text-center">0</div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full flex flex-wrap">
            {listLocation?.map((e, i) => {
              return (
                <p className=" mr-2 my-1 " key={i}>
                  {e.city}
                </p>
              );
            })}
          </div>
          <div className="w-full ">
            {salary.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          {listLanguage?.map((e, i) => {
            return (
              <p className="w-20 mr-2 my-1 border text-center" key={i}>
                {e.name}
              </p>
            );
          })}
        </div>
        <div className="flex">
          {Math.floor(c / 86400000) >= 1
            ? `Đã đăng ${Math.floor(c / 86400000)} ngày trước`
            : Math.floor(c / 3600000) >= 1
            ? `Đã đăng ${Math.floor(c / 3600000)} giờ trước`
            : `Đã đăng ${Math.floor(c / 60000)} phút trước`}
        </div>
      </div>
    </div>
  );
}

export default Divfindjob;
