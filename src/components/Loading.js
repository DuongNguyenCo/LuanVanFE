import { ColorRing } from "react-loader-spinner";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-900/50 z-50">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#ccc", "#ccc", "#ccc", "#ccc", "#ccc"]}
      />
    </div>
  );
}

export default Loading;
