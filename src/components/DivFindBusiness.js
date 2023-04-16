import hinh from "../assets/image/logo.png";
function Divfindbusiness(prop) {
  const { nameBusiness, id, address, count, onClick, url } = prop;
  console.log("url: ", url);
  return (
    <div
      className="w-full border p-4"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="w-full flex mb-2">
        <div className="w-2/12">
          <div className="w-full h-full flex items-center">
            <img src={url} alt="hinh" className="w-auto h-fit mx-auto" />
          </div>
        </div>
        <div className="w-9/12 ml-3">
          <p className="min-h-50">{nameBusiness}</p>
          <p>{address}</p>
        </div>
        <div className="w-1/12 text-center">0</div>
      </div>
      <div className="w-full">{count} công việc</div>
    </div>
  );
}

export default Divfindbusiness;
