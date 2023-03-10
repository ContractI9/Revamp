import SecondaryButton from "../../UI/SecondaryButton";
import CreateExamChoices from "./CreateExamChoices";
import QuestionSolution from "./QuestionSolution";

const defaultChoicesState = [
  {
    choiceId: "1",
    description: "",
  },
  {
    choiceId: "2",
    description: "",
  },
  {
    choiceId: "3",
    description: "",
  },
  {
    choiceId: "4",
    description: "",
  },
];
const CreateQuestionForm = (props) => {
  var titleDefaultState;
  var defaultChoice;
  var defaultsolution;
  if (!props.empty) {
    titleDefaultState = props.examState.question
      ? props.examState.question
      : "";
    defaultChoice = props.examState.choices
      ? props.examState.choices
      : defaultChoicesState;
    defaultsolution = props.examState.solution
      ? props.examState.solution
      : { id: 1, name: "First Choice" };
  } else {
    titleDefaultState = "";
    defaultChoice = defaultChoicesState;
    defaultsolution = { id: 1, name: "First Choice" };
  }

  const submitHandler = () => {
    //before creating a new button can call an alert to show if not all fields have been entered
    var QuestionData = {
      question: "",
      choices: defaultChoicesState,
      solution: { id: 1, name: "First Choice" },
    };
    props.onSubmit(QuestionData);
  };
  const solutionOnChangeHandler = (data) => {
    var QuestionData = {
      question: titleDefaultState,
      choices: defaultChoice,
      solution: data,
    };
    props.onQuestionChangeHandler(QuestionData);
  };

  const onChoiceChangeHandler = (choiceId, newData) => {
    var newChoiceState = [];
    for (var i = 0; i < defaultChoice.length; i++) {
      if (defaultChoice[i].choiceId === choiceId) {
        var temp = {
          choiceId: choiceId,
          description: newData,
        };

        newChoiceState.push(temp);
      } else {
        newChoiceState.push(defaultChoice[i]);
      }
    }
    var QuestionData = {
      question: titleDefaultState,
      choices: newChoiceState,
      solution: defaultsolution,
    };
    props.onQuestionChangeHandler(QuestionData);
  };

  const titleChangeHandler = (event) => {
    var QuestionData = {
      question: event.target.value,
      choices: defaultChoice,
      solution: defaultsolution,
    };
    props.onQuestionChangeHandler(QuestionData);
  };

  return (
    <div className=" md:px-10">
      <div className="grid grid-cols-3 pb-3">
        <div></div>
        <div className="flex justify-center text-md font-medium">
          Question-Info
        </div>
        <div className="flex justify-end"></div>
      </div>
      <div>
        <div className="mt-2 mb-4">
          <label className="block" htmlFor="question-title">
            Question Title
          </label>
          <input
            value={titleDefaultState}
            onChange={titleChangeHandler}
            id="question-title"
            className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
          />
        </div>
        <div className="mt-2">
          <CreateExamChoices
            choices={defaultChoice}
            onChange={onChoiceChangeHandler}
          ></CreateExamChoices>
        </div>
        <div className="mt-4">
          <QuestionSolution
            onChange={solutionOnChangeHandler}
            currentSolution={defaultsolution}
          ></QuestionSolution>
        </div>
        <div className="controls flex justify-end space-x-2 mt-2">
          {props.length !== 1 && !props.empty && (
            <button
              type="button"
              onClick={props.onQuestionRemoveHandler}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Question
            </button>
          )}
          <SecondaryButton
            className=" rounded-md  "
            text="Add New Question"
            type="button"
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateQuestionForm;
