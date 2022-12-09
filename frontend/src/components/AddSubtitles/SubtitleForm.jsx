import { Fragment, useRef } from "react";
import Divider from "@mui/material/Divider";
import PrimaryButton from "../UI/PrimaryButton";

const SubtitleForm = (props) => {
  const titleRef = useRef();
  const videoRef = useRef();
  const descriptionRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const videoURL = videoRef.current.value;
    const description = descriptionRef.current.value;
    const subtitleData = {
      title: title,
      videoURL: videoURL,
      description: description,
    };
    props.onConfirm(subtitleData);
  };
  return (
    <Fragment>
      <div className="grid grid-cols-3 mt-4">
        <div></div>
        <div className="flex justify-center text-xl font-semibold">
          Section-Info
        </div>
        <div className="flex justify-end font-bold">
          <button
            onClick={props.onCancel}
            className="hover:text-red-600 text-xl"
          >
            x
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            <div className="first control">
              <label className="block" htmlFor="section-title">
                Section Title
              </label>
              <input
                ref={titleRef}
                id="section-title"
                className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                required
              />
            </div>
            <div className="second control">
              <label className="block" htmlFor="video-URL">
                Video URL (optional)
              </label>
              <input
                ref={videoRef}
                id="video_URL"
                className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              />
            </div>
            <div className="third-control">
              <label className="block" htmlFor="short-description">
                Short Description (optional)
              </label>
              <textarea
                ref={descriptionRef}
                id="short-description"
                className="w-full h-28 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              />
            </div>
            <div className="controls flex justify-end">
              <PrimaryButton
                className=" rounded-md  "
                text="Confirm"
                type="submit"
              ></PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default SubtitleForm;
