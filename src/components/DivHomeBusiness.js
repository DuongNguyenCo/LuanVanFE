import samsung from "../assets/image/samsung.png";

function DivHome(prop) {
  const { onClick, id, name, city, count, url } = prop;
  return (
    <div
      className="w-1/5  p-4 hover:border"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className=" w-full px-3 min-h-300 flex flex-wrap justify-center bg-chu2">
        <div className="w-170 h-170 mt-5 mb-3 flex items-center">
          <img
            src={url || samsung}
            alt="hinh"
            className="w-auto h-fit max-w-170 max-h-170"
          />
        </div>
        <p className="w-full text-center min-h-80 p- mb-2">{name}</p>
        <p className="w-full text-center mb-2">
          {city} - {count} Công việc
        </p>
      </div>
    </div>
  );
}

export default DivHome;
