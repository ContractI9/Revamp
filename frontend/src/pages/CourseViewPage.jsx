import { useState, useEffect, Fragment } from "react";
import ProgressManager from "../components/Progress/ProgressManager";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import NavBar from "../components/UI/NavBar/NavBar";
import ExamManager from "../components/Exam/ExamManager";
import NotesManager from "../components/Notes/NotesManager";
import axios from "axios";
import { useLocation } from "react-router-dom";
import WarningAlert from "../components/UI/WarningAlert";
//stub for the notes
const notes = [
  {
    note: "test1 ",
    sourceDescription: "226.redux VS Context",
    subtitleDescription: "18.Diving Into Redux",
    timestamp: "0:52",
  },
  {
    note: "test2 ",
    sourceDescription: "225.redux VS Context",
    subtitleDescription: "18.Diving Into Redux",
    timestamp: "10:33",
  },
  {
    note: "test3 ",
    sourceDescription: "225.redux VS Context",
    subtitleDescription: "18.Diving Into Redux",
    timestamp: "12:52",
  },
];

const CourseViewPage = () => {
  //will give the backend the id of the clicked course , then will fetch all the details about that course
  //to fill the subtitle accordion and create an onClick function to change the link of the video playing.
  //at the buttom of the video frame will have a notes trigger which will create a text box at the buttom
  //at the top below the navbar will have a div with the progress and view notes  and some extra controls..

  //this page will handle the viewed sources and solving exams and notes areas..
  const location = useLocation();
  const [receivedData, setReceivedData] = useState({});
  const [currentSource, setCurrentSource] = useState("");
  const [receivedUserData, setUserReceivedData] = useState({});
  const [showNextLessonAlert, setShowNextLessonAlert] = useState(false);

  //useEffect at the start to receive the data
  useEffect(() => {
    const courseId = location.state;
    //shouldnt we send the userId ??
    axios
      .get(`http://localhost:3000/course/${courseId}/638a07cdbc3508481a2d7da9`)
      .then((res) => {
        setReceivedData(res.data.course);
        setUserReceivedData(res.data.userData);
        setCurrentSource(res.data.course.subtitles[0].sources[0]);
      });
  }, [location.state]);
  const onSourceChangeHandler = (source) => {
    setCurrentSource(source);
  };

  const onSolveExamHandler = (receivedSolution) => {
    //should mark this as visited in the back and store the data
    //send the sourceId , examId ,userid and courseId
    var endPoint = `http://localhost:3000/user/solveexam/`;

    var sentData = {
      studentAnswers: receivedSolution,
      userid: "638a07cdbc3508481a2d7da9",
      courseid: receivedData._id,
      examid: currentSource.quiz._id,
    };
    axios
      .post(endPoint, sentData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const nextSource = () => {
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (receivedData.subtitles[i].sources[j]._id === currentSource._id) {
          if (j === receivedData.subtitles[i].sources.length - 1) {
            if (i === receivedData.subtitles.length - 1) {
              setShowNextLessonAlert(true);
            } else {
              setCurrentSource(receivedData.subtitles[i + 1].sources[0]);
            }
          } else {
            setCurrentSource(receivedData.subtitles[i].sources[j + 1]);
          }
        }
      }
    }
  };
  const hideWarningAlert = () => {
    setShowNextLessonAlert(false);
  };
  const onWatchHandler = () => {
    //will need the userID , sourceId, courseId
    //the userID and courseid are given from the navigation
    var endPoint = "asdasdasdsadasdsadasdasdasd";
    const submittedData = {
      userId: 1,
      courseId: 1,
      sourceId: currentSource._id,
    };
    axios
      .post(endPoint, submittedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {});
  };

  if (currentSource !== "") {
    var subtitle;
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (currentSource._id === receivedData.subtitles[i].sources[j]._id) {
          subtitle = receivedData.subtitles[i].description;
        }
      }
    }
  }
  //we will have an array of viewed sources
  var displayedSource;
  if (currentSource !== "") {
    if (currentSource.sourceType === "Video") {
      displayedSource = (
        <NotesManager
          source={currentSource.description}
          subtitle={subtitle}
          notes={notes}
          isVisible={true}
          link={currentSource.link}
          onWatch={onWatchHandler}
        ></NotesManager>
      );
    } else {
      var studentAnswers;
      var grade;
      for (var k = 0; k < receivedUserData.exams.length; k++) {
        if (receivedUserData.exams[k].examId === currentSource.quiz._id) {
          studentAnswers = receivedUserData.exams[k].answers;
          grade = receivedUserData.exams[k].score;
        }
      }
      displayedSource = (
        <Fragment>
          {showNextLessonAlert && (
            <WarningAlert
              hide={hideWarningAlert}
              message={
                "This was the last course lesson,solve the exam to get your certificate"
              }
            ></WarningAlert>
          )}
          <ExamManager
            next={nextSource}
            exam={currentSource.quiz.exercises}
            studentAnswers={studentAnswers}
            grade={grade}
            onSolveExamHandler={onSolveExamHandler}
          ></ExamManager>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className="flex justify-center items-center ">
        <div className="font-semibold text-2xl w-2/3">
          {receivedData.courseTitle}
        </div>
        <ProgressManager></ProgressManager>
      </div>

      <div className="md:flex">
        <div className="video/exam md:w-7/12 w-full mb-4 md:mb-0">
          {displayedSource}
        </div>
        <CourseContent
          courseDuration="35"
          content={receivedData.subtitles}
          onClick={onSourceChangeHandler}
        />
      </div>
    </Fragment>
  );
};
export default CourseViewPage;
