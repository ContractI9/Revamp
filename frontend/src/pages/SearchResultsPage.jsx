import axios from "axios";
import { Fragment, useState, useEffect, useReducer } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Filters from "../components/Filters/Filters";
import SecondaryButton from "../components/SecondaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const options = [
  { id: 1, name: "the loving memory of mougy" },
  { id: 2, name: "Machine Learning" },
  { id: 3, name: "Computer Science" },
  { id: 4, name: "Database Administration" },
  { id: 5, name: "Data analysis" },
];

const icon = <TuneOutlinedIcon className="ml-2" />;
const SearchResultsPage = (props) => {
  const defaultState = {
    displayedCourse: [],
    search: "",
    filters: {
      price: null,
      subjects: [],
      rating: null,
    },
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
        const newState = { ...state,displayedCourses: action.value};
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
  const searchBarChangeHandler = (event) => {
    dispatchSearch({ type: "SEARCH", value: event.target.value });
  };
  const filterChangeHandler = (newFilter) => {
    dispatchSearch({ type: "FILTER", value: newFilter });
  };
  console.log(searchState)
  const onSubmitHandler = (event) => {
    event.preventDefault();
    var param ="";
    if(searchState.search !== "")
    param = param + "?search=" + searchState.search
  
    for(var i = 0; i <searchState.filters.subjects.length; i++) {
       for(var j = 0; j <options.length; j++) {
        if(options[j].id === searchState.filters.subjects[i]){
            param=param + "?subject=" + options[j].name;
        }
       }
    }
    if(searchState.filters.rating !==null)
     param=param + "?rating=" +searchState.filters.rating
    axios.get("http://localhost:3000/course/"+param).then((res) => {
      dispatchSearch({ type: "COURSES", value: res.data.courses });
    });
  };

  return (
    <Fragment>
      <NavBar />
      <div className="flex justify-center space-x-4 mb-3">
        <Search onSubmit={onSubmitHandler}onChange={searchBarChangeHandler} className="ml-4" />
        <SecondaryButton
          className="mr-4 w-25"
          text="Filter"
          icon={icon}
          onClick={showFiltersHandler}
        ></SecondaryButton>
      </div>
      {showFilters && (
        <Filters
          onChange={filterChangeHandler}
          exchange={1}
          options={options}
          onClick={hideFiltersHandler}
        />
      )}
    </Fragment>
  );
};
export default SearchResultsPage;