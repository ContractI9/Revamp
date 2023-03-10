import { useState, useEffect, Fragment } from "react";
import question from "../Assets/Images/question.svg";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";
import { BellIcon } from "@heroicons/react/solid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AverageSummary from "../components/Profile/Reviews/AverageSummary";
import ReviewItem from "../components/CourseDetailsComp/ReviewItem";
import ReportItem from "../components/CourseView/ReportItem";
import { Divider } from "@mui/material";
import InstructorQACard from "../components/QA/InstructorQACard";
import ReactLoading from "react-loading";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
    enqueueSnackbar("Your follow up has been submitted successfuly ", {
      variant,
    });
  };

  const [receivedData, setReceivedData] = useState({});
  const [reports, setReports] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpId, setFollowUpId] = useState(-1);
  const [followUpProblem, setFollowUpProblem] = useState("");
  const [followUpDescription, setFollowUpDescription] = useState("");
  const [render, setRender] = useState(false);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );

  const openFollowUpModal = (id, problem) => {
    setShowFollowUpModal(true);
    setFollowUpId(id);
    setFollowUpProblem(problem);
  };

  const closeFollowUpModal = () => {
    setShowFollowUpModal(false);
    setFollowUpId(-1);
  };

  const followUpDescriptionChangeHandler = (event) => {
    setFollowUpDescription(event.target.value);
  };

  const followUpSubmitHandler = () => {
    closeFollowUpModal();
    const data = {
      followUpComment: followUpDescription,
    };
    axios
      .patch("http://localhost:3000/problem/followUp/" + followUpId, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        handleClickVariant("success");
        setRender((prev) => !prev);
        console.log(res);
      });
  };

  //loading as the endpoint contains a lot of data..
  //fetch the data as soon as he logs in..
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "INSTRUCTOR") {
      navigate("/403");
    }
    window.scrollTo(0, 0, "smooth");
    axios
      .get("http://localhost:3000/instructor/myReviews", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReceivedData(res.data.instructor);
        setCount(res.data.count);
        setLoaded(true);
      });

    axios
      .get("http://localhost:3000/problem/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReports(res.data);
      });

    axios
      .get("http://localhost:3000/instructor/questions", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setQuestions(res.data);
      });
  }, [render]);

  const onConfirmReplyHandler = (id, reply) => {
    const sentData = {
      questionId: id,
      answer: reply,
    };
    axios.patch("http://localhost:3000/instructor/answerQuestion", sentData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    var temp = [];
    for (var i = 0; i < questions.length; i++) {
      if (questions[i]._id !== id) {
        temp.push(questions[i]);
      }
    }
    setQuestions(temp);
  };

  const stats = [
    {
      id: 1,
      name: "Previous Reports",
      stat: reports.length,
      icon: AccessTimeIcon,
    },
    {
      id: 2,
      name: `Unsolved Questions`,
      stat: questions.length,
      icon: "",
    },
  ];
  //handle the displayed Reviews
  var displayedReviews = [];
  if (loaded && receivedData.reviews !== []) {
    displayedReviews = receivedData.reviews.map((review) => {
      const formattedDate = review.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "01"
          ? "January"
          : formattedDate[1] === "02"
          ? "February"
          : formattedDate[1] === "03"
          ? "March"
          : formattedDate[1] === "04"
          ? "April"
          : formattedDate[1] === "05"
          ? "May"
          : formattedDate[1] === "06"
          ? "June"
          : formattedDate[1] === "07"
          ? "July"
          : formattedDate[1] === "08"
          ? "August"
          : formattedDate[1] === "09"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <ReviewItem
          rating={review.rating}
          username={review.userName}
          review={review.review}
          date={fullDate}
        />
      );
    });
  } else {
    displayedReviews = (
      <div className="mt-4 flex justify-center font-medium">
        No Reviews Found For This Instructor.
      </div>
    );
  }
  var displayedQuestions;
  if (questions !== []) {
    displayedQuestions = questions.map((question) => {
      const formattedDate = question.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "1"
          ? "January"
          : formattedDate[1] === "2"
          ? "February"
          : formattedDate[1] === "3"
          ? "March"
          : formattedDate[1] === "4"
          ? "April"
          : formattedDate[1] === "5"
          ? "May"
          : formattedDate[1] === "6"
          ? "June"
          : formattedDate[1] === "7"
          ? "July"
          : formattedDate[1] === "8"
          ? "August"
          : formattedDate[1] === "9"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <InstructorQACard
          onConfirmReplyHandler={onConfirmReplyHandler.bind(null, question._id)}
          question={question.question}
          date={fullDate}
          userName={question.userName}
          courseName={question.courseName}
        />
      );
    });
  } else {
    displayedQuestions = (
      <div>
        Seems like your students are quiet, they don't have any questions.
      </div>
    );
  }
  var displayedReports;
  var index = 0;
  if (reports !== [] && loaded) {
    displayedReports = reports.map((report) => {
      index++;
      const formattedDate = report.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "01"
          ? "January"
          : formattedDate[1] === "02"
          ? "February"
          : formattedDate[1] === "03"
          ? "March"
          : formattedDate[1] === "04"
          ? "April"
          : formattedDate[1] === "05"
          ? "May"
          : formattedDate[1] === "06"
          ? "June"
          : formattedDate[1] === "07"
          ? "July"
          : formattedDate[1] === "08"
          ? "August"
          : formattedDate[1] === "09"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <ReportItem
          id={report._id}
          type={report.type}
          status={report.status}
          index={index}
          date={fullDate}
          description={report.description}
          courseName={report.courseName}
          followUp={report.followUpComment}
          followUpDescriptionChangeHandler={followUpDescriptionChangeHandler}
          followUpSubmitHandler={followUpSubmitHandler}
          followUpDescription={followUpDescription}
          followUpId={followUpId}
          followUpProblem={followUpProblem}
          showFollowUpModal={showFollowUpModal}
          openFollowUpModal={openFollowUpModal}
          closeFollowUpModal={closeFollowUpModal}
        />
      );
    });
  } else {
    displayedReports = <div>No Reports Found.</div>;
  }
  var name;
  if (receivedData.firstName || receivedData.lastName) {
    name = ` ${receivedData.firstName} ${receivedData.lastName} `;
  } else {
    name = "Instructor ";
  }

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <Fragment>
      <NavBar onChange={onChangeHandler} currentTab="Dashboard" />
      {!loaded ? (
        <div className=" w-full h-full mt-12">
          <div className="flex w-full h-full  justify-center items-center ">
            <ReactLoading
              type={"bars"}
              color="#C6D8EC"
              height={667}
              width={375}
            />
          </div>
          <div className="flex items-center justify-center -mt-[275px]">
            <h1 className="text-center text-darkBlue font-bold text-3xl ">
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className=" flex space-x-14 mt-4 items-center justify-center">
            <div className="font-semibold text-xl text-center text-gray-700 ">
              <p>Welcome Back,</p>
              <p className="text-center text-3xl font-semibold">{name}!</p>
              <p className="text-center mt-6 text-gray-500 flex space-x-2 items-center justify-center">
                <BellIcon className="fill-yellow-400 w-6 h-8 mr-2"></BellIcon>
                You have {questions.length} unanswered questions from your
                students
              </p>
            </div>
            <img className="w-[15%] h-[15%]" src={question} alt=""></img>
          </div>
          <div className=" items-center">
            <dl className="mt-5 sm:flex sm:justify-center gap-5">
              <div className="sm:w-[45%]">
                <div
                  key={stats[0].id}
                  className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden sm:w-[100%]"
                >
                  <dt>
                    <div className="absolute bg-primaryBlue rounded-md p-3">
                      <AccessTimeIcon className="text-white"></AccessTimeIcon>
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {stats[0].name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats[0].stat}
                    </p>
                  </dd>
                </div>
                {displayedReports}
              </div>
              <div>
                <Divider className="hidden sm:block" orientation="vertical" />
              </div>
              <div className="sm:w-[45%]">
                <div
                  key={stats[1].id}
                  className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden sm:w-[100%]"
                >
                  <dt>
                    <div className="absolute bg-primaryBlue rounded-md p-3">
                      <HelpOutlineIcon className="text-white"></HelpOutlineIcon>
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {stats[1].name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats[1].stat}
                    </p>
                  </dd>
                </div>
                {displayedQuestions}
              </div>
            </dl>
          </div>
          <div className="m-4 mt-6">
            <div>
              <div className=" font-semibold text-xl mb-4">
                Instructor Reviews:
              </div>
              <div className=" mb-6 mx-12 mt-3">
                {loaded && <AverageSummary count={count} />}
              </div>
              <div className=" mx-8">{displayedReviews}</div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default InstructorDashboard;
