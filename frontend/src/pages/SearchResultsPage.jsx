import axios from "axios";
import { Fragment, useState, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/UI/NavBar/NavBar";
import Search from "../components/UI/Search/Search";
import Filters from "../components/Filters/Filters";
import SecondaryButton from "../components/UI/SecondaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CourseCardListView from "../components/Course/CourseCardListView";
import CourseCard from "../components/Course/CourseCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { SnackbarProvider, useSnackbar } from "notistack";
import ReactLoading from "react-loading";

const options = [
  { id: 1, name: "Computer Hardware" },
  { id: 2, name: "Data Structures" },
  { id: 3, name: "Computer Architecture" },
  { id: 4, name: "Programming Fundamentals" },
  { id: 5, name: "Computer Organization" },
  { id: 6, name: "Machine Learning" },
  { id: 7, name: "Web Development" },
];
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#3970AC",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const icon = <TuneOutlinedIcon className="ml-2" />;
const SearchResultsPage = () => {
  const location = useLocation();
  const defaultState = {
    displayedCourses: [],
    search: location.state ? location.state : "",
    filters: {
      price: null,
      subjects: [],
      rating: null,
    },
  };

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );
  const [currencySymbol, setCurrencySymbol] = useState("$");
  //funtion to handle the pagination
  const onChangePageHandler = (event, value) => {
    setPage(value);
  };

  const ReducerFunction = (state, action) => {
    if (action.type === "SEARCH") {
      const newState = { ...state, search: action.value };
      return newState;
    }
    if (action.type === "FILTER") {
      const newState = { ...state, filters: action.value };
      return newState;
    }
    if (action.type === "COURSES") {
      const newState = { ...state, displayedCourses: action.value };
      return newState;
    }
  };
  const [searchState, dispatchSearch] = useReducer(
    ReducerFunction,
    defaultState
  );

  const [showFilters, setShowFilters] = useState(false);
  const showFiltersHandler = () => {
    setShowFilters(true);
  };
  const hideFiltersHandler = () => {
    setShowFilters(false);
  };
  const searchBarChangeHandler = (searchValue) => {
    dispatchSearch({ type: "SEARCH", value: searchValue });
  };
  const filtersChangeHandler = (newFilter) => {
    dispatchSearch({ type: "FILTER", value: newFilter });
    setShowFilters(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    var param = "";
    if (searchState.search !== "")
      param = param + "?search=" + searchState.search;

    for (var i = 0; i < searchState.filters.subjects.length; i++) {
      for (var j = 0; j < options.length; j++) {
        if (options[j].id === searchState.filters.subjects[i]) {
          param = param + (param ? "&" : "?") + "subject=" + options[j].name;
        }
      }
    }
    if (searchState.filters.rating !== null)
      param =
        param + (param ? "&" : "?") + "rating=" + searchState.filters.rating;
    if (searchState.filters.price !== null) {
      param =
        param +
        (param ? "&" : "?") +
        "minPrice=" +
        searchState.filters.price.minValue;
      param =
        param +
        (param ? "&" : "?") +
        "maxPrice=" +
        searchState.filters.price.maxValue;
    }
    param = param + (param ? "&" : "?") + "page=" + page;
    param = param + (param ? "&" : "?") + "CC=" + countryCode;
    axios
      .get("http://localhost:3000/course/" + param, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNoOfPages(res.data.count);
        setLoaded(true);
        dispatchSearch({ type: "COURSES", value: res.data.courses });
        setCurrencySymbol(res.data.symbol);
      });
  }, [searchState.search, searchState.filters, page, countryCode]);
  var coursesListView;
  var coursesCardsView;
  if (searchState.displayedCourses.length === 0) {
    coursesListView = (
      <div className="bg-gray-100 border-4 p-4 ">
        <h3 className="text-xl mt-8  font-semibold text-black-800">
          Sorry, We Couldn't Find Any Matching Results
        </h3>
        <h3 className="text-xl  font-semibold text-black-800">
          Try Altering Your Search , Here Are Some tips:
        </h3>
        <div className="mt-2 ml-6 text-md text-black-700">
          <ol className="list-disc pl-5 space-y-1">
            <li>Make Sure You Spelled It Right</li>
            <li>Be More Generic</li>
          </ol>
        </div>
      </div>
    );
    coursesCardsView = (
      <div className="bg-gray-100 border-4 p-4 ">
        <h3 className="text-xl mt-8  font-semibold text-black-800">
          Sorry, We Couldn't Find Any Matching Results
        </h3>
        <h3 className="text-xl  font-semibold text-black-800">
          Try Altering Your Search , Here Are Some tips:
        </h3>
        <div className="mt-2 ml-6 text-md text-black-700">
          <ol className="list-disc pl-5 space-y-1">
            <li>Make Sure You Spelled It Right</li>
            <li>Be More Generic</li>
          </ol>
        </div>
      </div>
    );
  } else {
    coursesListView = searchState.displayedCourses.map((course) => {
      return (
        <CourseCardListView
          id={course._id}
          duration={course.totalMins}
          title={course.courseTitle}
          instructorName={course.instructorName}
          subject={course.subject}
          level={course.level}
          description={course.courseDescription}
          courseImage={course.courseImage}
          coursePrice={course.coursePrice}
          discountedPrice={course.discountedPrice}
          discount={course.discount}
          rating={course.rating}
          currencySymbol={currencySymbol}
        ></CourseCardListView>
      );
    });
    coursesCardsView = searchState.displayedCourses.map((course) => {
      return (
        <CourseCard
          id={course._id}
          duration={course.total}
          title={course.courseTitle}
          instructorName={course.instructorName}
          subject={course.subject}
          level={course.level}
          coursePrice={course.coursePrice}
          discountedPrice={course.discountedPrice}
          discount={course.discount}
          rating={course.rating}
          currencySymbol="$"
          // currencySymbol={currencySymbol}
        ></CourseCard>
      );
    });
  }

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Fragment>
        <NavBar onChange={onChangeHandler} currentTab="Home" />
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
            <div className="mt-4 flex justify-center space-x-4 mb-3 items-center">
              <Search
                searchState={searchState.search}
                onChange={searchBarChangeHandler}
                className="ml-4"
              />
              <SecondaryButton
                className="mr-4 w-25 h-11"
                text="Filter"
                icon={icon}
                onClick={showFiltersHandler}
              ></SecondaryButton>
            </div>
            {showFilters && (
              <Filters
                prevState={searchState.filters}
                onConfirm={filtersChangeHandler}
                exchange={1}
                options={options}
                onClick={hideFiltersHandler}
              />
            )}

            <div className="flex flex-col gap-y-4 mb-4">
              <div className="font-bold text-2xl ml-24">Results:</div>
              <div className="flex-col items-center gap-y-4 hidden lg:flex">
                {coursesListView}
              </div>
              <div className="flex justify-around flex-wrap lg:hidden">
                {coursesCardsView}
              </div>
            </div>
            {searchState.displayedCourses.length !== 0 && (
              <div className="flex items-center justify-center">
                <ThemeProvider theme={theme}>
                  <Pagination
                    className="ml-2 mr-2"
                    count={Math.ceil(noOfPages / 10)}
                    color="primary"
                    page={page}
                    onChange={onChangePageHandler}
                  />
                </ThemeProvider>
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    </SnackbarProvider>
  );
};
export default SearchResultsPage;
