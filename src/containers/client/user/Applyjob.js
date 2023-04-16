import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Footer, Input, Nav } from "../../../components";
import { path } from "../../../utils/constant";

function ApplyJob() {
  const [count, setCount] = useState(500);
  return (
    <>
      <Nav type="null" />
      <div className="w-full bg-phu">
        <div className="w-1360 pt-70 h-screen flex mx-auto">
          <div className="rou w-1024 h-min bg-chu2 mt-3 mx-auto px-10 pt-2 pb-4 rounded-md">
            <div>Tên công việc tại công ty</div>
            <div className="flex flex-wrap">
              <div className="w-full flex mt-2">
                <div className="w-1/5">Your CV</div>
                <div className="w-4/5">
                  <div>
                    <Input
                      type="file"
                      className="null"
                      accept="application/pdf, application/msword"
                    />
                  </div>
                  <div>chúng tôi chỉ nhận file .doc</div>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-1">
                  What skills, work projects or achievements make you a strong
                  candidate?
                </div>
                <textarea
                  onChange={(e) => {
                    setCount(500 - e.target.value.length);
                  }}
                  maxLength="500"
                  rows="3"
                  placeholder="Details and specific examples will make your application stronger..."
                  className="border w-full p-1 mt-2"
                ></textarea>
                <div className="float-right">
                  {count} of 500 characters remaining
                </div>
                <Link to={path.HOME}>
                  <Button
                    text="Nộp CV"
                    className="w-full h-10 mt-2 bg-button text-chu2"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ApplyJob;
