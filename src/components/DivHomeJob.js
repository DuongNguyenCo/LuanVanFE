import hinh from "../assets/image/logo.png";

function DivHomejob(prop) {
  const { listLanguage, nameBusiness, nameJob, url, onClick, id } = prop;
  return (
    <div
      className="w-4/12 p-4 hover:border"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className=" w-full min-h-122 flex flex-wrap justify-center p-2 bg-chu2">
        <div className="w-full flex mb-2 ">
          <div className="w-2/12">
            <div className="w-full h-full flex items-center">
              <img
                src={url || hinh}
                alt="hinh"
                className="w-auto h-fit max-w-50 max-h-50 mx-auto"
              />
            </div>
          </div>
          <div className="w-9/12 ml-3">
            <p>{nameJob}</p>
            <b>{nameBusiness}</b>
          </div>
          <div className="w-1/12">0</div>
        </div>
        <div className="w-full flex ">
          {listLanguage.map((e, i) => {
            return (
              <p className="w-20 mr-3 border text-center" key={i}>
                {e.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DivHomejob;
