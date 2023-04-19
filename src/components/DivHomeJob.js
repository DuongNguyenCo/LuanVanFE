import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import hinh from "../assets/image/logo.png";
import Button from "./Button";
import { useState } from "react";
function DivHomejob(prop) {
  const [like, setLike] = useState(true);

  const { listLanguage, nameBusiness, nameJob, url, onClick, id } = prop;
  return (
    <div
      className="w-4/12 p-4 hover:border"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className=" w-full  flex flex-wrap justify-center p-2 bg-chu2">
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
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              {nameJob}
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis font-bold">
              {nameBusiness}
            </div>
          </div>
          <div className="w-5">
            <Button
              className="w-full h-full text-center my-auto border-none"
              text={
                <FontAwesomeIcon
                  icon={like ? fullHeart : solidHeart}
                  className="w-full h-full "
                  // style={{ color: "rgb(234, 30, 48)" }}
                />
              }
            />
          </div>
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
